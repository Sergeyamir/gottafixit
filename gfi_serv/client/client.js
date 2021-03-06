Meteor.subscribe('fixes');

Template.registerHelper(
    'humanizeDatetime', function(datetime){
        return datetime.replace('T',' ').replace('Z',' ');
    });

Template.list_of_fixes.helpers({
   fixes:  function(){
       return Fixes.find();
   },
    voted: function(voteVal){
        var previousVote = getPreviousVote(this);
        if (previousVote && previousVote.voteVal == voteVal){
            return "voted"
        }
    },
    voteCount: function(voteVal){return countVotesByVal(this, voteVal)}
});

Template.list_of_fixes.events({
        'click #vote_aye': function (evt) {
            if (Meteor.user()) {
                Meteor.call('toggleVote', this, 1)
            } else {
                alert('Please sign up or log in.')
            }

        },
        'click #vote_nay': function (evt) {
            if (Meteor.user()) {
                Meteor.call('toggleVote', this, -1)
            } else {
                alert('Please sign up or log in.')
            }
        },
        'click #delete_fix': function(){
            Fixes.remove(this._id);
        }
    }
);

Template.extension_install.events({
    'click #extension_install': function (evt){
        console.log('Attempting inline extension install.');
        chrome.webstore.install(
            "https://chrome.google.com/webstore/detail/apmhajgnggibnojcfieokijpnhflifnd",
            function(){
                alert('Extension successfully installed. Click its icon to enable features, ' +
                'and try it out on any website. Your fixes will appear at http://gottafix.it.');
            },
            function(){
                alert('Extension did not install. Please go to the Google Chrome App Store and manually install gottafixit.');
            }
        );
    }
});

Template.extension_install.helpers({
    extension_installed: function () {
        return chrome.app.isInstalled;
    }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});