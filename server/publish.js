Meteor.publish('verses', function (partnerId) {
  if (this.userId) {
    //let partner = Meteor.users.findOne(this.userId).profile.partner;
    if (partnerId) {
      return Verses.find({$or: [{owner: this.userId}, {owner: partnerId}]});
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
