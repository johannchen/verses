FlowRouter.route('/', {
  name: 'home',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Home />;
      }
    });
  }
});

FlowRouter.route('/verse/:_id', {
  name: 'verse',
  subscriptions: function(params) {
    this.register('verse', Meteor.subscribe('verse', params._id));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <VersePage verseId={params._id} />;
      }
    });
  }
});

FlowRouter.route('/star/:_id', {
  name: 'star',
  subscriptions: function(params) {
    this.register('verse', Meteor.subscribe('verse', params._id));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <Star verseId={params._id} />;
      }
    });
  }
});
