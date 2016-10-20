class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = this.$el.data("user-id") || options.userId;
    this.followState = (this.$el.data("initial-follow-state") ||
      options.followState) ? "followed" : "unfollowed";

    this.render();
    this.handleClick();
  }

  render(){
    if(this.followState === "followed"){
      this.$el.html('Unfollow!');
      this.$el.prop("disabled", false);
    } else if(this.followState === "unfollowed") {
      this.$el.html('Follow!');
      this.$el.prop("disabled", false);
    } else{
      this.$el.prop("disabled", true);
    }
  }

  handleClick(){
    this.$el.on("click", (event) => {
      this.followState = (this.followState === "followed") ? "unfollowing" : "following";
      this.render();
      let that = this;
      event.preventDefault();
        $.ajax({
          dataType: 'json',
          type: (this.followState === "unfollowing") ? 'DELETE' : 'POST',
          url: `/users/${this.userId}/follow`,
          success(data) {
            that.toggle();
            that.render();
          },
        });
    });
  }

  toggle() {
    this.followState = (this.followState === "unfollowing") ? "unfollowed" : "followed";
  }

}

module.exports = FollowToggle;
