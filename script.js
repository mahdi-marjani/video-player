let container_video = document.querySelector("div.container-video");
let video = container_video.querySelector("video");
let controls = container_video.querySelector("div.controls");
let progress = controls.querySelector("div.progress-bar > input[type='range']");
let div_play_pause = controls.querySelector("div.play-pause");
let btn_play = controls.querySelector("svg.play");
let btn_pause = controls.querySelector("svg.pause");
let btn_backward = controls.querySelector("svg.backward");
let btn_forward = controls.querySelector("svg.forward");
let time_now = controls.querySelector("span.time-now");
let time_total = controls.querySelector("span.time-total");
let barPercent;
let btn_volume = controls.querySelector("svg.btn-volume");
let volum_progress_container = controls.querySelector(
  "div.volum-progress-container"
);
let volum_progress = controls.querySelector(
  "div.volum-progress-container > input[type='range']"
);
let btn_fullscreen = controls.querySelector("svg.fullscreen");
// document.getElementById("sedf").addEventListener("input")
video.volume = 0.5;
volum_progress.style.background = `linear-gradient(to right, #ed8219 50%, #e0e0dd 0%)`;
volum_progress.value = 50;
div_play_pause.addEventListener("click", function () {
  time_total_video(video);
  btn_play.classList.toggle("active");
  btn_pause.classList.toggle("active");
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});
video.addEventListener("ended", function () {
  btn_pause.classList.remove("active");
  btn_play.classList.add("active");
});
btn_backward.addEventListener("click", function () {
  video.currentTime -= 5;
});
btn_forward.addEventListener("click", function () {
  video.currentTime += 5;
});
video.addEventListener("timeupdate", function () {
  let minute = Math.floor(this.currentTime / 60);
  let second = Math.floor(this.currentTime) - minute * 60;
  let minute_value;
  let second_value;
  if (minute < 10) {
    minute_value = "0" + minute;
  } else {
    minute_value = minute;
  }
  if (second < 10) {
    second_value = "0" + second;
  } else {
    second_value = second;
  }
  time_now.textContent = minute_value + ":" + second_value;
});
function time_total_video(video) {
  let minute = Math.floor(video.duration / 60);
  let second = Math.floor(video.duration) - minute * 60;
  let minute_value;
  let second_value;
  if (minute < 10) {
    minute_value = "0" + minute;
  } else {
    minute_value = minute;
  }
  if (second < 10) {
    second_value = "0" + second;
  } else {
    second_value = second;
  }
  time_total.textContent = minute_value + ":" + second_value;
}
video.addEventListener("timeupdate", function () {
  barPercent = (this.currentTime / this.duration) * 100;
  progress.value = barPercent;
  progress.style.background = `linear-gradient(to right, red ${barPercent}%, #e0e0dd 0%)`;
});
progress.addEventListener("input", function () {
  video.currentTime = (this.value / 100) * video.duration;
  barPercent = this.value;
  this.style.background = `linear-gradient(to right, red ${this.value}%, #e0e0dd 0%)`;
});
btn_volume.addEventListener("click", function () {
  volum_progress_container.classList.toggle("active");
});
volum_progress.addEventListener("input", function () {
  this.style.background = `linear-gradient(to right, #ed8219 ${this.value}%, #e0e0dd 0%)`;
  video.volume = this.value / 100;
});

btn_fullscreen.addEventListener("click", function () {
  console.log(document.fullscreenElement);
  if (!document.fullscreenElement) {
    if (container_video.requestFullscreen) {
      container_video.requestFullscreen();
    } else if (container_video.mozFullScreenElement) {
      container_video.mozFullScreenElement();
    } else if (container_video.msFullscreenElement) {
      container_video.msFullscreenElement();
    } else if (container_video.webkitFullscreenElement) {
      container_video.webkitFullscreenElement();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullscreen) {
      document.mozCancelFullscreen();
    } else if (document.msCancelFullscreen) {
      document.msCancelFullscreen();
    } else if (document.webkitCancelFullscreen) {
      document.webkitCancelFullscreen();
    }
  }
});
