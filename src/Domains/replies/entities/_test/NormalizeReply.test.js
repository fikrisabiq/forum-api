/* eslint-disable camelcase */
const NormalizeReply = require('../NormalizeReply');

describe('a NormalizeReply entities', () => {
  it('should return "**balasan telah dihapus**" in content field', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
      date: 'tanggalpalsutanggalpalsu',
      content: 'konten',
      is_delete: true,
    };

    // Action
    const result = NormalizeReply.normalize(payload);

    // Assert
    expect(result.content).toEqual('**balasan telah dihapus**');
  });

  it('should return the content payload in content field', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      username: 'dicoding',
      date: 'tanggalpalsutanggalpalsu',
      content: 'konten',
      is_delete: false,
    };

    // Action
    const result = NormalizeReply.normalize(payload);

    // Assert
    expect(result.content).toEqual(payload.content);
  });
});
