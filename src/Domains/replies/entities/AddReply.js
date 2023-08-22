class AddReply {
  constructor(payload) {
    this._verifyPayload(payload);

    const { content, owner, commentId } = payload;

    this.content = content;
    this.owner = owner;
    this.commentId = commentId;
  }

  // eslint-disable-next-line class-methods-use-this
  _verifyPayload({ content, owner, commentId }) {
    if (!owner) {
      throw new Error('ADD_REPLY.NOT_LOGIN');
    }

    if (!content || !commentId) {
      throw new Error('ADD_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof content !== 'string' || typeof owner !== 'string' || typeof commentId !== 'string') {
      throw new Error('ADD_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddReply;
