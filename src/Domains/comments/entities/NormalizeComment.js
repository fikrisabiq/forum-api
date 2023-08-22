/* eslint-disable class-methods-use-this */
const NormalizeComment = {
  normalize(comment) {
    const defaultComment = {
      id: comment.id,
      username: comment.username,
      date: comment.date,
      content: comment.content,
    };
    if (comment.is_delete) {
      return {
        ...defaultComment,
        content: '**komentar telah dihapus**',
      };
    }
    return defaultComment;
  },
};

module.exports = NormalizeComment;
