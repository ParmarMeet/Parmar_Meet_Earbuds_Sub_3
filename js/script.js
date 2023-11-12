(() =>{
// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");
canvas.width = 1280;
canvas.height = 720;
const frameCount = 150;
const images = [];

const buds = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  // console.log(i);
  const img = new Image();
  
  img.src = `img/meet_video${(i + 1).toString().padStart(3, "0")}.jpg`;
  images.push(img);
}

// console.log(images);

//we are not animating a DOM element, but rather an object
gsap.to(buds, {
  frame: 149,
  snap: "frame",
  scrollTrigger: {
    trigger: "#explode-view",
    pin: true,
    scrub: 1,
    markers: false,
    start: "top top",
  },
  onUpdate: render,
});

images[0].addEventListener("onload", render);

function render() {
  // console.log(buds.frame);
  // console.log(images[buds.frame]);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[buds.frame], 0, 0);
}
  
})();
