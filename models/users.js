Meteor.methods({
  setGoal(goal) {
    Meteor.users.update(Meteor.userId(), {
      $set: {profile: {goal: goal}}
    });
  }
})
