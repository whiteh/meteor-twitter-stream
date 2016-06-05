import { Meteor } from 'meteor/meteor';
export const nlp = function(){
    var nlp  = Meteor.npmRequire('nlp_compromise');
    return {
      tag: function(text){
        console.log(text);
      }
    }
}()
