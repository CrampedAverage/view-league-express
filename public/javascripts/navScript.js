const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-bar");
  const close = document.querySelector(".close");
  burger.addEventListener("click", () => {
    console.log(1);
    setTimeout(() => {
      close.classList.toggle("close-active");
    }, 500);
    nav.classList.toggle("nav-active");
    burger.classList.toggle("burger-inactive");
  });

  close.addEventListener("click", () => {
    setTimeout(() => {
      burger.classList.toggle("burger-inactive");
    }, 500);
    close.classList.toggle("close-active");
    nav.classList.toggle("nav-active");
  });
};

navSlide();
