FlowRouter.route('/', {
  name: 'home',
  subscriptions: function(params) {
    this.register('randomVerse', Meteor.subscribe('randomVerse'));
  },
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

FlowRouter.route('/edit/:_id', {
  name: 'edit',
  subscriptions: function(params) {
    this.register('verse', Meteor.subscribe('verse', params._id));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <VerseEdit verseId={params._id} />;
      }
    });
  }
});

FlowRouter.route('/point/:_id', {
  name: 'point',
  subscriptions: function(params) {
    this.register('verse', Meteor.subscribe('verse', params._id));
  },
  action: function(params) {
    ReactLayout.render(MainLayout, {
      content() {
        return <Point verseId={params._id} />;
      }
    });
  }
});

FlowRouter.route('/feedback', {
  name: 'feedback',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Feedback />;
      }
    });
  }
});

FlowRouter.route('/admin', {
  name: 'admin',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      content() {
        return <Admin />;
      }
    });
  }
});
