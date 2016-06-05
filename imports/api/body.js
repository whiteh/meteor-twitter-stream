import { Template } from 'meteor/templating';

import { Tweets } from '../api/tweets.js';
import '../api/util.js';
import { util } './body.html';

Template.body.helpers({
  tweets() {
    return Tweets.find({});
  },
});