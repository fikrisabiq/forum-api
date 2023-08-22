/* eslint-disable class-methods-use-this */
const NormalizeReply = {
  normalize(reply) {
    const deafultReply = {
      id: reply.id,
      username: reply.username,
      date: reply.date,
      content: reply.content,
    };

    if (reply.is_delete) {
      return {
        ...deafultReply,
        content: '**balasan telah dihapus**',
      };
    }
    return deafultReply;
  },
};

module.exports = NormalizeReply;
