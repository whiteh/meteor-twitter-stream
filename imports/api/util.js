import { Tweets } from '../api/tweets.js';
export const util = (function() {
  var tweets    = null;
  var getTweets = function() {
    if (!!tweets) {
      return tweets;
    }
    if (Meteor.userId()) {
      console.log(Tweets.findOne({}))
      tweets = Tweets.find({ rel_users: Meteor.userId() }, {sort :{created_at: 1}, limit:100});
      return tweets;
    } else {
      return [{
        text: "None"
      }]
    }
  }

  var getWords = function() {
    var words = {},
        text;
    if (!tweets) {
      this.getTweets();
    }
    tweets.forEach(function(t){
      if (!t.terms || t.terms.length === 0) {
        return;
      }
      t.terms.forEach(function(term){
        text = term.text;
        text = text.toLowerCase();
        text = text.replace(/^\W*/, "");
        text = text.replace(/\W*$/, "");
        if (term.tag === "noun") {
          if (!words.hasOwnProperty(text)) {
            words[text] = 0;
          }
          words[text] += 1;
        }
      })
    });

    var sortable = [];
    for (var text in words)
          sortable.push([text, words[text]])
    sortable.sort(function(a, b) {return b[1] - a[1]})
    sortable = sortable.slice(0, 20);

    words = [];
    for (var a=0; a<sortable.length; a+=1) {
      words.push({
        word  : sortable[a][0],
        count : 10*sortable[a][1]});
    }

    return words;
  }

  return {
    getTweets  : getTweets,
    getWords   : getWords
  }
})();