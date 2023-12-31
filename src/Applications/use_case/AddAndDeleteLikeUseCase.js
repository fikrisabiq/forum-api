class AddAndDeleteLikeUseCase {
  constructor({ threadRepository, commentRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._likeRepository = likeRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadIsExist(useCasePayload.threadId);
    await this._commentRepository.verifyCommentIsExist(useCasePayload.commentId);
    const likeExist = await this._likeRepository
      .verifyLikeIsExist(useCasePayload.commentId, useCasePayload.owner);
    if (likeExist) {
      await this._likeRepository.deleteLike(useCasePayload.commentId, useCasePayload.owner);
    } else {
      await this._likeRepository.addLike(useCasePayload.commentId, useCasePayload.owner);
    }
  }
}

module.exports = AddAndDeleteLikeUseCase;
