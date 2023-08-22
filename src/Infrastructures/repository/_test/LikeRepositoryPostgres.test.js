const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const LikesTableTestHelper = require('../../../../tests/LikesTableTestHelper');

describe('LikeRepositoryPostgres', () => {
  const userId = 'user-123';
  const commentId = 'comment-123';

  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadsTableTestHelper.addThread({});
    await CommentsTableTestHelper.addComment({});
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await CommentsTableTestHelper.cleanTable();
    await LikesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addLike function', () => {
    it('should persist comment and return comment correctly', async () => {
      // Arrange
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await likeRepositoryPostgres.addLike(commentId, userId);

      // Assert
      const likes = await LikesTableTestHelper
        .findLikeByCommentIdAndOwner(commentId, userId);
      expect(likes).toHaveLength(1);
    });
  });

  describe('verifyLikeIsExist function', () => {
    it('should return true if like exist', async () => {
      // Arrange
      await LikesTableTestHelper.addLike({});
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

      // Action
      const likeExist = await likeRepositoryPostgres.verifyLikeIsExist(commentId, userId);

      // Assert
      expect(likeExist).toBeDefined();
      expect(likeExist).toStrictEqual(true);
    });

    it('should return false if like does not exist', async () => {
      // Arrange
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

      // Action
      const likeExist = await likeRepositoryPostgres.verifyLikeIsExist(commentId, userId);

      // Assert
      expect(likeExist).toBeDefined();
      expect(likeExist).toStrictEqual(false);
    });
  });

  describe('deleteLike function', () => {
    it('should delete like', async () => {
      // Arrange
      await LikesTableTestHelper.addLike({});
      const fakeIdGenerator = () => '123'; // stub!
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, fakeIdGenerator);

      // Action
      await likeRepositoryPostgres.deleteLike(commentId, userId);

      // Assert
      const likes = await LikesTableTestHelper.findLikeByCommentIdAndOwner(commentId, userId);
      expect(likes).toHaveLength(0);
    });
  });

  describe('getLikeCount function', () => {
    it('should get like count', async () => {
      // Arrange
      await LikesTableTestHelper.addLike({});
      const likeRepositoryPostgres = new LikeRepositoryPostgres(pool, {});

      // Action
      const likeCount = await likeRepositoryPostgres.getLikeCount(commentId);

      // Assert
      expect(likeCount).toBeDefined();
      expect(likeCount).toEqual(1);
    });
  });
});
