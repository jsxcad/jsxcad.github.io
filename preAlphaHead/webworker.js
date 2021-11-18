const sha = self.location.hash.substring(1);

// We need to start receiving messages immediately, but we're not ready to process them yet.
// Put them in a buffer.
self.messageBootQueue = [];
onmessage = ({ data }) => self.messageBootQueue.push(data);

import(`https://gitcdn.link/cdn/jsxcad/JSxCAD/${sha}/es6/jsxcad-ui-v1-webworker.js`);
