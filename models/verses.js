Verses = new Mongo.Collection("verses");

Meteor.methods({
  addVerse(title, topic, content) {
    Verses.insert({title, topic, content, starCount: 0});
  },
  removeVerse(id) {
    Verses.remove(id);
  },
  updateStar(id) {
    Verses.update(id, {
      $inc: {starCount: 1},
      $push: {stars: {starAt: Date.now()}}
    });
  },
  updateVerse(id, title, topic, content) {
    Verses.update(id, {
      $set: {title, topic, content}
    });
  }
});
