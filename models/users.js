Meteor.methods({
  setGoal(goal, reward) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.goal": goal,
        "profile.reward": reward
      }
    });
  }
  /*
  setAdmin() {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.admin": true
      }
    });
  }
  */
})
