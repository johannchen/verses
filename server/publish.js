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

Meteor.publish('partner', function() {
  if (this.userId) {
    let partner = Meteor.users.findOne(this.userId).profile.partner;
    return Meteor.users.find({_id: partner.id}, {fields: {_id:1, username:1, profile:1}});
  }
});
