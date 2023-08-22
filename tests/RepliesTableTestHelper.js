/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const RepliesTableTestHelper = {
  async addReply({
    id = 'reply-123', content = 'abc', owner = 'user-123', commentId = 'comment-123', date = 'tanggalpalsutanggalpalsu',
  }) {
    const query = {
      text: 'INSERT INTO replies VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, content, owner, commentId, false, date],
    };

    await pool.query(query);
  },

  async findReplyByCommentId(id) {
    const query = {
      text: 'SELECT replies.* FROM replies INNER JOIN comments ON replies.comment_id = comments.id WHERE comments.id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findReplyById(id) {
    const query = {
      text: 'SELECT * FROM replies WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteCommentById(id) {
    const query = {
      text: 'UPDATE replies SET is_delete = true WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM replies WHERE 1=1');
  },
};

module.exports = RepliesTableTestHelper;
