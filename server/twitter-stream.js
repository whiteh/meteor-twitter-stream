import { Tweets } from '../imports/api/tweets.js';
var nlp, Twit, conf;
if (Meteor.isServer) {
  Meteor.methods({
    tagTweet: function(data) {
      var text = data.text,
          val = "",
          delim = "";

      data.terms = [];

      nlp.text(text).terms().forEach(function(token){
        //console.log(token);
          var obj = {text: token.text, norm: token.normal};
          obj.tag = token.tag ? token.tag.toLowerCase() : null;
          data.terms.push(obj);
      });
      return data
    },

    handleTweet: function(data) {
      nlp.text(data.text)
         .sentences
         .forEach(function(sentence){
            console.log(sentence.tags());
         });
      console.log(data.text);
    },
    getAccessToken: function() {
      try {
        return Meteor.user().services.twitter;
      } catch(e) {
        return null;
      }
    },
    getTimeline: function() {
      var access_token, access_token_secret;
      if (!Meteor.user()) {
        return;
      }
      access_token = Meteor.user().services.twitter.accessToken;
      access_token_secret = Meteor.user().services.twitter.accessTokenSecret;

      var addTweet = Meteor.bindEnvironment(function(data){
        var item = Tweets.findOne({ id: data.id });
        if (typeof item === "undefined") {
          data.rel_users = [Meteor.userId()];
          data = Meteor.call("tagTweet", data);
          Tweets.insert(data);
          return;
        }
        Tweets.update(
          {_id: item._id},
          { $addToSet: { rel_users: [Meteor.user().id ] } }
        );

      });

      var T = new Twit({
        consumer_key: conf.consumer.key,
        consumer_secret: conf.consumer.secret,
        access_token: access_token,
        access_token_secret: access_token_secret
      });
      test = T.get('statuses/home_timeline', { screen_name: "whitehankey"  })
        .catch(function (err) {
          console.log('caught error', err.stack)
        })
        .then(function (result) {
          console.log(result.data.length + " tweets received");
          result.data.forEach(function(data){
            addTweet(data);
          })
        });
    }
  });


  Meteor.startup(function () {
    conf = JSON.parse(Assets.getText("twitter.json"));
    Twit = Meteor.npmRequire('twit');
    nlp  = Meteor.npmRequire('nlp_compromise');

    ServiceConfiguration.configurations.remove({
      service: "twitter"
    });
    ServiceConfiguration.configurations.insert({
      service: "twitter",
      consumerKey: "TETpdGc8UUDTl6bzLpXhAtGVv",
      loginStyle: "popup",
      secret: "CkDDaaKielMfVokauIoO392p6etJydDJWa4k9ccgy6u54yBzeI"
    });

/*
    var stream =  T.stream("statuses/filter",
              {
                "lang" : "en-gb",
                "track": "facup"
              });
    stream.on("tweet", Meteor.bindEnvironment(function(data){
      Meteor.call("handleTweet", data);
    }));*/
  });
}
