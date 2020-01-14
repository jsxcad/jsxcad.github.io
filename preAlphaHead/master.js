/* global location, window */

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const bootstrap = async (sha) => {
      document.jsxcadVersion = sha;
      const installUi = await import(`https://gitcdn.link/cdn/jsxcad/JSxCAD/${sha}/es6/jsxcad-ui-v1.js`);
      const hash = location.hash.substring(1);
      const [project, source] = hash.split('@');
      await installUi({
        document,
        project,
        source
      });
    };

    window.fetch('https://api.github.com/repos/jsxcad/JSxCAD/commits?per_page=1')
          .then(response => response.json())
          .then(json => bootstrap(json[0].sha));
  }
};
