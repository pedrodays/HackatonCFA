var video = document.getElementById("myVideo");
var playIcon = document.getElementById("playIcon");
var pauseIcon = document.getElementById("pauseIcon");
const externals = {
  //asd
  pause: false,
};

function myFunction() {
  console.log(video);
  if (video.paused) {
    externals.pause = true; //asd
    video.play();
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline-block";
  } else {
    externals.pause = false; //asdf
    video.pause();
    playIcon.style.display = "inline-block";
    pauseIcon.style.display = "none";
  }
}

// Ensure only one icon is initially visible
playIcon.style.display = "inline-block";
pauseIcon.style.display = "none";
