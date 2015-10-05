Meteor.publish('verses', function () {
  return Verses.find({owner: this.userId});
});
