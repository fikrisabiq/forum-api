const routes = (handler) => ([
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getDetailThreadUseCase,
  },
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
]);

module.exports = routes;
