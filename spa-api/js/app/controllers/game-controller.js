define(["views/game-view", "router"], function (gameView, router) {
  const externals = {
    pause: false,
  };
  const internals = {
    spritesCounter: 0,
    time: 1000,
    cssIndex: 1,
    score: 0,
    streak: 0,
  };

  externals.start = function () {
    externals.pause = false;
    gameView.render();
    internals.createButtons();
    internals.createPlayButton();
  };

  internals.createButtons = function () {
    $(document).keydown(function (event) {
      switch (event.which) {
        case 65: // Key A
          $("#btn-A").trigger("click").addClass("active");
          break;
        case 83: // Key S
          $("#btn-S").trigger("click").addClass("active");
          break;
        case 68: // Key D
          $("#btn-D").trigger("click").addClass("active");
          break;
      }
    });
    $("#btn-A").on("click", function (event) {
      internals.checkBox(1);
    });

    $("#btn-S").on("click", function (event) {
      internals.checkBox(2);
    });

    $("#btn-D").on("click", function (event) {
      internals.checkBox(3);
    });

    $(document).keyup(function (event) {
      switch (event.which) {
        case 65: // Key A
          $("#btn-A").removeClass("active");
          break;
        case 97: // Key A
          $("#btn-A").removeClass("active");
          break;
        case 83: // Key S
          $("#btn-S").removeClass("active");
          break;
        case 68: // Key D
          $("#btn-D").removeClass("active");
          break;
      }
    });
  };

  internals.checkBox = function (num) {
    const pos = parseInt($(`#column${num} .sprite`).css("top")) + 50;

    console.log(pos);

    if (pos >= 700 && pos <= 750) {
      console.log("entrou no if");
      $(`#column${num} .sprite:first-child`).remove();
      internals.streak++;
      internals.score += internals.comboMultiplier();
      $("#score").empty();
      $("#score").append(`<h2>Score: ${internals.score}</h2>`);
      $("#streak").empty();
      $("#streak").append(`<h2>Streak: ${internals.streak}</h2>`);
      console.log("SCORE " + internals.score);
      console.log("STREAK " + internals.streak);
    } else {
      internals.streak = 0;
    

      console.log("STREAK " + internals.streak);
    }
  };

  internals.comboMultiplier = function () {
    const k = 0.1; 
    if (internals.streak === 1) {
      return 1;
    }
    return parseInt((1 - Math.exp(-k * internals.streak)) * 10);
  };

  internals.setStreak = function (num) {
    internals.streak = num;
  };

  externals.render = function () {
    internals.createButtons();
  };

  internals.createPlayButton = function () {
    $(".container__icon-wrapper").on("click", function () {
      var video = document.getElementById("myVideo");

      if (video.paused) {
        $("i").remove();
        $("#playPause").append(
          `<i id="pauseIcon" class="container__icon fa fa-pause"></i>`
        );
        video.play();
        externals.pause = false;
        startGame();
      } else {
        externals.pause = true;
        $("i").remove();
        $("#playPause").append(
          `<i id="playIcon" class="container__icon fa fa-play"></i>`
        );
        video.pause();
      }
    });
  };

  externals.inject = function (num) {
    $(`#css${num}`).remove();
    const element2 = ` <link id="css2" type="text/css" rel="stylesheet" href="css/styles${
      num + 1
    }.css" />`;
    $("head").append(element2);
  };

  function createNote(columnId) {
    const note = document.createElement("div");
    note.className = "sprite";

    // Generate a random number between 1 and 3 to determine the mask
    const randomMask = Math.floor(Math.random() * 3) + 1;
    note.classList.add(`mask${randomMask}`);

    note.style.top = "100";
    note.style.position = "fixed";

    $(`#column${columnId}`).append(note);

    let position = 100;
    internals.spritesCounter++;
    const animationId = setInterval(function () {
      position += 1;
      note.style.top = position + "px";
      if (parseInt(note.style.top) > window.innerHeight * 0.8) {
        clearInterval(animationId);
        note.remove();
      }
    }, 0);
  }

  function startGame() {
    function spawnRandomNote() {
      if (!externals.pause) {
            const randomColumn = Math.floor(Math.random() * 3) + 1;
            createNote(randomColumn);

            // Adjust the parameters for the sinusoidal function
            const amplitude = 200; // Amplitude of the sinusoidal function
            const period = 5000; // Period of the sinusoidal function (adjust as needed)

            // Use getRandomInterval as the base interval
            const baseInterval = getRandomInterval(500, 500);

            // Calculate the next interval based on a combination of getRandomInterval and a sinusoidal function
            const nextInterval = baseInterval + amplitude * Math.sin((2 * Math.PI * Date.now()) / period);

            setTimeout(spawnRandomNote, nextInterval);
        }
    }
    function getRandomInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateCSS() {
      if (!externals.pause) {
        externals.inject(internals.cssIndex);
        internals.cssIndex++;
        if (internals.cssIndex === 5) {
          internals.cssIndex = 0;
        }
        setTimeout(generateCSS, 5000);
      }
    }

    function checkBottom() {
      if (!externals.pause) {
        $(".sprite").each(function (index, element) {
          if (parseInt(element.style.top) + 50 > window.innerHeight * 0.8) {
            internals.setStreak(0);
            $("#streak").empty();
            $("#streak").append(`<h2>Streak: ${internals.streak}</h2>`);
          }
        });
        setTimeout(checkBottom, 100);
      }
    }
    checkBottom();
    generateCSS(internals.cssIndex);
    spawnRandomNote();
  }

  internals.arrayOfNotes = Array.from({ length: 20 }, () => ({
    m: Math.floor(Math.random() * 101),
    pos: Math.floor(Math.random() * 3),
  }));

  return externals;
});
