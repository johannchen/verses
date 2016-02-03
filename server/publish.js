Meteor.publish('verses', function () {
  if (this.userId) {
    let partner = Meteor.users.findOne(this.userId).profile.partner;
    if (partner) {
      return Verses.find({$or: [{owner: this.userId}, {owner: partner.id}]});
    } else {
      return Verses.find({owner: this.userId});
    }
  }
});

Meteor.publish('verse', function (id) {
  return Verses.find({_id: id});
});

Meteor.publish('partner', function() {
  if (this.userId) {
    let partner = Meteor.users.findOne(this.userId).profile.partner;
    if (partner) {
      return Meteor.users.find({_id: partner.id}, {fields: {_id:1, username:1, profile:1}});
    }
  }
});

Meteor.publish('people', function() {
  return Meteor.users.find({}, {fields: {_id:1, username:1, emails:1, createdAt:1}});
});

// random verse
function randomVerseId() {
  // get the total verses count of the collection
 var versesCount = Verses.find().count();
 // get a random number (N) between [0 , itemsCount - 1]
 var random = Math.floor(Random.fraction() * versesCount);
 // choose a random item by skipping N items
 var verse = Verses.findOne({},{
   skip: random
 });
 return verse && verse._id;
}

Meteor.publish('randomVerse', function() {
  return Verses.find({_id: randomVerseId()});
});
