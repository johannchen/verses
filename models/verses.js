Verses = new Mongo.Collection("verses");

Meteor.methods({
  updateStar(id) {
    Verses.update(id, {
      $inc: {starCount: 1},
      $push: {stars: {starAt: Date.now()}}
    });
  }
});
