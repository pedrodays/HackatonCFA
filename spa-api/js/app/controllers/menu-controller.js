define(["views/menu-view", "router"], function (menuView, router) {
  const externals = {};
  const internals = {};

  externals.start = function () {
    menuView.render();
    internals.createButton();
  };

  //PLAY BUTTON
  internals.createButton = function () {
    $("#goToGame").on("click", function () {
      $("#menu").empty();
      $(`#css6`).remove();
      window.location.hash = "#game";
    });
  };

  return externals;
});
