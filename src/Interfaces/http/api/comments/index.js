const routes = require('./routes');
const CommentsHandler = require('./handler');

module.exports = {
  name: 'comments',
  register: async (server, { container }) => {
    const threadsHandler = new CommentsHandler(container);
    server.route(routes(threadsHandler));
  },
};
