/* global location, window */

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    const bootstrap = async (sha) => {
      const booting = document.createElement('center');
      booting.innerText = sha;
      document.getElementById('loading').appendChild(booting);
      const module = await import(`https://gitcdn.link/cdn/jsxcad/JSxCAD/${sha}/es6/jsxcad-ui-app.js`);
      const hash = location.hash.substring(1);
      const [project, source] = hash.split('@');
      await module.installUi({
        document,
        project,
        source,
        sha
      });
      document.body.removeChild(document.getElementById('loading'));
    };

    window.fetch('https://api.github.com/repos/jsxcad/JSxCAD/commits?per_page=1')
          .then(response => response.json())
          .then(json => bootstrap(json[0].sha));
  }
};
