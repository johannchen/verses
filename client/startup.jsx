// set password token
Session.setDefault('resetPassword', null);

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

//TODO component subscribe
Meteor.subscribe("verses");

Meteor.startup(function () {
  // Required by Material UI http://material-ui.com/#/get-started
  injectTapEventPlugin();
});
