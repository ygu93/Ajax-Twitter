const FollowToggle = require("./follow_toggle.js");
const UserSearch = require("./users_search.js");
const TweetComposer = require("./tweet_compose.js");


$( function () {
  $(".follow-toggle").each((index, el) => new FollowToggle($(el)));
});

$( function () {
  $(".users-search").each((index, el) => new UserSearch($(el)));
});

$( function () {
  $(".tweet-compose").each((index, el) => new TweetComposer($(el)));
});
