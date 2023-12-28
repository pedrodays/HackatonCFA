define(function () {
  const internals = {};
  const externals = {
    game: {},
  };

  internals.createGame = function () {
    /* HTML */
    //game view
    return `
          <audio
            id="missSound"
            src="./resources/missSound.mp3"
            preload="auto"
          ></audio>
          <video loop id="myVideo">
            <source
              src="./resources/Madonna - 2012 Super Bowl Halftime Show (1).mp4"
              type="video/mp4"
            />
          </video>
          <div class="vl-1"></div>
          <div class="vl-2"></div>
          <div class="content">
      
            <div class="guitar-hero-div">
            <div id="score">
                <h2>Score: 0 </h2>
            </div>
            <div id="streak">
                <h2>Streak: 0 </h2>
            </div>
              <table class="guitar-hero-table">
                <tr>
                  <th
                    style="position: relative; left: 120px; bottom: 350px"
                    id="column1"
                  ></th>
                  <th
                    style="position: relative; left: 120px; bottom: 350px"
                    id="column2"
                  ></th>
                  <th
                    style="position: relative; left: 120px; bottom: 350px"
                    id="column3"
                  ></th>
                </tr>
              </table>
              <div class="user-input-buttons">
                <button id="btn-A" class="button-A neon-button neon-button__1">
                  A
                </button>
                <button id="btn-S" class="button-S neon-button neon-button__2">
                  S
                </button>
                <button id="btn-D" class="button-D neon-button neon-button__3">
                  D
                </button>
              </div>
            </div>
      
            <div class="pause-and-play-button">
              <div id="playPause"class="container__icon-wrapper">
                <i id="playIcon" class="container__icon fa fa-play"></i>
              </div>
            </div>
          </div>
      `;
  };

  internals.createView = function () {
    externals.game = $(internals.createGame());
    const firstCss = `<link id="css1" rel="stylesheet" type="text/css" href="css/styles1.css" />`;
    $("head").append(firstCss);
    $("body").append(externals.game);
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
