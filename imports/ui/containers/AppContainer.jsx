import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import App from '../layouts/AppLayout.jsx';

export default createContainer(() => {
  return {
    currentUser: 'jchen'
  };
}, App);
