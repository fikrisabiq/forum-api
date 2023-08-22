const AddAndDeleteLikeUseCase = require('../../../../Applications/use_case/AddAndDeleteLikeUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;

    this.putLikeHandler = this.putLikeHandler.bind(this);
  }

  async putLikeHandler(request, h) {
    const { threadId, commentId } = request.params;
    const addAndDeleteLikeUseCase = this._container.getInstance(AddAndDeleteLikeUseCase.name);

    await addAndDeleteLikeUseCase.execute({
      threadId,
      commentId,
      owner: request.auth.credentials.id,
    });

    const response = h.response({ status: 'success' });
    response.code(200);
    return response;
  }
}

module.exports = LikesHandler;
