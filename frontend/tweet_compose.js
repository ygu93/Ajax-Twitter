class TweetComposer {
  constructor($el) {
    this.$el = $el;
    this.submit();
  }

  submit() {
    this.$el.on("submit", (event) => {
      event.preventDefault();
      let that = this;
      $.ajax({
        method: "POST",
        url: "/tweets",
        dataType: "json",
        data: that.$el.serialize(),
        success(data) {
          that.handleSuccess(data);
        }
      });
    });
  }

  handleSuccess(data) {
    this.clearInput();
    this.enableInput();
    let $allTweets = $("#feed");
    let $tweet = $("<li>").text(data.content);
    $allTweets.prepend($tweet);
  }

  disableInput() {
    let $inputs = $(".tweet-compose :input");
    $inputs.slice(1).each( (index, input) => {
        let $input = $(input);
        $input.prop("disabled", true);
    });
  }

  enableInput() {
    let $inputs = $(".tweet-compose :input");
    $inputs.slice(1).each( (index, input) => {
        let $input = $(input);
        $input.prop("disabled", false);
    });
  }

  clearInput() {
    let $inputs = $(".tweet-compose :input");
    $inputs.slice(1).each( (index, input) => {
        let $input = $(input);
        $input.empty();
    });
  }

}


module.exports = TweetComposer;
