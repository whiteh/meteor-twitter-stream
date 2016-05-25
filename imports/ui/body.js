import { Template } from 'meteor/templating';

import { Tweets } from '../api/tweets.js';

import './body.html';
import './body.css';
Template.body.helpers({
  tweets() {
    if (Meteor.userId()) {
      return Tweets.find({ rel_users: Meteor.userId() }, {created_at: -1});
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