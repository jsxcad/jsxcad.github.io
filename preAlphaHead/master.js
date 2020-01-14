import { installUi } from 'https://gitcdn.link/cdn/jsxcad/JSxCAD/4b8af057238e95781e3d9796624a3f466a1dd01e/es6/jsxcad-ui-v1.js';

/* global location */

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const bootstrap = async () => {
      const hash = location.hash.substring(1);
      const [project, source] = hash.split('@');
      await installUi({
        document,
        project,
        source
      });
    };

    bootstrap();
  }
};
