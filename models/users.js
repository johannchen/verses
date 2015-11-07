Meteor.methods({
  setGoal(goal, reward) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        "profile.goal": goal,
        "profile.rewardPartner": reward
      }
    });
  }
})
