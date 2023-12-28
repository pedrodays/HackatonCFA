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
        <a id="goToGame" class="btn">
        Start
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
