class AddComment {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, owner, threadId } = payload;

    this.content = content;
    this.owner = owner;
    this.threadId = threadId;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ content, owner, threadId }) {
    if (!owner) {
      throw new Error('ADD_COMMENT.NOT_LOGIN');
    }

    if (!content || !threadId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof owner !== 'string' || typeof threadId !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
