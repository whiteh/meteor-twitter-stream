import '../imports/ui/body.js';

var tweets;

function getTweets() {
  if (Meteor.userId()) {
      console.log(Tweets.findOne({}))
      tweets = Tweets.find({ rel_users: Meteor.userId() }, {sort :{created_at: 1}, limit:100});

      tweets.forEach(function(t){
        console.log(t);
      })

      return tweets;
    } else {
      return [{
        text: "None"
      }]
    }
}