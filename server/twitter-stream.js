if (Meteor.isServer) {

  Meteor.methods({
    handleTweet: function(data) {
      console.log(data.text);
    }
  });


  Meteor.startup(function () {
    var conf = JSON.parse(Assets.getText("twitter.json"));
    var Twit = Meteor.npmRequire('twit');
    var T = new Twit({
        consumer_key: conf.consumer.key,
        consumer_secret: conf.consumer.secret,
        access_token: conf.access_token.key,
        access_token_secret: conf.access_token.secret
    });
    var stream =  T.stream("statuses/sample",
              {
                "lang" : "en-gb"
              });
    stream.on("tweet", Meteor.bindEnvironment(function(data){
      Meteor.call("handleTweet", data);
    }));
  });
}
