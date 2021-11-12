import './jsxcad-api-v1-gcode.js';
import './jsxcad-api-v1-pdf.js';
import './jsxcad-api-v1-tools.js';
import * as mathApi from './jsxcad-api-v1-math.js';
import { addOnEmitHandler, addPending, write, read, emit, flushEmitGroup, hash, beginEmitGroup, resolvePending, finishEmitGroup, saveEmitGroup, restoreEmitGroup, isWebWorker, getSourceLocation, getControlValue } from './jsxcad-sys.js';
import * as shapeApi from './jsxcad-api-shape.js';
import { saveGeometry, loadGeometry } from './jsxcad-api-shape.js';
import { toEcmascript } from './jsxcad-compiler.js';
import { readStl, stl } from './jsxcad-api-v1-stl.js';
import { readObj } from './jsxcad-api-v1-obj.js';
import { readOff } from './jsxcad-api-v1-off.js';
import { readSvg } from './jsxcad-api-v1-svg.js';
import { toSvg } from './jsxcad-convert-svg.js';

let recordedNotes;

let recording = false;
let handler;

const recordNotes = (notes) => {
  if (recording) {
    recordedNotes.push(...notes);
  }
};

const beginRecordingNotes = (path, id) => {
  recordedNotes = [];
  if (handler === undefined) {
    handler = addOnEmitHandler(recordNotes);
  }
  recording = true;
};

const clearRecordedNotes = () => {
  recordedNotes = undefined;
  recording = false;
};

const saveRecordedNotes = (path, id) => {
  let notesToSave = recordedNotes;
  recordedNotes = undefined;
  recording = false;
  addPending(write(`data/note/${path}/${id}`, notesToSave));
};

const replayRecordedNotes = async (path, id) => {
  const notes = await read(`data/note/${path}/${id}`);

  if (notes === undefined) {
    return;
  }
  if (notes.length === 0) {
    return;
  }
  for (const note of notes) {
    emit(note);
  }
  flushEmitGroup();
};

const emitSourceLocation = ({ path, id }) => {
  const setContext = { sourceLocation: { path, id } };
  emit({ hash: hash(setContext), setContext });
};

const emitSourceText = (sourceText) =>
  emit({ hash: hash(sourceText), sourceText });

const $run = async (op, { path, id, text, sha }) => {
  const meta = await read(`meta/def/${path}/${id}`);
  if (!meta || meta.sha !== sha) {
    beginRecordingNotes();
    beginEmitGroup({ path, id });
    emitSourceText(text);
    const result = await op();
    await resolvePending();
    finishEmitGroup({ path, id });
    if (typeof result === 'object') {
      const type = result.constructor.name;
      switch (type) {
        case 'Shape':
          await saveGeometry(`data/def/${path}/${id}`, result);
          await write(`meta/def/${path}/${id}`, { sha, type });
          await saveRecordedNotes(path, id);
          return result;
      }
    }
    clearRecordedNotes();
    return result;
  } else if (meta.type === 'Shape') {
    await replayRecordedNotes(path, id);
    return loadGeometry(`data/def/${path}/${id}`);
  } else {
    throw Error('Unexpected cached result');
  }
};

var notesApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  beginRecordingNotes: beginRecordingNotes,
  clearRecordedNotes: clearRecordedNotes,
  saveRecordedNotes: saveRecordedNotes,
  replayRecordedNotes: replayRecordedNotes,
  emitSourceLocation: emitSourceLocation,
  emitSourceText: emitSourceText,
  $run: $run
});

let locked = false;
const pending = [];

const acquire = async () => {
  if (locked) {
    console.log(`QQ/acquire/wait`);
    return new Promise((resolve, reject) => pending.push(resolve));
  } else {
    console.log(`QQ/acquire`);
    locked = true;
  }
};

const release = async () => {
  if (pending.length > 0) {
    console.log(`QQ/release/schedule`);
    const resolve = pending.pop();
    resolve(true);
  } else {
    locked = false;
    console.log(`QQ/release`);
  }
};

let api$1;

const setApi = (value) => {
  api$1 = value;
};

const getApi = () => api$1;

const evaluate = async (ecmascript, { api, path }) => {
  const where = isWebWorker ? 'worker' : 'browser';
  let emitGroup;
  try {
    await acquire();
    emitGroup = saveEmitGroup();
    console.log(`QQ/evaluate ${where}: ${ecmascript.replace(/\n/g, '\n|   ')}`);
    const builder = new Function(
      `{ ${Object.keys(api).join(', ')} }`,
      `return async () => { ${ecmascript} };`
    );
    const op = await builder(api);
    const result = await op();
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (emitGroup) {
      restoreEmitGroup(emitGroup);
    }
    await release();
  }
};

const execute = async (
  script,
  {
    evaluate,
    replay,
    path,
    topLevel = new Map(),
    parallelUpdateLimit = Infinity,
    clearUpdateEmits = false,
  }
) => {
  const where = isWebWorker ? 'worker' : 'browser';
  try {
    let replaysDone = false;
    let importsDone = false;
    console.log(`QQ/Evaluate`);
    const scheduled = new Set();
    const completed = new Set();
    for (;;) {
      console.log(`QQ/Compile`);
      const updates = {};
      const replays = {};
      const exports = [];
      await toEcmascript(script, {
        path,
        topLevel,
        updates,
        replays,
        exports,
      });
      // Make sure modules are prepared.
      if (!importsDone) {
        console.log(`QQ/Imports ${where}`);
        const { importModule } = getApi();
        // The imports we'll need to run these updates.
        const imports = new Set();
        for (const id of Object.keys(updates)) {
          const update = updates[id];
          if (update.imports) {
            for (const entry of update.imports) {
              imports.add(entry);
            }
          }
        }
        // We could run these in parallel, but let's keep it simple for now.
        for (const path of imports) {
          console.log(`QQ/Imports ${where}: ${path}`);
          await importModule(path, { evaluate, replay, doRelease: false });
        }
        // At this point the modules should build with a simple replay.
      }
      // Replay anything we can.
      if (!replaysDone) {
        console.log(`QQ/Replay ${where}`);
        replaysDone = true;
        for (const id of Object.keys(replays)) {
          await replay(replays[id].program, { path });
          completed.add(id);
        }
      }
      // Update what we can.
      console.log(`QQ/Update ${where}`);
      const unprocessedUpdates = new Set(Object.keys(updates));
      while (unprocessedUpdates.size > 0) {
        const updatePromises = [];
        // Determine the updates we can process.
        for (const id of unprocessedUpdates) {
          if (scheduled.has(id)) {
            continue;
          }
          const entry = updates[id];
          const outstandingDependencies = entry.dependencies.filter(
            (dependency) =>
              !completed.has(dependency) &&
              updates[dependency] &&
              dependency !== id
          );
          if (
            updatePromises.length <= 1 &&
            outstandingDependencies.length === 0
          ) {
            // if (isWebWorker) {
            //   throw Error('Updates should not happen in worker');
            // }
            // For now, only do one thing at a time, and block the remaining updates.
            const task = async () => {
              try {
                await evaluate(updates[id].program, { path });
                completed.add(id);
                console.log(`Completed ${id}`);
              } catch (error) {
                throw error;
              }
            };
            updatePromises.push(task());
            unprocessedUpdates.delete(id);
            scheduled.add(id);
          }
        }
        // FIX: We could instead use Promise.race() and then see what new updates could be queued.
        while (updatePromises.length > 0) {
          await updatePromises.pop();
        }
      }
      // Finally compute the exports.
      console.log(`QQ/Exports ${where}`);
      for (const entry of exports) {
        return await evaluate(entry, { path });
      }
      return;
    }
  } catch (error) {
    throw error;
  }
};

const DYNAMIC_MODULES = new Map();

const registerDynamicModule = (bare, path) =>
  DYNAMIC_MODULES.set(bare, path);

const CACHED_MODULES = new Map();

const buildImportModule =
  (baseApi) =>
  async (
    name,
    {
      clearUpdateEmits = false,
      topLevel = new Map(),
      evaluate: evaluate$1,
      replay,
      doRelease = true,
    } = {}
  ) => {
    let emitGroup;
    try {
      if (doRelease) {
        emitGroup = saveEmitGroup();
        await release();
      }
      if (CACHED_MODULES.has(name)) {
        // It's ok for a module to evaluate to undefined so we need to check has explicitly.
        return CACHED_MODULES.get(name);
      }
      const internalModule = DYNAMIC_MODULES.get(name);
      if (internalModule !== undefined) {
        const module = await import(internalModule);
        CACHED_MODULES.set(name, module);
        return module;
      }
      let script;
      if (script === undefined) {
        const path = `source/${name}`;
        const sources = [];
        sources.push(name);
        script = await read(path, { sources });
      }
      if (script === undefined) {
        throw Error(`Cannot import module ${name}`);
      }
      const scriptText =
        typeof script === 'string'
          ? script
          : new TextDecoder('utf8').decode(script);
      const path = name;
      const api = { ...baseApi, sha: 'master' };
      if (!evaluate$1) {
        evaluate$1 = (script) => evaluate(script, { api, path });
      }
      if (!replay) {
        replay = (script) => evaluate(script, { api, path });
      }
      const builtModule = await execute(scriptText, {
        evaluate: evaluate$1,
        replay,
        path,
        topLevel,
        parallelUpdateLimit: 1,
        clearUpdateEmits,
      });
      CACHED_MODULES.set(name, builtModule);
      return builtModule;
    } catch (error) {
      throw error;
    } finally {
      if (doRelease) {
        await acquire();
        restoreEmitGroup(emitGroup);
      }
    }
  };

/*
  Options
  slider: { min, max, step }
  select: { options }
*/

const control = (label, value, type, options) => {
  const { path } = getSourceLocation();
  const control = {
    type,
    label,
    value: getControlValue(path, label, value),
    options,
    path,
  };
  emit({ control, hash: hash(control) });
  return value;
};

const api = {
  ...mathApi,
  ...shapeApi,
  ...notesApi,
  control,
  readSvg,
  readStl,
  readObj,
  readOff,
  stl,
  toSvg,
};

const importModule = buildImportModule(api);

api.importModule = importModule;

// Register Dynamic libraries.

const module = (name) => `@jsxcad/api-v1-${name}`;

registerDynamicModule(module('armature'), './jsxcad-api-v1-armature.js');
registerDynamicModule(module('cursor'), './jsxcad-api-v1-cursor.js');
registerDynamicModule(module('deform'), './jsxcad-api-v1-deform.js');
registerDynamicModule(module('dst'), './jsxcad-api-v1-dst.js');
registerDynamicModule(module('dxf'), './jsxcad-api-v1-dxf.js');
registerDynamicModule(module('font'), './jsxcad-api-v1-font.js');
registerDynamicModule(module('gcode'), './jsxcad-api-v1-gcode.js');
registerDynamicModule(module('ldraw'), './jsxcad-api-v1-ldraw.js');
registerDynamicModule(module('math'), './jsxcad-api-v1-math.js');
registerDynamicModule(module('pdf'), './jsxcad-api-v1-pdf.js');
registerDynamicModule(module('png'), './jsxcad-api-v1-png.js');
registerDynamicModule(module('shape'), './jsxcad-api-v1-shape.js');
registerDynamicModule(module('shapefile'), './jsxcad-api-v1-shapefile.js');
registerDynamicModule(module('stl'), './jsxcad-api-v1-stl.js');
registerDynamicModule(module('svg'), './jsxcad-api-v1-svg.js');
registerDynamicModule(module('threejs'), './jsxcad-api-v1-threejs.js');
registerDynamicModule(module('units'), './jsxcad-api-v1-units.js');

setApi(api);

export { api as default, evaluate, execute };