const AddReply = require('../../Domains/replies/entities/AddReply');

class AddReplyUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this.replyRepository = replyRepository;
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    await this._threadRepository.verifyThreadIsExist(useCasePayload.threadId);
    const addsReply = new AddReply(useCasePayload);
    await this._commentRepository.verifyCommentIsExist(addsReply.commentId);
    return this.replyRepository.addReply(addsReply);
  }
}

module.exports = AddReplyUseCase;
