Meteor.methods({
  setGoal(goal, reward) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.goal": goal,
        "profile.reward": reward
      }
    });
  },
  // TODO: remove after set myself to admin
  setAdmin() {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.admin": true
      }
    });
  }
})
