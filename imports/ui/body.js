import { Template } from 'meteor/templating';

import { Tweets } from '../api/tweets.js';

import './body.html';
import './body.css';

Template.body.helpers({
  tweets() {
    console.log(Tweets.findOne());
    return Tweets.find({});
  },
});