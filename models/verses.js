Verses = new Mongo.Collection("verses");

Meteor.methods({
  addVerse(title, topic, content) {
    // Make sure the user is logged in before inserting a verse
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Verses.insert({title, topic, content, pointCount: 0, owner: Meteor.userId(), createdAt: Date.now()});
  },
  removeVerse(id) {
    if (Verses.findOne(id).owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    Verses.remove(id);
  },
  updatePoint(id) {
    if (Verses.findOne(id).owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    let now = Date.now();
    Verses.update(id, {
      $set: {lastPointAt: now},
      $inc: {pointCount: 1},
      $push: {points: {pointAt: now}}
    });
  },
  updateVerse(id, title, topic, content) {
    if (Verses.findOne(id).owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
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
