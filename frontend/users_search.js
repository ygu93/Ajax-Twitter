const FollowToggle = require("./follow_toggle.js");

class UserSearch {
  constructor($el) {
    this.$el = $el;
    this.input = null;
    this.list = $(".users");
    this.handleInput();
  }

  handleInput(){
    this.$el.on("input", (event) => {
      this.input = $("#query").val();
      let that = this;
      $.ajax({
        type:'get',
        dataType: 'json',
        url: '/users/search',
        data: {query: that.input},
        success(data) {
          that.renderResults(data);
        },
      });
    });
  }

  renderResults(users){
    this.list.empty();
    users.forEach( (user) => {
      const $user = $('<li/>');
      const $a = $('<a/>');
      $a.text(user.username);
      $a.attr('href', `/users/${user.id}`);
      $user.append($a);
      const $toggle = $('<button/>');
      new FollowToggle($toggle, {userId: user.id, followState: user.followed});
      $user.append($toggle);
      this.list.append($user);
    });
  }
}

module.exports = UserSearch;
