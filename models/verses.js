Verses = new Mongo.Collection("verses");

Verses.allow({
  remove: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function (userId, doc, fields, modifier) {
    return doc.owner === userId;
  },
  fetch: ['owner']
});


Meteor.methods({
  addVerse(title, topic, content) {
    // Make sure the user is logged in before inserting a verse
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Verses.insert({title, topic, content, pointCount: 0, owner: Meteor.userId(), createdAt: Date.now()});
  },
  removeVerse(id) {
    Verses.remove(id);
  },
  updatePoint(id) {
    let now = Date.now();
    Verses.update(id, {
      $set: {lastPointAt: now},
      $inc: {pointCount: 1},
      $push: {points: {pointAt: now}}
    });
  },
  updateVerse(id, title, topic, content) {
    Verses.update(id, {
      $set: {title, topic, content}
    });
  },
  addComment(id, comment) {
    Verses.update(id, {
      $push: {
        comments: {
          id: Random.id(),
          comment,
          username: Meteor.user().username,
          createdAt: Date.now()
        }
      }
    });
  },
  removeComment(id, commentId) {
    Verses.update(id, {
      $pull: {
        comments: {id: commentId}
      }
    });
  }
});
