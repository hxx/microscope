Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function (userId, doc, filedNames) {
    return ownsDocument(userId, doc) && filedNames.length === 1 && filedNames[0] === 'read';
  }
});

createCommentNotification = function () {
  var post = Posts.findOne(comment.postId);
  if (comment.userId !== post.userId) {
    Notifications.insert({
      userId: post.userId,
      postId: post._id,
      commentId: comment.id,
      commenterName: comment.author,
      read: false
    });
  }
};
