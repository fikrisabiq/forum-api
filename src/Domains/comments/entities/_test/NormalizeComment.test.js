/* eslint-disable camelcase */
const NormalizeComment = require('../NormalizeComment');

describe('a NormalizeComment entities', () => {
  it('should return "**komentar telah dihapus**" in content field', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: 'tanggalpalsutanggalpalsu',
      content: 'konten',
      is_delete: true,
    };

    // Action
    const result = NormalizeComment.normalize(payload);

    // Assert
    expect(result.content).toEqual('**komentar telah dihapus**');
  });

  it('should return the content payload in content field', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      username: 'dicoding',
      date: 'tanggalpalsutanggalpalsu',
      content: 'konten',
      is_delete: false,
    };

    // Action
    const result = NormalizeComment.normalize(payload);

    // Assert
    expect(result.content).toEqual(payload.content);
  });
});
