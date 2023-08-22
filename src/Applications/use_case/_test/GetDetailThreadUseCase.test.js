const Threadrepository = require('../../../Domains/threads/ThreadRepository');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ReplyRepository = require('../../../Domains/replies/ReplyRepository');
const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');

describe('GetDetailThreadUseCase', () => {
  it('should orchestaring the get detail thread action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';

    const expectedThread = {
      id: threadId,
      title: 'judul',
      body: 'badan',
      username: 'user-123',
      date: 'tanggalpalsutanggalpalsu',
    };

    const expectedComment = [{
      id: 'comment-123',
      content: 'content',
      username: 'user-123',
      is_delete: false,
      date: 'tanggalpalsutanggalpalsu',
    },
    ];

    const expectedReply = [{
      id: 'reply-123',
      content: 'reply',
      username: 'user-123',
      is_delete: false,
      date: 'tanggalpalsutanggalpalsu',
    },
    ];

    const expectedDetailThread = {
      id: threadId,
      title: 'judul',
      body: 'badan',
      username: 'user-123',
      date: 'tanggalpalsutanggalpalsu',
      comments: [
        {
          id: 'comment-123',
          username: 'user-123',
          content: 'content',
          date: 'tanggalpalsutanggalpalsu',
          replies: [{
            id: 'reply-123',
            content: 'reply',
            username: 'user-123',
            date: 'tanggalpalsutanggalpalsu',
          }],
        },
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new Threadrepository();
    const mockCommentRepository = new CommentRepository();
    const mockReplyRepository = new ReplyRepository();

    /** mocking needed function */
    mockThreadRepository.verifyThreadIsExist = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.getThreadById = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));
    mockCommentRepository.getCommentsByThreadId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComment));
    mockReplyRepository.getRepliesByCommentId = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedReply));

    /** creating use case instance */
    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailThread = await getDetailThreadUseCase.execute({ threadId });

    // Assert
    expect(detailThread).toStrictEqual(expectedDetailThread);
    expect(mockThreadRepository.verifyThreadIsExist).toBeCalledWith(threadId);
    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(threadId);
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledTimes(1);
  });
});
