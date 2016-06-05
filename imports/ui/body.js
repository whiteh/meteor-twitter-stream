import { Template } from 'meteor/templating';
import { util } from   '../api/util.js';

import './body.html';
import './body.css';


Template.body.inital = true;
Template.body.helpers({
  tweets() {
    tweets = util.getTweets();
    console.log(util.getWords());
    return tweets;
  },
  words() {
    var words = util.getWords();
    return words;
  }
});

Tracker.autorun(function(){
  if(Meteor.userId()){
    Meteor.call("getTimeline");
  }
});