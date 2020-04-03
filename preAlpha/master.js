/* global location, window */

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const bootstrap = async (sha) => {
      const module = await import('./es6/jsxcad-ui-v1.js');
      const hash = location.hash.substring(1);
      const [project, source] = hash.split('@');
      await module.installUi({
        document,
        project,
        sha,
        source
      });
    };

    bootstrap();
  }
};
