Verses = new Mongo.Collection("verses");

Meteor.methods({
  addVerse(title, topic, content) {
    Verses.insert({title, topic, content, starCount: 0, createdAt: Date.now()});
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
