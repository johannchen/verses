import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import Home from '../components/Home.jsx';

export default createContainer(() => {
  return {
    currentUser: 'jchen'
  };
}, Home);
