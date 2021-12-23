let bars = document.querySelector(".btn-bars");
let navSlider = document.querySelector(".nav-slider");

bars.addEventListener("click", function () {
  navSlider.classList.toggle("nav-slider-active");
});
