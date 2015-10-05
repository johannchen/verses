Verses = new Mongo.Collection("verses");

Verses.allow({
  remove: function(userId, doc) {
    return userId === doc.owner;
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.owner === userId;
  },
  fetch: ['owner']
})
Meteor.methods({
  addVerse(title, topic, content) {
    // Make sure the user is logged in before inserting a verse
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Verses.insert({title, topic, content, starCount: 0, owner: Meteor.userId(), createdAt: Date.now()});
  },
  removeVerse(id) {
    Verses.remove(id);
  },
  updateStar(id) {
    let now = Date.now();
    Verses.update(id, {
      $set: {lastStarAt: now},
      $inc: {starCount: 1},
      $push: {stars: {starAt: now}}
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
