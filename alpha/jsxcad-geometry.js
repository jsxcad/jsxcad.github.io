import { identityMatrix, fromTranslation, fromZRotation, fromScaling, fromXRotation, fromYRotation } from './jsxcad-math-mat4.js';
import { composeTransforms, fromSurfaceMeshToLazyGraph, fromPointsToAlphaShapeAsSurfaceMesh, arrangePathsIntoTriangles, fromPolygonsToSurfaceMesh, deserializeSurfaceMesh, fromGraphToSurfaceMesh, fromSurfaceMeshEmitBoundingBox, differenceOfSurfaceMeshes, arrangePaths, bendSurfaceMesh, computeCentroidOfSurfaceMesh, computeNormalOfSurfaceMesh, fromSurfaceMeshToGraph, fromPointsToConvexHullAsSurfaceMesh, outlineSurfaceMesh, extrudeSurfaceMesh, extrudeToPlaneOfSurfaceMesh, fromSurfaceMeshToPolygonsWithHoles, reverseFaceOrientationsOfSurfaceMesh, fromFunctionToSurfaceMesh, fromPointsToSurfaceMesh, fromSegmentToInverseTransform, invertTransform, growSurfaceMesh, intersectionOfSurfaceMeshes, SurfaceMeshQuery, insetOfPolygonWithHoles, loftBetweenCongruentSurfaceMeshes, minkowskiDifferenceOfSurfaceMeshes, minkowskiShellOfSurfaceMeshes, minkowskiSumOfSurfaceMeshes, offsetOfPolygonWithHoles, projectToPlaneOfSurfaceMesh, serializeSurfaceMesh, pushSurfaceMesh, remeshSurfaceMesh, sectionOfSurfaceMesh, subdivideSurfaceMesh, separateSurfaceMesh, fromSurfaceMeshToTriangles, wireframeSurfaceMesh, taperSurfaceMesh, doesSelfIntersectOfSurfaceMesh, twistSurfaceMesh, unionOfSurfaceMeshes } from './jsxcad-algorithm-cgal.js';
export { arrangePolygonsWithHoles } from './jsxcad-algorithm-cgal.js';
import { cache, cacheRewriteTags, cacheSection } from './jsxcad-cache.js';
import { equals, transform as transform$5, canonicalize as canonicalize$5, max, min, scale as scale$3, subtract } from './jsxcad-math-vec3.js';
import { transform as transform$6, canonicalize as canonicalize$6 } from './jsxcad-math-poly3.js';
import { canonicalize as canonicalize$7 } from './jsxcad-math-plane.js';
import { info, read as read$1, write as write$1 } from './jsxcad-sys.js';

const update = (geometry, updates, changes) => {
  if (updates === undefined) {
    return geometry;
  }
  if (geometry === updates) {
    return geometry;
  }
  const updated = {};
  for (const key of Object.keys(geometry)) {
    if (key === 'cache') {
      // Caches contains derivations from the original object.
      continue;
    }
    if (key === 'hash') {
      // Hash is a bit like a symbol, but we want it to persist.
      continue;
    }
    if (typeof key === 'symbol') {
      // Don't copy symbols.
      continue;
    }
    updated[key] = geometry[key];
  }
  let changed = false;
  for (const key of Object.keys(updates)) {
    if (updates[key] !== updated[key]) {
      updated[key] = updates[key];
      changed = true;
    }
  }
  if (changes !== undefined) {
    for (const key of Object.keys(changes)) {
      if (changes[key] !== updated[key]) {
        updated[key] = changes[key];
        changed = true;
      }
    }
  }
  if (changed) {
    return updated;
  } else {
    return geometry;
  }
};

const validateContent = (geometry, content) => {
  if (content && content.some((value) => !value)) {
    for (const v of content) {
      console.log(`QQ/content: ${v}`);
    }
    throw Error(
      `Invalid content: ${JSON.stringify(geometry, (k, v) =>
        !v ? `<# ${v} #>` : v
      )} ${JSON.stringify(content, (k, v) => (!v ? `<# ${v} #>` : v))}`
    );
  }
  return content;
};

const rewrite = (geometry, op, state) => {
  const walk = (geometry, state) => {
    if (geometry.content) {
      return op(
        geometry,
        (changes, newState = state) =>
          update(
            geometry,
            {
              content: validateContent(
                geometry,
                geometry.content?.map?.((entry) => walk(entry, newState))
              ),
            },
            changes
          ),
        walk,
        state
      );
    } else {
      return op(geometry, (changes) => update(geometry, changes), walk, state);
    }
  };
  return walk(geometry, state);
};

const visit = (geometry, op, state) => {
  const walk = (geometry, state) => {
    if (geometry.content) {
      if (geometry.content.some((x) => x === undefined)) {
        throw Error(`Bad geometry: ${JSON.stringify(geometry)}`);
      }
      return op(
        geometry,
        (state) =>
          geometry.content?.forEach((geometry) => walk(geometry, state)),
        state
      );
    } else {
      return op(geometry, (state) => undefined, state);
    }
  };
  return walk(geometry, state);
};

const transform$4 = (matrix, geometry) => {
  const op = (geometry, descend, walk) =>
    descend({
      matrix: geometry.matrix
        ? composeTransforms(matrix, geometry.matrix)
        : matrix,
    });
  return rewrite(geometry, op);
};

const isNotVoid = ({ tags }) => {
  return tags === undefined || tags.includes('type:void') === false;
};

const isVoid = (geometry) => !isNotVoid(geometry);

const allTags = (geometry) => {
  const collectedTags = new Set();
  const op = ({ tags }, descend) => {
    if (tags !== undefined) {
      for (const tag of tags) {
        collectedTags.add(tag);
      }
    }
    descend();
  };
  visit(geometry, op);
  return collectedTags;
};

const graphSymbol = Symbol('graph');
const surfaceMeshSymbol = Symbol('surfaceMeshSymbol');

const fromSurfaceMeshLazy = (surfaceMesh, forceNewGraph = false) => {
  if (!surfaceMesh) {
    throw Error('null surfaceMesh');
  }
  let graph = surfaceMesh[graphSymbol];
  if (forceNewGraph || graph === undefined) {
    graph = fromSurfaceMeshToLazyGraph(surfaceMesh);
    surfaceMesh[graphSymbol] = graph;
    graph[surfaceMeshSymbol] = surfaceMesh;
  }
  return graph;
};

const taggedGraph = ({ tags = [], matrix }, graph) => {
  if (graph.length > 0) {
    throw Error('Graph should not be an array');
  }
  if (graph.graph) {
    throw Error('malformed graph');
  }
  return {
    type: 'graph',
    tags,
    graph,
    matrix,
  };
};

const alphaShape = ({ tags }, points, componentLimit) =>
  taggedGraph(
    { tags },
    fromSurfaceMeshLazy(
      fromPointsToAlphaShapeAsSurfaceMesh(points, componentLimit)
    )
  );

// import { fromPolygons } from './fromPolygons.js';
// import { toTriangles } from './toTriangles.js';

// Convert an outline graph to a possibly closed surface.
// export const fill = (graph) => fromPolygons(toTriangles(graph));

const fill$1 = (geometry) => ({
  ...geometry,
  graph: { ...geometry.graph, isOutline: true },
});

const deduplicate = (path) => {
  const unique = [];
  let last = path[path.length - 1];
  for (const point of path) {
    if (last === null || point === null || !equals(point, last)) {
      unique.push(point);
    }
    last = point;
  }
  return unique;
};

const flip$3 = (path) => {
  if (path[0] === null) {
    return [null, ...path.slice(1).reverse()];
  } else {
    return path.slice().reverse();
  }
};

const X$3 = 0;
const Y$3 = 1;

/**
 * Measure the area of a path as though it were a polygon.
 * A negative area indicates a clockwise path, and a positive area indicates a counter-clock-wise path.
 * See: http://mathworld.wolfram.com/PolygonArea.html
 * @returns {Number} The area the path would have if it were a polygon.
 */
const measureArea = (path) => {
  let last = path.length - 1;
  let current = path[0] === null ? 1 : 0;
  let twiceArea = 0;
  for (; current < path.length; last = current++) {
    twiceArea +=
      path[last][X$3] * path[current][Y$3] - path[last][Y$3] * path[current][X$3];
  }
  return twiceArea / 2;
};

const isClockwise = (path) => measureArea(path) < 0;

const clean = (path) => deduplicate(path);

const orientCounterClockwise = (path) =>
  isClockwise(path) ? flip$3(path) : path;

// This imposes a planar arrangement.
const fromPaths = ({ tags }, paths, plane = [0, 0, 1, 0]) => {
  if (plane[0] === 0 && plane[1] === 0 && plane[2] === 0 && plane[3] === 0) {
    throw Error(`Zero plane`);
  }
  const orientedPolygons = [];
  for (const { points } of arrangePathsIntoTriangles(plane, undefined, paths)) {
    const exterior = orientCounterClockwise(points);
    const cleaned = clean(exterior);
    if (cleaned.length < 3) {
      continue;
    }
    const orientedPolygon = { points: cleaned, plane };
    orientedPolygons.push(orientedPolygon);
  }
  return taggedGraph(
    { tags },
    fromSurfaceMeshLazy(fromPolygonsToSurfaceMesh(orientedPolygons))
  );
};

const eachItem = (geometry, op) => {
  const walk = (geometry, descend) => {
    switch (geometry.type) {
      case 'sketch': {
        // Sketches aren't real.
        return;
      }
      default: {
        op(geometry);
        return descend();
      }
    }
  };
  visit(geometry, walk);
};

const getFaceablePaths = (geometry) => {
  const pathsets = [];
  eachItem(geometry, (item) => {
    if (item.type !== 'paths') {
      return;
    }
    if (item.tags && item.tags.includes('paths/Wire')) {
      return;
    }
    pathsets.push(item);
  });
  return pathsets;
};

const getGraphs = (geometry) => {
  const graphs = [];
  eachItem(geometry, (item) => {
    if (item.type === 'graph') {
      graphs.push(item);
    }
  });
  return graphs;
};

const toSurfaceMesh = (graph) => {
  let surfaceMesh = graph[surfaceMeshSymbol];
  if (surfaceMesh !== undefined) {
    return surfaceMesh;
  }
  if (graph.serializedSurfaceMesh) {
    surfaceMesh = deserializeSurfaceMesh(graph.serializedSurfaceMesh);
  } else {
    surfaceMesh = fromGraphToSurfaceMesh(graph);
  }
  graph[surfaceMeshSymbol] = surfaceMesh;
  surfaceMesh[graphSymbol] = graph;
  return surfaceMesh;
};

const measureBoundingBox$3 = (geometry) => {
  if (
    geometry.cache === undefined ||
    geometry.cache.boundingBox === undefined
  ) {
    if (geometry.cache === undefined) {
      geometry.cache = {};
    }
    const { graph } = geometry;
    fromSurfaceMeshEmitBoundingBox(
      toSurfaceMesh(graph),
      geometry.matrix,
      (xMin, yMin, zMin, xMax, yMax, zMax) => {
        geometry.cache.boundingBox = [
          [xMin, yMin, zMin],
          [xMax, yMax, zMax],
        ];
      }
    );
  }
  return geometry.cache.boundingBox;
};

const iota$1 = 1e-5;
const X$2 = 0;
const Y$2 = 1;
const Z$2 = 2;

// Requires a conservative gap.
const doesNotOverlap$1 = (a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return true;
  }
  const [minA, maxA] = measureBoundingBox$3(a);
  const [minB, maxB] = measureBoundingBox$3(b);
  if (maxA[X$2] <= minB[X$2] - iota$1 * 10) {
    return true;
  }
  if (maxA[Y$2] <= minB[Y$2] - iota$1 * 10) {
    return true;
  }
  if (maxA[Z$2] <= minB[Z$2] - iota$1 * 10) {
    return true;
  }
  if (maxB[X$2] <= minA[X$2] - iota$1 * 10) {
    return true;
  }
  if (maxB[Y$2] <= minA[Y$2] - iota$1 * 10) {
    return true;
  }
  if (maxB[Z$2] <= minA[Z$2] - iota$1 * 10) {
    return true;
  }
  return false;
};

const difference$1 = (a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return a;
  }
  if (doesNotOverlap$1(a, b)) {
    return a;
  }
  const result = fromSurfaceMeshLazy(
    differenceOfSurfaceMeshes(
      toSurfaceMesh(a.graph),
      a.matrix,
      toSurfaceMesh(b.graph),
      b.matrix
    )
  );
  return taggedGraph({ tags: a.tags }, result);
};

const registry = new Map();

const reify = (geometry) => {
  if (geometry.type === 'plan' && geometry.content.length > 0) {
    return geometry;
  }
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
      case 'triangles':
      case 'points':
      case 'segments':
      case 'paths':
      case 'polygonsWithHoles':
        // No plan to realize.
        return geometry;
      case 'plan': {
        if (geometry.content.length === 0) {
          // This plan is not reified, generate content.
          const reifier = registry.get(geometry.plan.type);
          if (reifier === undefined) {
            throw Error(
              `Do not know how to reify plan: ${JSON.stringify(geometry.plan)}`
            );
          }
          const reified = reifier(geometry);
          geometry.content.push(reified);
          return descend();
        }
        return geometry;
      }
      case 'displayGeometry':
        // CHECK: Should this taint the results if there is a plan?
        return geometry;
      case 'item':
      case 'group':
      case 'layout':
      case 'sketch':
      case 'transform':
        return descend();
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

// We expect the type to be uniquely qualified.
const registerReifier = (type, reifier) => registry.set(type, reifier);

const fromPolygonsWithHolesToTriangles = (polygonsWithHoles) => {
  const triangles = [];
  for (const polygonWithHoles of polygonsWithHoles) {
    const paths = [polygonWithHoles, ...polygonWithHoles.holes];
    triangles.push(
      ...arrangePaths(
        polygonWithHoles.plane,
        polygonWithHoles.exactPlane,
        paths,
        /* triangulate= */ true
      )
    );
  }
  return triangles;
};

const fromTriangles = ({ tags, matrix }, triangles) =>
  taggedGraph(
    { tags, matrix },
    fromSurfaceMeshLazy(fromPolygonsToSurfaceMesh(triangles))
  );

const fromPolygonsWithHoles = (geometry) =>
  fromTriangles(
    { tags: geometry.tags, matrix: geometry.matrix },
    fromPolygonsWithHolesToTriangles(geometry.polygonsWithHoles)
  );

const taggedSegments = (
  { tags = [], matrix, orientation },
  segments
) => {
  return { type: 'segments', tags, matrix, segments, orientation };
};

const isClosed = (path) => path.length === 0 || path[0] !== null;
const isOpen = (path) => !isClosed(path);

// A path point may be supplemented by a 'forward' and a 'right' vector
// allowing it to define a plane with a rotation.

const transform$3 = (matrix, path) => {
  const transformedPath = [];
  if (isOpen(path)) {
    transformedPath.push(null);
  }
  for (let nth = isOpen(path) ? 1 : 0; nth < path.length; nth++) {
    const point = path[nth];
    const transformedPoint = transform$5(matrix, point);
    if (point.length > 3) {
      const forward = point.slice(3, 6);
      const transformedForward = transform$5(matrix, forward);
      transformedPoint.push(...transformedForward);
    }
    if (point.length > 6) {
      const right = point.slice(6, 9);
      const transformedRight = transform$5(matrix, right);
      transformedPoint.push(...transformedRight);
    }
    transformedPath.push(transformedPoint);
  }
  return transformedPath;
};

const transform$2 = (matrix, paths) =>
  paths.map((path) => transform$3(matrix, path));

// A point in a cloud may be supplemented by a 'forward' and a 'right' vector
// allowing it to define a plane with a rotation.

const transform$1 = (matrix, points) => {
  const transformedPoints = [];
  for (let nth = 0; nth < points.length; nth++) {
    const point = points[nth];
    const transformedPoint = transform$5(matrix, point);
    if (point.length > 3) {
      const forward = point.slice(3, 6);
      const transformedForward = transform$5(matrix, forward);
      transformedPoint.push(...transformedForward);
    }
    if (point.length > 6) {
      const right = point.slice(6, 9);
      const transformedRight = transform$5(matrix, right);
      transformedPoint.push(...transformedRight);
    }
    transformedPoints.push(transformedPoint);
  }
  return transformedPoints;
};

const transform = (matrix, polygons) =>
  polygons.map((polygon) => transform$6(matrix, polygon));

const transformedGeometry = Symbol('transformedGeometry');

const transformedOrientation = (matrix, [origin, normal, rotation]) => [
  transform$5(matrix, origin),
  transform$5(matrix, normal),
  transform$5(matrix, rotation),
];

const transformSegments = (geometry) => {
  const {
    matrix,
    orientation = [
      [0, 0, 0],
      [0, 0, 1],
      [1, 0, 0],
    ],
    segments,
  } = geometry;
  if (!matrix) {
    return geometry;
  }
  const transformed = [];
  for (const [start, end] of segments) {
    transformed.push([
      transform$5(matrix, start),
      transform$5(matrix, end),
    ]);
  }
  return taggedSegments(
    {
      tags: geometry.tags,
      orientation: transformedOrientation(matrix, orientation),
    },
    transformed
  );
};

const toTransformedGeometry = (geometry) => {
  if (geometry[transformedGeometry] === undefined) {
    const op = (geometry, descend, walk) => {
      if (geometry.matrix === undefined) {
        return descend();
      }
      switch (geometry.type) {
        // Branch
        case 'layout':
        case 'group':
        case 'item':
        case 'sketch':
        case 'plan':
          return descend();
        // Leaf
        case 'triangles':
          return descend({
            triangles: transform(geometry.matrix, geometry.triangles),
            matrix: undefined,
          });
        case 'polygonsWithHoles':
          return fromPolygonsWithHoles(geometry);
        case 'segments':
          return transformSegments(geometry);
        case 'paths':
          return descend({
            paths: transform$2(geometry.matrix, geometry.paths),
            matrix: undefined,
          });
        case 'points':
          return descend({
            points: transform$1(geometry.matrix, geometry.points),
            matrix: undefined,
          });
        case 'graph':
          // Graphs don't need a transformed version.
          return geometry;
        default:
          throw Error(
            `Unexpected geometry ${geometry.type} see ${JSON.stringify(
              geometry
            )}`
          );
      }
    };
    geometry[transformedGeometry] = rewrite(geometry, op);
  }
  return geometry[transformedGeometry];
};

const toConcreteGeometry = (geometry) =>
  toTransformedGeometry(reify(geometry));

const differenceImpl = (geometry, ...geometries) => {
  geometries = geometries.map(toConcreteGeometry);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        let differenced = geometry;
        for (const geometry of geometries) {
          for (const graph of getGraphs(geometry)) {
            differenced = difference$1(differenced, graph);
          }
          for (const pathsGeometry of getFaceablePaths(geometry)) {
            differenced = difference$1(
              differenced,
              fill$1(
                fromPaths(
                  { tags: pathsGeometry.tags },
                  pathsGeometry.paths.map((path) => ({ points: path }))
                )
              )
            );
          }
        }
        return differenced;
      }
      case 'paths':
        // This will have problems with open paths, but we want to phase this out anyhow.
        return difference(
          fill$1(
            fromPaths(
              { tags },
              geometry.paths.map((path) => ({ points: path }))
            )
          ),
          ...geometries
        );
      case 'segments':
      case 'points': {
        // Not implemented yet.
        return geometry;
      }
      case 'layout':
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for intersection.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toConcreteGeometry(geometry), op);
};

const difference = cache(differenceImpl);

const taggedGroup = ({ tags = [], matrix }, ...content) => {
  if (content.some((value) => !value)) {
    throw Error(`Undefined Group content`);
  }
  if (content.some((value) => value.length)) {
    throw Error(`Group content is an array`);
  }
  if (content.length === 1) {
    return content[0];
  }
  return { type: 'group', tags, matrix, content };
};

const disjoint = (geometries) => {
  geometries = [...geometries];
  for (let sup = geometries.length - 1; sup >= 0; sup--) {
    for (let sub = geometries.length - 1; sub > sup; sub--) {
      geometries[sup] = difference(geometries[sup], geometries[sub]);
    }
  }
  return taggedGroup({}, ...geometries);
};

const assemble = (...geometries) => disjoint(geometries);

const bend$1 = (geometry, radius) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      bendSurfaceMesh(toSurfaceMesh(geometry.graph), geometry.matrix, radius)
    )
  );

const doNothing = (geometry) => geometry;

const op =
  (
    {
      graph = doNothing,
      segments = doNothing,
      triangles = doNothing,
      points = doNothing,
    },
    method = rewrite
  ) =>
  (geometry, ...args) => {
    const walk = (geometry, descend) => {
      switch (geometry.type) {
        case 'graph':
          return graph(geometry, ...args);
        case 'segments':
          return segments(geometry, ...args);
        case 'triangles':
          return triangles(geometry, ...args);
        case 'points':
          return points(geometry, ...args);
        case 'plan':
          reify(geometry);
        // fall through
        case 'item':
        case 'group': {
          return descend();
        }
        case 'sketch': {
          // Sketches aren't real for op.
          return geometry;
        }
        default:
          throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
      }
    };

    return method(toTransformedGeometry(geometry), walk);
  };

const bend = op({ graph: bend$1 });

const close = (path) => (isClosed(path) ? path : path.slice(1));

const taggedPoints = ({ tags = [], matrix }, points, exactPoints) => {
  return { type: 'points', tags, matrix, points, exactPoints };
};

const computeCentroid$1 = (geometry) => {
  const approximate = [];
  const exact = [];
  computeCentroidOfSurfaceMesh(
    toSurfaceMesh(geometry.graph),
    geometry.matrix,
    approximate,
    exact
  );
  return taggedPoints({ tags: geometry.tags }, [approximate], [exact]);
};

const eachNonVoidItem = (geometry, op) => {
  const walk = (geometry, descend) => {
    // FIX: Sketches aren't real either -- but this is a bit unclear.
    if (geometry.type !== 'sketch' && isNotVoid(geometry)) {
      op(geometry);
      descend();
    }
  };
  visit(geometry, walk);
};

const getNonVoidGraphs = (geometry) => {
  const graphs = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'graph') {
      graphs.push(item);
    }
  });
  return graphs;
};

const getNonVoidPaths = (geometry) => {
  const pathsets = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'paths') {
      pathsets.push(item);
    }
  });
  return pathsets;
};

// FIX: Remove toDisjointGeometry and replace with a more meaningful operation.
const toDisjointGeometry = (geometry) => toConcreteGeometry(geometry);

const toVisiblyDisjointGeometry = (geometry) =>
  toDisjointGeometry(geometry);

// DEPRECATED
const toKeptGeometry = (geometry) => toDisjointGeometry(geometry);

const fill = (geometry, includeFaces = true, includeHoles = true) => {
  const keptGeometry = toKeptGeometry(geometry);
  const fills = [];
  for (const geometry of getNonVoidGraphs(keptGeometry)) {
    const { tags } = geometry;
    if (tags && tags.includes('path/Wire')) {
      continue;
    }
    if (geometry.graph.isOutline) {
      fills.push(fill$1(geometry));
    }
  }
  for (const { tags, paths } of getNonVoidPaths(keptGeometry)) {
    if (tags && tags.includes('path/Wire')) {
      continue;
    }
    fills.push(
      fill$1(
        fromPaths(
          { tags },
          paths.map((path) => ({ points: path }))
        )
      )
    );
  }
  return taggedGroup({}, ...fills);
};

const computeCentroid = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return computeCentroid$1(geometry);
      case 'polygonsWithHoles':
        return computeCentroid$1(fromPolygonsWithHoles(geometry));
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'paths':
        return computeCentroid(fill(geometry));
      case 'plan':
        return computeCentroid(reify(geometry).content[0]);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for extrude.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const computeNormal$1 = (geometry) => {
  const approximate = [];
  const exact = [];
  computeNormalOfSurfaceMesh(
    toSurfaceMesh(geometry.graph),
    geometry.matrix,
    approximate,
    exact
  );
  return taggedPoints({ tags: geometry.tags }, [approximate], [exact]);
};

const computeNormal = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return computeNormal$1(geometry);
      case 'polygonsWithHoles':
        return computeNormal$1(fromPolygonsWithHoles(geometry));
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'paths':
        return computeNormal(fill(geometry));
      case 'plan':
        return computeNormal(reify(geometry).content[0]);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for extrude.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const concatenate = (...paths) => {
  const result = [null, ...[].concat(...paths.map(close))];
  return result;
};

const canonicalizePoint = (point, index) => {
  if (point === null) {
    if (index !== 0) throw Error('Path has null not at head');
    return point;
  } else {
    return canonicalize$5(point);
  }
};

const canonicalize$4 = (path) => path.map(canonicalizePoint);

const canonicalize$3 = (paths) => {
  let canonicalized = paths.map(canonicalize$4);
  if (paths.properties !== undefined) {
    // Transfer properties.
    canonicalized.properties = paths.properties;
  }
  return canonicalized;
};

const canonicalize$2 = (points) => points.map(canonicalize$5);

const isDegenerate = (polygon) => {
  for (let nth = 0; nth < polygon.length; nth++) {
    if (equals(polygon[nth], polygon[(nth + 1) % polygon.length])) {
      return true;
    }
  }
  return false;
};

const canonicalize$1 = (polygons) => {
  const canonicalized = [];
  for (let polygon of polygons) {
    polygon = canonicalize$6(polygon);
    if (!isDegenerate(polygon)) {
      canonicalized.push(polygon);
    }
  }
  return canonicalized;
};

const eachEdge$1 = (graph, op) =>
  graph.edges.forEach((node, nth) => {
    if (node && node.isRemoved !== true) {
      op(nth, node);
    }
  });

const getEdgeNode = (graph, edge) => graph.edges[edge];
const getLoopNode = (graph, loop) => graph.loops[loop];

const removeZeroLengthEdges = (graph) => {
  let removed = false;
  eachEdge$1(graph, (edge, edgeNode) => {
    const nextEdgeNode = getEdgeNode(graph, edgeNode.next);
    if (edgeNode.point === nextEdgeNode.point) {
      // Cut the edge out of the loop.
      edgeNode.next = nextEdgeNode.next;
      // Ensure that the loop doesn't enter on the removed edge.
      getLoopNode(graph, edgeNode.loop).edge = edge;
      // Mark as removed for debugging purposes.
      nextEdgeNode.isRemoved = true;
      nextEdgeNode.next = -1;
      // Any twin should be in the same situation and remove itself.
      removed = true;
    }
  });
  return removed;
};

const repair = (graph) => {
  if (removeZeroLengthEdges(graph)) {
    if (!checkGraph(graph)) ;
    return true;
  }
  return false;
};

const checkTwins = (graph) => {
  eachEdge$1(graph, (edge, edgeNode) => {
    if (edgeNode.twin === -1) {
      return;
    }
    const twinNode = getEdgeNode(graph, edge.twin);
    if (!twinNode) {
      return;
    }
    if (twinNode.isRemoved) {
      throw Error('removed twin');
    }
  });
  return true;
};

const checkGraph = (graph) => {
  return checkTwins(graph);
};

const fromSurfaceMesh = (surfaceMesh) => {
  if (surfaceMesh === undefined) {
    throw Error('No surface mesh provided');
  }
  let graph = surfaceMesh[graphSymbol];
  if (graph === undefined || graph.isLazy) {
    const converted = fromSurfaceMeshToGraph(surfaceMesh);
    if (graph.isLazy) {
      Object.assign(graph, converted, { isLazy: false });
    } else {
      graph = converted;
    }
    if (!repair(graph)) {
      // If the graph wasn't repaired, we can re-use the input mesh.
      surfaceMesh[graphSymbol] = graph;
      graph[surfaceMeshSymbol] = surfaceMesh;
    }
  }
  return graph;
};

const realizeGraph = (geometry) => {
  if (geometry.graph.isLazy) {
    return {
      ...geometry,
      graph: fromSurfaceMesh(toSurfaceMesh(geometry.graph)),
    };
  } else {
    return geometry;
  }
};

const realize = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return realizeGraph(geometry);
      case 'displayGeometry':
      case 'segments':
      case 'triangles':
      case 'points':
      case 'paths':
      case 'polygonsWithHoles':
        // No lazy representation to realize.
        return geometry;
      case 'plan':
      case 'item':
      case 'group':
      case 'layout':
      case 'sketch':
      case 'transform':
        return descend();
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

const canonicalize = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'points':
        return descend({ points: canonicalize$2(geometry.points) });
      case 'segments':
        return geometry;
      case 'paths':
        return descend({ paths: canonicalize$3(geometry.paths) });
      case 'triangles':
        return descend({ triangles: canonicalize$1(geometry.triangles) });
      case 'plan':
        return descend({
          marks: canonicalize$2(geometry.marks),
          planes: geometry.planes.map(canonicalize$7),
        });
      case 'graph': {
        const realizedGeometry = realize(geometry);
        return descend({
          graph: {
            ...realizedGeometry.graph,
            points: canonicalize$2(realizedGeometry.graph.points),
          },
        });
      }
      case 'item':
      case 'group':
      case 'layout':
      case 'sketch':
        return descend();
      default:
        throw Error(`Unexpected geometry type ${geometry.type}`);
    }
  };
  return rewrite(toTransformedGeometry(geometry), op);
};

const convexHull = ({ tags }, points) =>
  taggedGraph(
    { tags },
    fromSurfaceMeshLazy(fromPointsToConvexHullAsSurfaceMesh(points))
  );

// FIX: Let's avoid a complete realization of the graph.
const eachPoint$3 = (geometry, emit) => {
  for (const point of realizeGraph(geometry).graph.points) {
    if (point !== undefined) {
      emit(transform$5(geometry.matrix || identityMatrix, point));
    }
  }
};

const eachPoint$2 = (thunk, paths) => {
  for (const path of paths) {
    for (const point of path) {
      if (point !== null) {
        thunk(point);
      }
    }
  }
};

const eachPoint$1 = (thunk, points) => {
  for (const point of points) {
    thunk(point);
  }
};

// FIX: Emit exactPoints as well as points.
const eachPoint = (emit, geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'plan':
        return eachPoint(emit, reify(geometry).content[0]);
      // fallthrough
      case 'group':
      case 'item':
      case 'layout':
        return descend();
      case 'polygonsWithHoles':
        for (const { points, holes } of geometry.polygonsWithHoles) {
          for (const point of points) {
            emit(point);
          }
          for (const { points } of holes) {
            for (const point of points) {
              emit(point);
            }
          }
        }
        return;
      case 'points':
        return eachPoint$1(emit, geometry.points);
      case 'segments':
        for (const [start, end] of geometry.segments) {
          emit(start);
          emit(end);
        }
        return;
      case 'paths':
        return eachPoint$2(emit, geometry.paths);
      case 'graph':
        return eachPoint$3(geometry, emit);
      case 'sketch':
        // Sketches do not contribute points.
        return;
      default:
        throw Error(
          `Unexpected geometry ${geometry.type} ${JSON.stringify(geometry)}`
        );
    }
  };
  visit(toTransformedGeometry(geometry), op);
};

// returns an array of two Vector3Ds (minimum coordinates and maximum coordinates)
const measureBoundingBox$2 = (points) => {
  let min$1 = [Infinity, Infinity, Infinity];
  let max$1 = [-Infinity, -Infinity, -Infinity];
  eachPoint$1((point) => {
    max$1 = max(max$1, point);
    min$1 = min(min$1, point);
  }, points);
  return [min$1, max$1];
};

const measureBoundingBox$1 = (polygons) => {
  if (polygons.measureBoundingBox === undefined) {
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    for (const path of polygons) {
      for (const point of path) {
        if (point[0] < min[0]) min[0] = point[0];
        if (point[1] < min[1]) min[1] = point[1];
        if (point[2] < min[2]) min[2] = point[2];
        if (point[0] > max[0]) max[0] = point[0];
        if (point[1] > max[1]) max[1] = point[1];
        if (point[2] > max[2]) max[2] = point[2];
      }
    }
    polygons.measureBoundingBox = [min, max];
  }
  return polygons.measureBoundingBox;
};

const measureBoundingBoxGeneric = (geometry) => {
  let minPoint = [Infinity, Infinity, Infinity];
  let maxPoint = [-Infinity, -Infinity, -Infinity];
  eachPoint((point) => {
    minPoint = min(minPoint, point);
    maxPoint = max(maxPoint, point);
  }, geometry);
  return [minPoint, maxPoint];
};

const measureBoundingBox = (geometry) => {
  let minPoint = [Infinity, Infinity, Infinity];
  let maxPoint = [-Infinity, -Infinity, -Infinity];

  const update = ([itemMinPoint, itemMaxPoint]) => {
    minPoint = min(minPoint, itemMinPoint);
    maxPoint = max(maxPoint, itemMaxPoint);
  };

  const op = (geometry, descend) => {
    if (isVoid(geometry)) {
      return;
    }
    switch (geometry.type) {
      case 'sketch':
        // Don't consider sketches as part of the geometry size.
        return;
      case 'plan':
      case 'group':
      case 'item':
      case 'displayGeometry':
        return descend();
      case 'graph':
        return update(measureBoundingBox$3(geometry));
      case 'layout':
        return update(geometry.marks);
      case 'points':
        return update(measureBoundingBox$2(geometry.points));
      case 'polygonsWithHoles':
      case 'segments':
      case 'paths':
        return update(measureBoundingBoxGeneric(geometry));
      case 'triangles':
        return update(measureBoundingBox$1(geometry.triangles));
      default:
        throw Error(`Unknown geometry: ${geometry.type}`);
    }
  };

  visit(toConcreteGeometry(geometry), op);

  return [minPoint, maxPoint];
};

const iota = 1e-5;
const X$1 = 0;
const Y$1 = 1;
const Z$1 = 2;

// Requires a conservative gap.
const doesNotOverlap = (a, b) => {
  if (a.isEmpty || b.isEmpty) {
    return true;
  }
  const [minA, maxA] = measureBoundingBox(a);
  const [minB, maxB] = measureBoundingBox(b);
  if (maxA[X$1] <= minB[X$1] - iota * 10) {
    return true;
  }
  if (maxA[Y$1] <= minB[Y$1] - iota * 10) {
    return true;
  }
  if (maxA[Z$1] <= minB[Z$1] - iota * 10) {
    return true;
  }
  if (maxB[X$1] <= minA[X$1] - iota * 10) {
    return true;
  }
  if (maxB[Y$1] <= minA[Y$1] - iota * 10) {
    return true;
  }
  if (maxB[Z$1] <= minA[Z$1] - iota * 10) {
    return true;
  }
  return false;
};

const hasMatchingTag = (set, tags, whenSetUndefined = false) => {
  if (set === undefined) {
    return whenSetUndefined;
  } else if (tags !== undefined && tags.some((tag) => set.includes(tag))) {
    return true;
  } else {
    return false;
  }
};

const buildCondition = (conditionTags, conditionSpec) => {
  switch (conditionSpec) {
    case 'has':
      return (geometryTags) => hasMatchingTag(geometryTags, conditionTags);
    case 'has not':
      return (geometryTags) => !hasMatchingTag(geometryTags, conditionTags);
    default:
      return undefined;
  }
};

const rewriteTagsImpl = (
  add,
  remove,
  geometry,
  conditionTags,
  conditionSpec
) => {
  const condition = buildCondition(conditionTags, conditionSpec);
  const composeTags = (geometryTags) => {
    if (condition === undefined || condition(geometryTags)) {
      if (geometryTags === undefined) {
        return add.filter((tag) => !remove.includes(tag));
      } else {
        return [...add, ...geometryTags].filter((tag) => !remove.includes(tag));
      }
    } else {
      return geometryTags;
    }
  };
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'group':
        return descend();
      default:
        const composedTags = composeTags(geometry.tags);
        if (composedTags === undefined) {
          const copy = { ...geometry };
          delete copy.tags;
          return copy;
        }
        if (composedTags === geometry.tags) {
          return geometry;
        } else {
          return descend({ tags: composedTags });
        }
    }
  };
  return rewrite(geometry, op);
};

const rewriteTags = cacheRewriteTags(rewriteTagsImpl);

// Dropped elements displace as usual, but are not included in positive output.

const drop = (tags, geometry) =>
  rewriteTags(['type:void'], [], geometry, tags, 'has');

const eachEdge = (geometry, emit) =>
  outlineSurfaceMesh(toSurfaceMesh(geometry.graph), geometry.matrix, emit);

const segments = (
  {
    matrix,
    orientation = [
      [0, 0, 0],
      [0, 0, 1],
      [1, 0, 0],
    ],
    segments,
  },
  emit
) => {
  for (const segment of segments) {
    emit(segment, orientation);
  }
};

const eachSegment = op({ graph: eachEdge, segments }, visit);

const fromEmpty = ({ tags } = {}) =>
  taggedGraph({ tags }, { isEmpty: true });

const empty = ({ tags }) => fromEmpty({ tags });

const extrude$1 = (geometry, height, depth, normal) => {
  const dir = {};
  if (normal.points && normal.points.length >= 1) {
    dir.direction = normal.points[0];
  }
  if (normal.exactPoints && normal.exactPoints.length >= 1) {
    dir.exactDirection = normal.exactPoints[0];
  }
  const extrudedMesh = extrudeSurfaceMesh(
    toSurfaceMesh(geometry.graph),
    geometry.matrix,
    height,
    depth,
    dir
  );
  if (!extrudedMesh) {
    console.log(`Extrusion failed`);
  }
  return taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(extrudedMesh)
  );
};

const extrude = (geometry, height, depth, direction) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return extrude$1(geometry, height, depth, reify(direction));
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'polygonsWithHoles':
        return extrude(
          fromPolygonsWithHoles(geometry),
          height,
          depth,
          reify(direction)
        );
      case 'paths':
        return extrude(fill(geometry), height, depth, reify(direction));
      case 'plan':
        return extrude(
          reify(geometry).content[0],
          height,
          depth,
          reify(direction)
        );
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for extrude.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  // CHECK: Why does this need transformed geometry?
  return rewrite(toTransformedGeometry(geometry), op);
};

// FIX: The face needs to be selected with the transform in mind.
const extrudeToPlane$1 = (geometry, highPlane, lowPlane, direction) => {
  let graph = realizeGraph(geometry.graph);
  if (graph.faces.length > 0) {
    // Arbitrarily pick the plane of the first graph to extrude along.
    if (direction === undefined) {
      for (const face of graph.faces) {
        if (face && face.plane) {
          direction = face.plane;
          break;
        }
      }
    }
    return taggedGraph(
      { tags: geometry.tags },
      fromSurfaceMeshLazy(
        extrudeToPlaneOfSurfaceMesh(
          toSurfaceMesh(graph),
          geometry.matrix,
          ...scale$3(1, direction),
          ...highPlane,
          ...scale$3(-1, direction),
          ...lowPlane
        )
      )
    );
  } else {
    return geometry;
  }
};

const extrudeToPlane = (geometry, highPlane, lowPlane, direction) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return extrudeToPlane$1(
          geometry.graph,
          highPlane,
          lowPlane,
          direction
        );
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for extrudeToPlane.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const taggedPolygonsWithHoles = (
  { tags = [], matrix, plane, exactPlane },
  polygonsWithHoles
) => {
  return {
    type: 'polygonsWithHoles',
    tags,
    matrix,
    plane,
    exactPlane,
    polygonsWithHoles,
  };
};

const faces$1 = (geometry) => {
  const faces = [];
  for (const {
    plane,
    exactPlane,
    polygonsWithHoles,
  } of fromSurfaceMeshToPolygonsWithHoles(
    toSurfaceMesh(geometry.graph),
    geometry.matrix
  )) {
    faces.push(
      taggedPolygonsWithHoles(
        { tags: geometry.tags, plane, exactPlane },
        polygonsWithHoles
      )
    );
  }
  return taggedGroup({}, ...faces);
};

const faces = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return faces$1(geometry);
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'paths':
        return faces(fill(geometry));
      case 'plan':
        return faces(reify(geometry).content[0]);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for faces.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

const flip$2 = (paths) => paths.map(flip$3);

const flip$1 = (points) =>
  points.map((point) => {
    if (point.length <= 3) {
      return point;
    }
    const [x, y, z, xF, yF, zF, xR, yR, zR] = point;
    const [xFR, yFR, zFR] = subtract(
      [x, y, z],
      subtract([xR, yR, zR], [x, y, z])
    );
    return [x, y, z, xF, yF, zF, xFR, yFR, zFR];
  });

const reverseFaceOrientations = (geometry) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      reverseFaceOrientationsOfSurfaceMesh(
        toSurfaceMesh(geometry.graph),
        geometry.matrix
      )
    )
  );

const flip = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return reverseFaceOrientations(geometry);
      case 'points':
        return { ...geometry, points: flip$1(geometry.points) };
      case 'paths':
        return { ...geometry, paths: flip$2(geometry.paths) };
      case 'group':
      case 'layout':
      case 'plan':
      case 'item':
        return descend();
      default:
        throw Error(`die: ${JSON.stringify(geometry)}`);
    }
  };
  return rewrite(geometry, op);
};

// Remove any symbols (which refer to cached values).
const fresh = (geometry) => {
  const fresh = {};
  for (const key of Object.keys(geometry)) {
    if (typeof key !== 'symbol') {
      fresh[key] = geometry[key];
    }
  }
  return fresh;
};

const fromFunction = ({ tags }, op, options) =>
  taggedGraph(
    { tags },
    fromSurfaceMeshLazy(
      fromFunctionToSurfaceMesh((x = 0, y = 0, z = 0) => op([x, y, z]), options)
    )
  );

const fromPoints = ({ tags }, points) =>
  taggedGraph({ tags }, fromSurfaceMeshLazy(fromPointsToSurfaceMesh(points)));

const fromPolygons = ({ tags }, polygons) =>
  taggedGraph(
    { tags },
    fromSurfaceMeshLazy(fromPolygonsToSurfaceMesh(polygons))
  );

const fromSurfaceToPathsImpl = (surface) => {
  return { type: 'paths', paths: surface };
};

const fromSurfaceToPaths = cache(fromSurfaceToPathsImpl);

const getAnyNonVoidSurfaces = (geometry) => {
  const surfaces = [];
  eachNonVoidItem(geometry, (item) => {
    switch (item.type) {
      case 'surface':
      case 'z0Surface':
        surfaces.push(item);
    }
  });
  return surfaces;
};

const getAnySurfaces = (geometry) => {
  const surfaces = [];
  eachItem(geometry, (item) => {
    switch (item.type) {
      case 'surface':
      case 'z0Surface':
        surfaces.push(item);
    }
  });
  return surfaces;
};

const getItems = (geometry) => {
  const items = [];
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'item':
        return items.push(geometry);
      case 'sketch':
        // We don't look inside sketches.
        return;
      default:
        return descend();
    }
  };
  visit(geometry, op);
  return items;
};

const getInverseMatrices = (geometry) => {
  geometry = toConcreteGeometry(geometry);
  switch (geometry.type) {
    case 'item': {
      // These maintain an invertible matrix.
      const global = geometry.matrix;
      const local = invertTransform(global);
      return { global, local };
    }
    case 'segments': {
      // This is a bit trickier.
      // We transform the matrices such that the first segment starts at [0, 0, 0], and extends to [length, 0, 0].
      const {
        orientation = [
          [0, 0, 0],
          [0, 0, 1],
          [1, 0, 0],
        ],
        segments,
      } = geometry;
      if (segments.length < 1) {
        // There's nothing to do.
        return { global: geometry.matrix, local: geometry.matrix };
      }
      const local = fromSegmentToInverseTransform(segments[0], orientation);
      const global = invertTransform(local);
      return { global, local };
    }
    default: {
      return { global: geometry.matrix, local: geometry.matrix };
    }
  }
};

const getLayouts = (geometry) => {
  const layouts = [];
  eachItem(geometry, (item) => {
    if (item.type === 'layout') {
      layouts.push(item);
    }
  });
  return layouts;
};

// Retrieve leaf geometry.

const getLeafs = (geometry) => {
  const leafs = [];
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'group':
      case 'layout':
        return descend();
      default:
        return leafs.push(geometry);
    }
  };
  visit(geometry, op);
  return leafs;
};

const getNonVoidItems = (geometry) => {
  const items = [];
  const op = (geometry, descend) => {
    if (geometry.type === 'item' && isNotVoid(geometry)) {
      items.push(geometry);
    } else {
      descend();
    }
  };
  visit(geometry, op);
  return items;
};

const getNonVoidFaceablePaths = (geometry) => {
  const pathsets = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type !== 'paths') {
      return;
    }
    if (item.tags && item.tags.includes('paths/Wire')) {
      return;
    }
    pathsets.push(item);
  });
  return pathsets;
};

const getNonVoidPlans = (geometry) => {
  const plans = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'plan') {
      plans.push(item);
    }
  });
  return plans;
};

const getNonVoidPoints = (geometry) => {
  const pointsets = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'points') {
      pointsets.push(item);
    }
  });
  return pointsets;
};

const getNonVoidSegments = (geometry) => {
  const segmentsets = [];
  eachNonVoidItem(geometry, (item) => {
    if (item.type === 'segments') {
      segmentsets.push(item);
    }
  });
  return segmentsets;
};

const getPaths = (geometry) => {
  const pathsets = [];
  eachItem(geometry, (item) => {
    if (item.type === 'paths') {
      pathsets.push(item);
    }
  });
  return pathsets;
};

const getEdges = (path) => {
  const edges = [];
  let last = null;
  for (const point of path) {
    if (point === null) {
      continue;
    }
    if (last !== null) {
      edges.push([last, point]);
    }
    last = point;
  }
  if (path[0] !== null) {
    edges.push([last, path[0]]);
  }
  return edges;
};

/**
 * Returns the first orientation peg found, or defaults to Z0.
 */

const getPeg = (geometry) => {
  let peg;
  eachItem(geometry, (item) => {
    if (item.type === 'points' && item.tags && item.tags.includes('peg')) {
      if (peg === undefined) {
        peg = item.points[0];
      }
    }
  });
  const [
    originX = 0,
    originY = 0,
    originZ = 0,
    forwardX = originX,
    forwardY = originY + 1,
    forwardZ = originZ,
    rightX = originX + 1,
    rightY = originY,
    rightZ = originZ,
  ] = peg || [];
  return [
    originX,
    originY,
    originZ,
    forwardX,
    forwardY,
    forwardZ,
    rightX,
    rightY,
    rightZ,
  ];
};

const getPlans = (geometry) => {
  const plans = [];
  eachItem(geometry, (item) => {
    if (item.type === 'plan') {
      plans.push(item);
    }
  });
  return plans;
};

const getPoints = (geometry) => {
  const pointsets = [];
  eachItem(geometry, (item) => {
    if (item.type === 'points') {
      pointsets.push(item);
    }
  });
  return pointsets;
};

const getTags = (geometry) => {
  if (geometry.tags === undefined) {
    return [];
  } else {
    return geometry.tags;
  }
};

const grow$1 = (geometry, amount) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      growSurfaceMesh(toSurfaceMesh(geometry.graph), geometry.matrix, amount)
    )
  );

const grow = (geometry, amount) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return grow$1(geometry, amount);
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return grow(reify(geometry).content[0], amount);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for push.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
let nanoid = (size = 21) => {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id
};

const hash = (geometry) => {
  if (geometry.hash === undefined) {
    geometry.hash = nanoid();
  }
  return geometry.hash;
};

const intersection$1 = (a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return fromEmpty();
  }
  if (doesNotOverlap$1(a, b)) {
    return fromEmpty();
  }
  const result = fromSurfaceMeshLazy(
    intersectionOfSurfaceMeshes(
      toSurfaceMesh(a.graph),
      a.matrix,
      toSurfaceMesh(b.graph),
      b.matrix
    )
  );
  return taggedGraph({ tags: a.tags }, result);
};

const taggedPaths = ({ tags = [], matrix }, paths) => ({
  type: 'paths',
  tags,
  matrix,
  paths,
});

const toPolygonsWithHoles$1 = (geometry) => {
  if (geometry.graph === undefined) {
    throw Error('geometry graph undefined');
  }
  const mesh = toSurfaceMesh(geometry.graph);
  const polygonsWithHoles = fromSurfaceMeshToPolygonsWithHoles(
    mesh,
    geometry.matrix
  );
  return polygonsWithHoles;
};

const toPaths = (geometry) => {
  const paths = [];
  for (const { polygonsWithHoles } of toPolygonsWithHoles$1(geometry)) {
    for (const { points, holes } of polygonsWithHoles) {
      paths.push(points);
      for (const { points } of holes) {
        paths.push(points);
      }
    }
  }
  return paths;
};

const getQuery = (geometry) => {
  const query = SurfaceMeshQuery(
    toSurfaceMesh(geometry.graph),
    geometry.matrix
  );
  const isInteriorPoint = (x, y, z) =>
    query.isIntersectingPointApproximate(x, y, z);
  const clipSegment = (
    [sourceX = 0, sourceY = 0, sourceZ = 0],
    [targetX = 0, targetY = 0, targetZ = 0]
  ) => {
    const segments = [];
    query.clipSegmentApproximate(
      sourceX,
      sourceY,
      sourceZ,
      targetX,
      targetY,
      targetZ,
      (sourceX, sourceY, sourceZ, targetX, targetY, targetZ) =>
        segments.push([
          [sourceX, sourceY, sourceZ],
          [targetX, targetY, targetZ],
        ])
    );
    return segments;
  };
  const clipSegments = (segments) => {
    const clipped = [];
    for (const [source, target] of segments) {
      clipped.push(...clipSegment(source, target));
    }
    return clipped;
  };
  const release = () => query.delete();
  return { clipSegment, clipSegments, isInteriorPoint, release };
};

const withQuery = (geometry, thunk) => {
  const queries = [];
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        queries.push(getQuery(geometry));
        return;
      default:
        descend();
    }
  };
  visit(toConcreteGeometry(geometry), op);
  const clipSegment = (source, target) => {
    const clippedSegments = [];
    for (const query of queries) {
      if (query.clipSegment) {
        clippedSegments.push(...query.clipSegment(source, target));
      }
    }
    return clippedSegments;
  };
  const clipSegments = (segments) => {
    const clippedSegments = [];
    for (const query of queries) {
      if (query.clipSegments) {
        clippedSegments.push(...query.clipSegments(segments));
      }
    }
    return clippedSegments;
  };
  const isInteriorPoint = (x = 0, y = 0, z = 0) => {
    for (const query of queries) {
      if (query.isInteriorPoint && query.isInteriorPoint(x, y, z)) {
        return true;
      }
    }
    return false;
  };
  thunk({ clipSegment, clipSegments, isInteriorPoint });
  for (const query of queries) {
    query.release();
  }
};

const intersection = (geometry, ...geometries) => {
  geometries = geometries.map(toConcreteGeometry);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        let input = geometry;
        const intersections = [];
        for (const geometry of geometries) {
          for (const graph of getNonVoidGraphs(geometry)) {
            intersections.push(intersection$1(input, graph));
          }
          for (const pathsGeometry of getNonVoidFaceablePaths(geometry)) {
            intersections.push(
              intersection$1(
                { tags },
                fromPaths(
                  { tags: pathsGeometry.tags },
                  pathsGeometry.paths
                )
              )
            );
          }
        }
        return taggedGroup({ tags }, ...intersections);
      }
      case 'paths': {
        if (tags && tags.includes('paths/Wire')) {
          return geometry;
        }
        return taggedPaths(
          { tags },
          toPaths(
            intersection(
              fromPaths({ tags }, geometry.paths),
              ...geometries
            )
          )
        );
      }
      case 'segments': {
        const clippedSegments = [];
        for (const otherGeometry of geometries) {
          withQuery(otherGeometry, ({ clipSegments }) => {
            if (clipSegments) {
              clippedSegments.push(...clipSegments(geometry.segments));
            }
          });
        }
        return taggedSegments({ tags }, clippedSegments);
      }
      case 'points': {
        // Not implemented yet.
        return geometry;
      }
      case 'layout':
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for intersection.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toConcreteGeometry(geometry), op);
};

const inset$1 = (geometry, initial, step, limit) => {
  info('inset begin');
  const insetGraphs = [];
  const { tags, plane, exactPlane } = geometry;
  for (const { polygonsWithHoles } of toPolygonsWithHoles$1(geometry)) {
    for (const polygonWithHoles of polygonsWithHoles) {
      for (const insetPolygon of insetOfPolygonWithHoles(
        initial,
        step,
        limit,
        polygonWithHoles
      )) {
        insetGraphs.push(
          fromPolygonsWithHoles(
            taggedPolygonsWithHoles({ tags, plane, exactPlane }, [insetPolygon])
          )
        );
      }
    }
  }
  info('inset end');
  return insetGraphs;
};

const inset = (geometry, initial = 1, step, limit) => {
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph':
        return taggedGroup(
          { tags },
          ...inset$1(geometry, initial, step, limit)
        );
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'polygonsWithHoles':
        return inset(
          fromPolygonsWithHoles(geometry),
          initial,
          step,
          limit
        );
      case 'paths':
        return inset(
          fromPaths(
            { tags },
            geometry.paths.map((path) => ({ points: path }))
          ),
          initial,
          step,
          limit
        );
      case 'plan':
        return inset(reify(geometry).content[0], initial, step, limit);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for inset.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const isCounterClockwise = (path) => measureArea(path) > 0;

const hasNotType = (geometry, type) =>
  isNotType(geometry, type)
    ? geometry
    : { ...geometry, tags: geometry.tags.filter((tag) => tag !== type) };
const hasType = (geometry, type) =>
  isType(geometry, type)
    ? geometry
    : { ...geometry, tags: [...geometry.tags, type] };
const isNotType = ({ tags }, type) => !tags.includes(type);
const isType = ({ tags }, type) => tags.includes(type);

const typeVoid = 'type:void';
const hasNotTypeVoid = (geometry) => hasNotType(geometry, typeVoid);
const hasTypeVoid = (geometry) => hasType(geometry, typeVoid);
const isNotTypeVoid = (geometry) => isNotType(geometry, typeVoid);
const isTypeVoid = (geometry) => isType(geometry, typeVoid);

const typeWire = 'type:wire';
const hasNotTypeWire = (geometry) => hasNotType(geometry, typeWire);
const hasTypeWire = (geometry) => hasType(geometry, typeWire);
const isNotTypeWire = (geometry) => isNotType(geometry, typeWire);
const isTypeWire = (geometry) => isType(geometry, typeWire);

const keep = (tags, geometry) =>
  rewriteTags(['type:void'], [], geometry, tags, 'has not');

const loft$1 = (closed, ...geometries) =>
  taggedGraph(
    { tags: geometries[0].tags },
    fromSurfaceMeshLazy(
      loftBetweenCongruentSurfaceMeshes(
        closed,
        ...geometries.map((geometry) => [
          toSurfaceMesh(geometry.graph),
          geometry.matrix,
        ])
      )
    )
  );

const loft = (closed, geometry, ...geometries) => {
  geometries = geometries.map(reify);
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph': {
        const lofts = [geometry];
        // This is a bit fragile -- let's consider expressing this in terms of transforms.
        for (const otherGeometry of geometries) {
          for (const otherGraphGeometry of getNonVoidGraphs(otherGeometry)) {
            lofts.push(otherGraphGeometry);
          }
        }
        return loft$1(closed, ...lofts);
      }
      case 'polygonsWithHoles':
        return loft(
          closed,
          fromPolygonsWithHoles(geometry),
          ...geometries
        );
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return loft(closed, reify(geometry).content[0], ...geometries);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

const minkowskiDifference$1 = ({ tags }, a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return a;
  }
  return taggedGraph(
    { tags },
    fromSurfaceMeshLazy(
      minkowskiDifferenceOfSurfaceMeshes(
        toSurfaceMesh(a.graph),
        a.matrix,
        toSurfaceMesh(b.graph),
        b.matrix
      )
    )
  );
};

const minkowskiDifference = (geometry, offset) => {
  offset = reify(offset);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        const differences = [];
        for (const otherGeometry of getNonVoidGraphs(offset)) {
          differences.push(
            minkowskiDifference$1({ tags }, geometry, otherGeometry)
          );
        }
        return taggedGroup({}, ...differences);
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return minkowskiDifference(reify(geometry).content[0], offset);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const minkowskiShell$1 = ({ tags }, a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return a;
  }
  return taggedGraph(
    { tags },
    fromSurfaceMeshLazy(
      minkowskiShellOfSurfaceMeshes(
        toSurfaceMesh(a.graph),
        a.matrix,
        toSurfaceMesh(b.graph),
        b.matrix
      )
    )
  );
};

const minkowskiShell = (geometry, offset) => {
  offset = reify(offset);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        const sums = [];
        for (const otherGeometry of getNonVoidGraphs(offset)) {
          sums.push(minkowskiShell$1({ tags }, geometry, otherGeometry));
        }
        return taggedGroup({}, ...sums);
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return minkowskiShell(reify(geometry).content[0], offset);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for push.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const minkowskiSum$1 = ({ tags }, a, b) => {
  if (a.graph.isEmpty || b.graph.isEmpty) {
    return a;
  }
  return taggedGraph(
    { tags },
    fromSurfaceMeshLazy(
      minkowskiSumOfSurfaceMeshes(
        toSurfaceMesh(a.graph),
        a.matrix,
        toSurfaceMesh(b.graph),
        b.matrix
      )
    )
  );
};

const minkowskiSum = (geometry, offset) => {
  offset = reify(offset);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        const sums = [];
        for (const otherGeometry of getNonVoidGraphs(offset)) {
          sums.push(minkowskiSum$1({ tags }, geometry, otherGeometry));
        }
        return taggedGroup({}, ...sums);
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return minkowskiSum(reify(geometry).content[0], offset);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for push.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const offset$1 = (geometry, initial, step, limit) => {
  info('offset begin');
  const offsetGraphs = [];
  const { tags, plane, exactPlane } = geometry;
  for (const { polygonsWithHoles } of toPolygonsWithHoles$1(geometry)) {
    for (const polygonWithHoles of polygonsWithHoles) {
      for (const offsetPolygon of offsetOfPolygonWithHoles(
        initial,
        step,
        limit,
        polygonWithHoles
      )) {
        offsetGraphs.push(
          fromPolygonsWithHoles(
            taggedPolygonsWithHoles({ tags, plane, exactPlane }, [
              offsetPolygon,
            ])
          )
        );
      }
    }
  }
  info('offset end');
  return offsetGraphs;
};

const offset = (geometry, initial = 1, step, limit) => {
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph':
        return taggedGroup(
          { tags },
          ...offset$1(geometry, initial, step, limit)
        );
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'polygonsWithHoles':
        return offset(
          fromPolygonsWithHoles(geometry),
          initial,
          step,
          limit
        );
      case 'paths':
        return offset(
          fromPaths(
            { tags },
            geometry.paths.map((path) => ({ points: path }))
          ),
          initial,
          step,
          limit
        );
      case 'plan':
        return offset(reify(geometry).content[0], initial, step, limit);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for offset.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const open = (path) => (isClosed(path) ? [null, ...path] : path);

const outline$1 = ({ tags }, geometry) => {
  geometry.cache = geometry.cache || {};
  if (geometry.cache.outline === undefined) {
    const segments = [];
    outlineSurfaceMesh(
      toSurfaceMesh(geometry.graph),
      geometry.matrix,
      (segment) => segments.push(segment)
    );
    geometry.cache.outline = taggedSegments({ tags }, segments);
  }
  return geometry.cache.outline;
};

// FIX: The semantics here are a bit off.
// Let's consider the case of Assembly(Square(10), Square(10).outline()).outline().
// This will drop the Square(10).outline() as it will not be outline-able.
// Currently we need this so that things like withOutline() will work properly,
// but ideally outline would be idempotent and rewrite shapes as their outlines,
// unless already outlined, and handle the withOutline case within this.
const outline = (geometry, tagsOverride) => {
  const concreteGeometry = toConcreteGeometry(geometry);
  const outlines = [];
  for (let graphGeometry of getNonVoidGraphs(concreteGeometry)) {
    let tags = graphGeometry.tags;
    if (tagsOverride) {
      tags = tagsOverride;
    }
    outlines.push(hasTypeWire(outline$1({ tags }, graphGeometry)));
  }
  for (let segmentsGeometry of getNonVoidSegments(concreteGeometry)) {
    outlines.push(hasTypeWire(segmentsGeometry));
  }
  // Turn paths into wires.
  for (let { tags = [], paths } of getNonVoidPaths(concreteGeometry)) {
    if (tagsOverride) {
      tags = tagsOverride;
    }
    const segments = [];
    for (const path of paths) {
      for (const edge of getEdges(path)) {
        segments.push(edge);
      }
    }
    outlines.push(hasTypeWire(taggedSegments({ tags }, segments)));
  }
  return outlines;
};

const projectToPlane$1 = (geometry, plane, direction) => {
  let { graph } = geometry;
  return taggedGraph(
    {},
    fromSurfaceMeshLazy(
      projectToPlaneOfSurfaceMesh(
        toSurfaceMesh(graph),
        geometry.matrix,
        ...scale$3(1, direction),
        ...plane
      )
    )
  );
};

const projectToPlane = (geometry, plane, direction) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return projectToPlane$1(geometry, plane, direction);
      case 'triangles':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'paths':
        return projectToPlane(
          fromPaths(geometry.paths),
          plane,
          direction
        );
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for projectToPlane.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const prepareForSerialization$1 = (geometry) => {
  const { graph } = geometry;
  if (!graph.serializedSurfaceMesh) {
    measureBoundingBox$3(geometry);
    graph.serializedSurfaceMesh = serializeSurfaceMesh(toSurfaceMesh(graph));
  }
  return graph;
};

const prepareForSerialization = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        prepareForSerialization$1(geometry);
        return;
      case 'displayGeometry':
      case 'triangles':
      case 'points':
      case 'segments':
      case 'paths':
      case 'polygonsWithHoles':
        return;
      case 'item':
      case 'group':
      case 'layout':
      case 'sketch':
      case 'transform':
      case 'plan':
        return descend();
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  visit(geometry, op);

  return geometry;
};

const push$1 = (geometry, force, minimumDistance, maximumDistance) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      pushSurfaceMesh(
        toSurfaceMesh(geometry.graph),
        geometry.matrix,
        force,
        minimumDistance,
        maximumDistance
      )
    )
  );

const push = (
  geometry,
  { force, minimumDistance, maximumDistance } = {}
) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return push$1(geometry, force, minimumDistance, maximumDistance);
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        // CHECK: Isn't this case made redundant by toTransformedGeometry?
        return push(reify(geometry).content[0], {
          force,
          minimumDistance,
          maximumDistance,
        });
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for push.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const read = async (path) => read$1(path);

const remesh$1 = (geometry, { lengths = [1] } = {}) =>
  taggedGraph(
    { tags: geometry.tags, matrix: geometry.matrix },
    fromSurfaceMeshLazy(
      remeshSurfaceMesh(toSurfaceMesh(geometry.graph), ...lengths)
    )
  );

const remesh = (geometry, options) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph': {
        return remesh$1(geometry, options);
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return remesh(reify(geometry).content[0], options);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for remesh.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const rerealizeGraph = (graph) =>
  fromSurfaceMeshLazy(toSurfaceMesh(graph), /* forceNewGraph= */ true);

const translate$2 = (vector, path) =>
  transform$3(fromTranslation(vector), path);
const rotateZ$1 = (radians, path) =>
  transform$3(fromZRotation(radians), path);
const scale$2 = (vector, path) => transform$3(fromScaling(vector), path);

const scale$1 = ([x = 1, y = 1, z = 1], paths) =>
  transform$2(fromScaling([x, y, z]), paths);
const translate$1 = ([x = 0, y = 0, z = 0], paths) =>
  transform$2(fromTranslation([x, y, z]), paths);

const sections = (geometry, matrices, { profile = false } = {}) => {
  const graphs = [];
  for (const planarMesh of sectionOfSurfaceMesh(
    toSurfaceMesh(geometry.graph),
    geometry.matrix,
    matrices,
    /* profile= */ profile
  )) {
    graphs.push(
      taggedGraph({ tags: geometry.tags }, fromSurfaceMeshLazy(planarMesh))
    );
  }
  return graphs;
};

const sectionImpl = (geometry, matrices, { profile = false }) => {
  const transformedGeometry = toTransformedGeometry(reify(geometry));
  const sections$1 = [];
  for (const geometry of getNonVoidGraphs(transformedGeometry)) {
    for (const section of sections(geometry, matrices, { profile })) {
      sections$1.push(section);
    }
  }
  return taggedGroup({}, ...sections$1);
};

const section = cacheSection(sectionImpl);

const smooth$1 = (geometry, options = {}) => {
  const { method = 'Remesh' } = options;
  switch (method) {
    case 'Remesh':
      return taggedGraph(
        { tags: geometry.tags },
        fromSurfaceMeshLazy(
          remeshSurfaceMesh(toSurfaceMesh(geometry.graph), options)
        )
      );
    default:
      return taggedGraph(
        { tags: geometry.tags },
        fromSurfaceMeshLazy(
          subdivideSurfaceMesh(toSurfaceMesh(geometry.graph), options)
        )
      );
  }
};

const smooth = (geometry, options) => {
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        return taggedGraph({ tags }, smooth$1(geometry.graph, options));
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return smooth(reify(geometry).content[0], options);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for smooth.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const separate$1 = (
  geometry,
  keepVolumes = true,
  keepCavitiesInVolumes = true,
  keepCavitiesAsVolumes = false
) =>
  taggedGroup(
    {},
    ...separateSurfaceMesh(
      toSurfaceMesh(geometry.graph),
      keepVolumes,
      keepCavitiesInVolumes,
      keepCavitiesAsVolumes
    ).map((mesh) =>
      taggedGraph(
        { tags: geometry.tags, matrix: geometry.matrix },
        fromSurfaceMeshLazy(mesh)
      )
    )
  );

const separate = (
  geometry,
  keepVolumes = true,
  keepCavitiesInVolumes = true,
  keepCavitiesAsVolumes = false
) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return separate$1(
          geometry,
          keepVolumes,
          keepCavitiesInVolumes,
          keepCavitiesAsVolumes
        );
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return separate(
          reify(geometry).content[0],
          keepVolumes,
          keepCavitiesInVolumes,
          keepCavitiesAsVolumes
        );
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(geometry, op);
};

const taggedTriangles = ({ tags = [], matrix }, triangles) => {
  return { type: 'triangles', tags, matrix, triangles };
};

Error.stackTraceLimit = Infinity;

const toTriangles$1 = ({ tags }, geometry) => {
  geometry.cache = geometry.cache || {};
  if (!geometry.cache.triangles) {
    const { matrix, graph } = geometry;
    const triangles = taggedTriangles(
      { tags },
      fromSurfaceMeshToTriangles(toSurfaceMesh(graph), matrix)
    );
    geometry.cache.triangles = triangles;
  }
  return geometry.cache.triangles;
};

const toTriangles = (geometry) =>
  toTriangles$1(
    { tags: geometry.tags },
    fromPolygonsWithHoles(geometry)
  );

const wireframe$1 = ({ tags }, geometry) => {
  geometry.cache = geometry.cache || {};
  if (geometry.cache.wireframe === undefined) {
    geometry.cache.wireframe = taggedSegments(
      { tags },
      wireframeSurfaceMesh(toSurfaceMesh(geometry.graph), geometry.matrix)
    );
  }
  return geometry.cache.wireframe;
};

const wireframe = (geometry, tagsOverride) => {
  const disjointGeometry = toDisjointGeometry(geometry);
  const wireframes = [];
  for (let graphGeometry of getNonVoidGraphs(disjointGeometry)) {
    let tags = graphGeometry.tags;
    if (tagsOverride) {
      tags = tagsOverride;
    }
    wireframes.push(wireframe$1({ tags }, graphGeometry));
  }
  // Turn paths into wires.
  for (let { tags = [], paths } of getNonVoidPaths(disjointGeometry)) {
    if (tagsOverride) {
      tags = tagsOverride;
    }
    wireframes.push(taggedPaths({ tags: [...tags, 'path/Wire'] }, paths));
  }
  return wireframes;
};

const soup = (
  geometry,
  { doTriangles = true, doOutline = true, doWireframe = true } = {}
) => {
  const outline$1 = doOutline ? outline : () => [];
  const wireframe$1 = doWireframe
    ? (geometry) => wireframe(geometry)
    : () => [];
  const triangles = doTriangles
    ? ({ tags }, geometry) => [toTriangles$1({ tags }, geometry)]
    : () => [];
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph': {
        const { graph, tags } = geometry;
        if (graph.isWireframe) {
          return taggedPaths({ tags }, toPaths(graph));
        } else if (graph.isClosed) {
          return taggedGroup(
            {},
            ...triangles({ tags }, geometry),
            ...wireframe$1(geometry),
            ...outline$1(geometry, ['color:black'])
          );
        } else if (graph.isEmpty) {
          return taggedGroup({});
        } else {
          // FIX: Simplify this arrangement.
          return taggedGroup(
            {},
            ...triangles({ tags }, geometry),
            ...wireframe$1(geometry),
            ...outline$1(geometry, ['color:black'])
          );
        }
      }
      // Unreachable.
      case 'polygons':
        return taggedTriangles(
          { tags: geometry.tags },
          toTriangles(geometry)
        );
      case 'polygonsWithHoles':
        return toTriangles(geometry);
      case 'segments':
      case 'triangles':
      case 'points':
      case 'paths':
        // Already soupy enough.
        return geometry;
      case 'displayGeometry':
        // soup can handle displayGeometry.
        return descend();
      case 'layout':
      case 'plan':
      case 'item':
      case 'sketch':
      case 'group': {
        return descend();
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const taggedItem = ({ tags = [], matrix }, ...content) => {
  if (tags !== undefined && tags.length === undefined) {
    throw Error(`Bad tags: ${tags}`);
  }
  if (content.some((value) => value === undefined)) {
    throw Error(`Undefined Item content`);
  }
  if (content.length !== 1) {
    throw Error(`Item expects a single content geometry`);
  }
  return { type: 'item', tags, matrix, content };
};

const taggedDisplayGeometry = ({ tags = [], matrix }, ...content) => {
  if (content.some((value) => value === undefined)) {
    throw Error(`Undefined DisplayGeometry content`);
  }
  if (content.length !== 1) {
    throw Error(`DisplayGeometry expects a single content geometry`);
  }
  return { type: 'displayGeometry', tags, matrix, content };
};

const taggedLayout = (
  { tags = [], matrix, size, margin, title, marks = [] },
  ...content
) => {
  if (content.some((value) => value === undefined)) {
    throw Error(`Undefined Layout content`);
  }
  if (content.some((value) => value.length)) {
    throw Error(`Layout content is an array`);
  }
  if (content.some((value) => value.geometry)) {
    throw Error(`Likely Shape in Layout`);
  }
  return {
    type: 'layout',
    layout: { size, margin, title },
    marks,
    tags,
    matrix,
    content,
  };
};

const taggedPlan = ({ tags = [], matrix }, plan) => ({
  type: 'plan',
  tags,
  matrix,
  plan,
  content: [],
});

const taggedPolygons = ({ tags = [], matrix }, polygons) => {
  return { type: 'polygons', tags, matrix, polygons };
};

const taggedSketch = ({ tags = [], matrix }, ...content) => {
  if (content.some((value) => value === undefined)) {
    throw Error(`Undefined Sketch content`);
  }
  if (content.length !== 1) {
    throw Error(`Sketch expects a single content geometry`);
  }
  return { type: 'sketch', tags, matrix, content };
};

const taper$1 = (
  geometry,
  xPlusFactor,
  xMinusFactor,
  yPlusFactor,
  yMinusFactor,
  zPlusFactor,
  zMinusFactor
) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      taperSurfaceMesh(
        toSurfaceMesh(geometry.graph),
        geometry.matrix,
        xPlusFactor,
        xMinusFactor,
        yPlusFactor,
        yMinusFactor,
        zPlusFactor,
        zMinusFactor
      )
    )
  );

const taper = (
  geometry,
  xPlusFactor,
  xMinusFactor,
  yPlusFactor,
  yMinusFactor,
  zPlusFactor,
  zMinusFactor
) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph': {
        return taper$1(
          geometry,
          xPlusFactor,
          xMinusFactor,
          yPlusFactor,
          yMinusFactor,
          zPlusFactor,
          zMinusFactor
        );
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return taper(
          reify(geometry).content[0],
          xPlusFactor,
          xMinusFactor,
          yPlusFactor,
          yMinusFactor,
          zPlusFactor,
          zMinusFactor
        );
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for taper.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const test$1 = (graph) => {
  if (doesSelfIntersectOfSurfaceMesh(toSurfaceMesh(graph))) {
    throw Error('Self-intersection detected');
  }
  return graph;
};

const test = (geometry) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph':
        return test$1(geometry.graph);
      case 'solid':
      case 'z0Surface':
      case 'surface':
      case 'points':
      case 'paths':
        return;
      case 'plan':
        return test(reify(geometry).content[0]);
      case 'transform':
      case 'layout':
      case 'item':
      case 'group':
      case 'sketch':
        return descend();
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  visit(geometry, op);
  return geometry;
};

const toDisplayGeometry = (
  geometry,
  { triangles, outline = true, skin, wireframe = false } = {}
) => {
  if (!geometry) {
    throw Error('die');
  }
  if (skin === undefined) {
    skin = triangles;
  }
  if (skin === undefined) {
    skin = true;
  }
  return soup(toConcreteGeometry(geometry), {
    doTriangles: skin,
    doOutline: outline,
    doWireframe: wireframe,
  });
};

// The resolution is 1 / multiplier.
const multiplier = 1e5;

const X = 0;
const Y = 1;
const Z = 2;

// FIX: Use createNormalize3
const createPointNormalizer = () => {
  const map = new Map();
  const normalize = (coordinate) => {
    // Apply a spatial quantization to the 3 dimensional coordinate.
    const nx = Math.floor(coordinate[X] * multiplier - 0.5);
    const ny = Math.floor(coordinate[Y] * multiplier - 0.5);
    const nz = Math.floor(coordinate[Z] * multiplier - 0.5);
    // Look for an existing inhabitant.
    const value = map.get(`${nx}/${ny}/${nz}`);
    if (value !== undefined) {
      return value;
    }
    // One of the ~0 or ~1 values will match the rounded values above.
    // The other will match the adjacent cell.
    const nx0 = nx;
    const ny0 = ny;
    const nz0 = nz;
    const nx1 = nx0 + 1;
    const ny1 = ny0 + 1;
    const nz1 = nz0 + 1;
    // Populate the space of the quantized coordinate and its adjacencies.
    // const normalized = [nx1 / multiplier, ny1 / multiplier, nz1 / multiplier];
    const normalized = coordinate;
    map.set(`${nx0}/${ny0}/${nz0}`, normalized);
    map.set(`${nx0}/${ny0}/${nz1}`, normalized);
    map.set(`${nx0}/${ny1}/${nz0}`, normalized);
    map.set(`${nx0}/${ny1}/${nz1}`, normalized);
    map.set(`${nx1}/${ny0}/${nz0}`, normalized);
    map.set(`${nx1}/${ny0}/${nz1}`, normalized);
    map.set(`${nx1}/${ny1}/${nz0}`, normalized);
    map.set(`${nx1}/${ny1}/${nz1}`, normalized);
    // This is now the normalized coordinate for this region.
    return normalized;
  };
  return normalize;
};

const toPoints = (geometry) => {
  const normalize = createPointNormalizer();
  const points = new Set();
  eachPoint((point) => points.add(normalize(point)), geometry);
  return { type: 'points', points: [...points] };
};

const toPolygonsWithHoles = (geometry) => {
  const output = [];

  const op = (geometry, descend) => {
    if (isVoid(geometry)) {
      return;
    }
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        for (const {
          plane,
          exactPlane,
          polygonsWithHoles,
        } of toPolygonsWithHoles$1(geometry)) {
          output.push(
            taggedPolygonsWithHoles(
              { tags, plane, exactPlane },
              polygonsWithHoles
            )
          );
        }
        break;
      }
      // FIX: Support 'triangles'?
      case 'segments':
      case 'points':
      case 'paths':
      case 'sketch':
        break;
      case 'layout':
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  visit(toConcreteGeometry(geometry), op);

  return output;
};

const twist$1 = (geometry, turnsPerMm) =>
  taggedGraph(
    { tags: geometry.tags },
    fromSurfaceMeshLazy(
      twistSurfaceMesh(
        toSurfaceMesh(geometry.graph),
        geometry.matrix,
        turnsPerMm
      )
    )
  );

const twist = (geometry, turnsPerMm, axis) => {
  const op = (geometry, descend) => {
    switch (geometry.type) {
      case 'graph': {
        return twist$1(geometry, turnsPerMm);
      }
      case 'triangles':
      case 'paths':
      case 'points':
        // Not implemented yet.
        return geometry;
      case 'plan':
        return twist(reify(geometry).content[0], turnsPerMm);
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for twist.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toTransformedGeometry(geometry), op);
};

const union$2 = (a, b) => {
  if (a.graph.isEmpty) {
    return b;
  }
  if (b.graph.isEmpty) {
    return a;
  }
  // FIX: In an ideal world, if a and b do not overlap, we would generate a disjointAssembly of the two.
  const result = fromSurfaceMeshLazy(
    unionOfSurfaceMeshes(
      toSurfaceMesh(a.graph),
      a.matrix,
      toSurfaceMesh(b.graph),
      b.matrix
    )
  );
  return taggedGraph({ tags: a.tags }, result);
};

const union$1 = (...geometries) => [].concat(...geometries);

// Union is a little more complex, since it can violate disjointAssembly invariants.
const unionImpl = (geometry, ...geometries) => {
  geometries = geometries.map(toConcreteGeometry);
  const op = (geometry, descend) => {
    const { tags } = geometry;
    switch (geometry.type) {
      case 'graph': {
        let unified = geometry;
        for (const geometry of geometries) {
          for (const graph of getNonVoidGraphs(geometry)) {
            unified = union$2(unified, graph);
          }
          for (const pathsGeometry of getNonVoidFaceablePaths(geometry)) {
            unified = union$2(
              unified,
              fromPaths(
                { tags: pathsGeometry.tags },
                pathsGeometry.paths
              )
            );
          }
        }
        return unified;
      }
      case 'paths': {
        if (tags && tags.includes('path/Wire')) {
          return geometry;
        }
        return taggedPaths(
          { tags },
          toPaths(
            union(
              fromPaths({ tags: geometry.tags }, geometry.paths),
              ...geometries
            )
          )
        );
      }
      case 'points': {
        const { points, tags } = geometry;
        const pointsets = [];
        for (const { points } of getNonVoidPoints(geometry)) {
          pointsets.push(points);
        }
        return taggedPoints({ tags }, union$1(points, ...pointsets));
      }
      case 'segments':
      case 'layout':
      case 'plan':
      case 'item':
      case 'group': {
        return descend();
      }
      case 'sketch': {
        // Sketches aren't real for union.
        return geometry;
      }
      default:
        throw Error(`Unexpected geometry: ${JSON.stringify(geometry)}`);
    }
  };

  return rewrite(toConcreteGeometry(geometry), op);
};

const union = cache(unionImpl);

const write = async (geometry, path) => {
  const disjointGeometry = toDisjointGeometry(geometry);
  // Ensure that the geometry carries a hash before saving.
  hash(disjointGeometry);
  const preparedGeometry = prepareForSerialization(disjointGeometry);
  await write$1(path, preparedGeometry);
  return preparedGeometry;
};

const rotateX = (angle, geometry) =>
  transform$4(fromXRotation((angle * Math.PI) / 180), geometry);
const rotateY = (angle, geometry) =>
  transform$4(fromYRotation((angle * Math.PI) / 180), geometry);
const rotateZ = (angle, geometry) =>
  transform$4(fromZRotation((angle * Math.PI) / 180), geometry);
const translate = (vector, geometry) =>
  transform$4(fromTranslation(vector), geometry);
const scale = (vector, geometry) =>
  transform$4(fromScaling(vector), geometry);

export { allTags, alphaShape, assemble, bend, canonicalize, canonicalize$4 as canonicalizePath, canonicalize$3 as canonicalizePaths, close as closePath, computeCentroid, computeNormal, concatenate as concatenatePath, convexHull as convexHullToGraph, deduplicate as deduplicatePath, difference, disjoint, doesNotOverlap, drop, eachItem, eachPoint, eachSegment, empty, extrude, extrudeToPlane, faces, fill, flip, flip$3 as flipPath, fresh, fromFunction as fromFunctionToGraph, fromPaths as fromPathsToGraph, fromPoints as fromPointsToGraph, fromPolygons as fromPolygonsToGraph, fromPolygonsWithHolesToTriangles, fromSurfaceToPaths, fromTriangles as fromTrianglesToGraph, getAnyNonVoidSurfaces, getAnySurfaces, getFaceablePaths, getGraphs, getInverseMatrices, getItems, getLayouts, getLeafs, getNonVoidFaceablePaths, getNonVoidGraphs, getNonVoidItems, getNonVoidPaths, getNonVoidPlans, getNonVoidPoints, getNonVoidSegments, getEdges as getPathEdges, getPaths, getPeg, getPlans, getPoints, getTags, grow, hasNotType, hasNotTypeVoid, hasNotTypeWire, hasType, hasTypeVoid, hasTypeWire, hash, inset, intersection, isClockwise as isClockwisePath, isClosed as isClosedPath, isCounterClockwise as isCounterClockwisePath, isNotType, isNotTypeVoid, isNotTypeWire, isNotVoid, isType, isTypeVoid, isTypeWire, isVoid, keep, loft, measureBoundingBox, minkowskiDifference, minkowskiShell, minkowskiSum, offset, open as openPath, outline, prepareForSerialization, projectToPlane, push, read, realize, realizeGraph, registerReifier, reify, remesh, rerealizeGraph, reverseFaceOrientations as reverseFaceOrientationsOfGraph, rewrite, rewriteTags, rotateX, rotateY, rotateZ, rotateZ$1 as rotateZPath, scale, scale$2 as scalePath, scale$1 as scalePaths, section, separate, smooth, soup, taggedDisplayGeometry, taggedGraph, taggedGroup, taggedItem, taggedLayout, taggedPaths, taggedPlan, taggedPoints, taggedPolygons, taggedSegments, taggedSketch, taggedTriangles, taper, test, toConcreteGeometry, toDisjointGeometry, toDisplayGeometry, toKeptGeometry, toPoints, toPolygonsWithHoles, toTransformedGeometry, toTriangles$1 as toTrianglesFromGraph, toVisiblyDisjointGeometry, transform$4 as transform, transform$2 as transformPaths, translate, translate$2 as translatePath, translate$1 as translatePaths, twist, typeVoid, typeWire, union, update, visit, withQuery, write };