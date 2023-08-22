const NormalizeComment = require('../../Domains/comments/entities/NormalizeComment');
const NormalizeReply = require('../../Domains/replies/entities/NormalizeReply');

class GetDetailThreadUseCase {
  constructor({
    threadRepository, commentRepository, replyRepository
  }) {
    this._threadrepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(useCasePayload) {
    await this._threadrepository.verifyThreadIsExist(useCasePayload.threadId);
    const thread = await this._threadrepository.getThreadById(useCasePayload.threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(useCasePayload.threadId);

    return {
      ...thread,
      comments: (await Promise.all(comments.map(async (comment) => {
        const replies = await this._replyRepository.getRepliesByCommentId(comment.id);

        return {
          ...(NormalizeComment.normalize(comment)),
          replies: replies.map((reply) => NormalizeReply.normalize(reply)),
        };
      }))),
    };
  }
}

module.exports = GetDetailThreadUseCase;
