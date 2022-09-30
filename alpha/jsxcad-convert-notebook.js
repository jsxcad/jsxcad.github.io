import { read } from './jsxcad-sys.js';

/*
 * base64-arraybuffer 1.0.2 <https://github.com/niklasvh/base64-arraybuffer>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
// Use a lookup table to find the index.
var lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}
var encode = function (arraybuffer) {
    var bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }
    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    }
    else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }
    return base64;
};

const encodeNotebook = async (notebook, { root, workspace, module } = {}) => {
  const encoded = [];
  const seen = new Set();
  for (const note of notebook) {
    if (module && note.sourceLocation && note.sourceLocation.path !== module) {
      // Skip notes for other modules.
      continue;
    }
    if (seen.has(note.hash)) {
      // Deduplicate the notes.
      continue;
    }
    seen.add(note.hash);
    if (note.view) {
      // Make sure we have the view data loaded.
      const { path, data } = note;
      if (path && !data) {
        note.data = await read(path, { workspace });
      }
    }
    if (note.download) {
      const encodedEntries = [];
      for (const entry of note.download.entries) {
        let data = await entry.data;
        if (entry.path && !data) {
          data = await read(entry.path, { workspace });
        }
        if (data) {
          const encodedEntry = {
            ...entry,
            base64Data: encode(data.buffer),
          };
          delete encodedEntry.data;
          encodedEntries.push(encodedEntry);
        }
      }
      encoded.push({ download: { entries: encodedEntries } });
    } else {
      encoded.push(note);
    }
  }
  return encoded;
};

const toHtmlFromNotebook = async (
  notebook,
  {
    view,
    title = 'JSxCAD Viewer',
    modulePath = 'https://jsxcad.js.org/alpha',
    module,
    useControls = false,
    useMermaid = false,
    useEvaluator = false,
  } = {}
) => {
  const encodedNotebook = await encodeNotebook(notebook, { module });
  const html = `
<html>
 <head>
  <title>${title}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <style>
    div.book {
      height: 100%;
      overflow: scroll;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
    }

    div.note.card {
      border: 1px dashed crimson;
      margin: 4px 4px;
      padding: 4px 4px;
      display: inline-block;
      width: fit-content;
      height: fit-content;
    }

    .note.log {
      font-family: "Arial Black", Gadget, sans-serif;
      color: red
    }

    .note.view {
      border: 1px dashed dodgerblue;
      margin: 4px 4px;
      padding: 4px 4px;
    }

    .note.orbitView {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
    }

    button.note.download {
      border: 2px solid black;
      border-radius: 5px;
      background-color: white;
      margin: 4px 4px;
      padding: 10px 24px;
      font-size: 16px;
      cursor: pointer;
      border-color: #2196F3;
      color: dodgerblue
    }

    button.note.download:hover {
      background: #2196F3;
      color: white;
    }

    .note th,td {
      border: 1px solid dodgerblue;
      padding: 5px;
    }
  </style>
  ${
    useMermaid
      ? '<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>'
      : ''
  }
 </head>
 <body>
  <script type='module'>
    import { Shape } from '${modulePath}/jsxcad-api-shape.js';
    import { dataUrl } from '${modulePath}/jsxcad-ui-threejs.js';
    import { toDomElement } from '${modulePath}/jsxcad-ui-notebook.js';

    const notebook = ${JSON.stringify(encodedNotebook, null, 2)};

    const prepareViews = async (notebook) => {
      // Prepare the view urls in the browser.
      for (const note of notebook) {
        if (note.view && !note.url) {
          note.url = await dataUrl(Shape.fromGeometry(note.data), note.view);
        }
      }
      return notebook;
    }

    const run = async () => {
      const body = document.getElementsByTagName('body')[0];
      const bookElement = document.createElement('div');
      const notebookElement = await toDomElement(await prepareViews(notebook), { useControls: ${
        useControls ? 'true' : 'false'
      } });
      bookElement.appendChild(notebookElement);
      body.appendChild(bookElement);
      bookElement.classList.add('book', 'notebook', 'loaded');
    };

    if (document.readyState === 'complete') {
      run();
      ${useMermaid ? 'mermaid.init();' : ''}
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          run();
        }
      };
    }
  </script>
 </body>
</html>
`;
  return { html: new TextEncoder('utf8').encode(html), encodedNotebook };
};

const toHtmlFromScript = async ({
  view,
  title = 'JSxCAD Viewer',
  modulePath = 'https://jsxcad.js.org/alpha',
  baseUrl = 'https://jsxcad.js.org',
  module,
  files = {},
  useControls = false,
  useMermaid = false,
  useEvaluator = false,
} = {}) => {
  const encodedFiles = encodeURIComponent(JSON.stringify(files));
  const html = `
<html>
 <head>
  <title>${title}</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
  <style>
    div.book {
      height: 100%;
      overflow: scroll;
      margin-left: 20px;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      justify-content: flex-start;
    }

    div.note.card {
      border: 1px dashed crimson;
      margin: 4px 4px;
      padding: 4px 4px;
      display: inline-block;
      width: fit-content;
      height: fit-content;
    }

    .note.log {
      font-family: "Arial Black", Gadget, sans-serif;
      color: red
    }

    .note.view {
      border: 1px dashed dodgerblue;
      margin: 4px 4px;
      padding: 4px 4px;
    }

    .note.orbitView {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
    }

    button.note.download {
      border: 2px solid black;
      border-radius: 5px;
      background-color: white;
      margin: 4px 4px;
      padding: 10px 24px;
      font-size: 16px;
      cursor: pointer;
      border-color: #2196F3;
      color: dodgerblue
    }

    button.note.download:hover {
      background: #2196F3;
      color: white;
    }

    .note th,td {
      border: 1px solid dodgerblue;
      padding: 5px;
    }
  </style>
  ${
    useMermaid
      ? '<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>'
      : ''
  }
 </head>
 <body>
  <script type='module'>
    import api from '${modulePath}/jsxcad-api.js';
    import { Shape } from '${modulePath}/jsxcad-api-shape.js';
    import { dataUrl } from '${modulePath}/jsxcad-ui-threejs.js';
    import { addOnEmitHandler, boot, read, removeOnEmitHandler, resolvePending, setupWorkspace, write } from '${modulePath}/jsxcad-sys.js';
    import { getNotebookControlData, toDomElement } from '${modulePath}/jsxcad-ui-notebook.js';

    const baseUrl = "${baseUrl}";
    const module = "${module}";
    const workspace = 'JSxCAD';

    const run = async ({ isRerun = false } = {}) => {
      const topLevel = new Map();
      const seenHashes = new Set();
      const notebooks = new Map();
      const addNotes = async (notes) => {
        for (const note of notes) {
          if (seenHashes.has(note.hash)) {
            continue;
          }
          seenHashes.add(note.hash);
          const { path, data, hash, line } = note;
          if (!notebooks.has(line)) {
            notebooks.set(line, []);
          }
          notebooks.get(line).push(note);
          if (note.md) {
            note.md = note
              .md
              .replace(/#https:\\/\\/raw.githubusercontent.com\\/jsxcad\\/JSxCAD\\/master\\/(.*?).nb/g, (_, modulePath) => baseUrl + '/' + modulePath + '.html');
          }
          if (path && !data) {
             note.data = read(path);
          }
          if (note.view && !note.url) {
            const schedulePreviewGeneration = async () => {
              note.url = await dataUrl(Shape.fromGeometry(await note.data), note.view);
            }
            schedulePreviewGeneration();
          }
        }
      }

      const readyNotebook = async (notebook) => {
        for (const note of notebook) {
          note.data = await note.data;
          note.url = await note.url;
        }
      };

      const onEmitHandler = addOnEmitHandler(addNotes);

      if (isRerun) {
        const notebookControlData = await getNotebookControlData();
        await write('control/' + module, notebookControlData, {
          workspace,
        });
      }

      await api.importModule(module, {
        clearUpdateEmits: true,
        topLevel,
        readCache: false,
        workspace,
      });

      await resolvePending();

      removeOnEmitHandler(onEmitHandler);

      const body = document.getElementsByTagName('body')[0];
      {
        const oldBookElement = document.getElementById('bookElement')
        if (oldBookElement) {
          oldBookElement.remove();
        }
      }
      const bookElement = document.createElement('div');
      bookElement.id = 'bookElement';
      for (const line of [...notebooks.keys()].sort((a, b) => a - b)) {
        const notebook = notebooks.get(line);
        await readyNotebook(notebook);
        const notebookElement = await toDomElement(notebook, { useControls: ${
          useControls ? 'true' : 'false'
        } });
        bookElement.appendChild(notebookElement);
        body.appendChild(bookElement);
        bookElement.classList.add('book', 'notebook', 'loaded');
      }
    };

    const onKeyDown = (e) => {
      const CONTROL = 17;
      const E = 69;
      const ENTER = 13;
      const S = 83;
      const SHIFT = 16;

      const key = e.which || e.keyCode || 0;

      switch (key) {
        case CONTROL:
        case SHIFT:
          return true;
      }

      const { ctrlKey, shiftKey } = e;
      switch (key) {
        case ENTER: {
          if (shiftKey) {
            e.preventDefault();
            e.stopPropagation();
            run({ isRerun: true });
            return false;
          }
          break;
        }
      }
    };

    const start = async () => {
      setupWorkspace(workspace);
      await boot();

      // Construct a local ephemeral filesystem.
      const files = JSON.parse(decodeURIComponent("${encodedFiles}"));
      for (const path of Object.keys(files)) {
        await write(path, files[path], { ephemeral: true });
      }

      await run();
      window.addEventListener('keydown', onKeyDown);
    }

    if (document.readyState === 'complete') {
      start();
      ${useMermaid ? 'mermaid.init();' : ''}
    } else {
      document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
          start();
        }
      };
    }
  </script>
 </body>
</html>
`;
  return { html: new TextEncoder('utf8').encode(html) };
};

export { toHtmlFromNotebook, toHtmlFromScript };
