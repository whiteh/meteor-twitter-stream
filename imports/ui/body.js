import { Template } from 'meteor/templating';

import { Tweets } from '../api/tweets.js';

import './body.html';
import './body.css';
Template.body.helpers({
  tweets() {
    if (Meteor.userId()) {
<<<<<<< Updated upstream
      return Tweets.find({ rel_users: Meteor.userId() }, {created_at: -1});
=======
      console.log(Tweets.findOne({}))
      return Tweets.find({ rel_users: Meteor.userId() }, {sort :{created_at: 1}});
>>>>>>> Stashed changes
    } else {
      return [{
        text: "None"
      }]
    }
  },
});

Tracker.autorun(function(){
  if(Meteor.userId()){
    Meteor.call("getTimeline");
  }
});