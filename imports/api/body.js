import { Template } from 'meteor/templating';

import { Tweets } from '../api/tweets.js';

import './body.html';

Template.body.helpers({
  tweets() {
    return Tweets.find({});
  },
});