define(function () {
  const internals = {};
  const externals = {
    menu: {},
  };

  internals.createGame = function () {
    /* HTML */
    //game view
    return `    <div class="overlay"></div>
    <div class="content">
      <div class="container">
        <a id="goToGame" class="button">
          <div class="plate"></div>
          <div class="plate"></div>
          <div class="plate"></div>
          <div class="plate"></div>
          <div class="plate"></div>
          <div class="button__wrapper">
            <span class="button__text">Play Game</span>
          </div>
          <div class="button__box">
            <div class="inner inner__top"></div>
            <div class="inner inner__front"></div>
            <div class="inner inner__bottom"></div>
            <div class="inner inner__back"></div>
            <div class="inner inner__left"></div>
            <div class="inner inner__right"></div>
          </div>
        </a>
      </div>
    </div>`;
  };

  internals.createView = function () {
    externals.menu = $(internals.createGame());
    $("#menu").append(externals.menu);
  };

  externals.render = function () {
    internals.createView();
  };

  externals.clean = function () {
    if (externals.tag.menu) {
      externals.tag.menu.empty();
      externals.tag.button.empty();
    }
  };
  return externals;
});
