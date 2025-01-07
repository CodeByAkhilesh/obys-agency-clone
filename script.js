let tl = gsap.timeline();

tl.from(".loder-main-text h1", {
  y: "150%",
  stagger: 0.3,
  onStart: function () {
    let printGrow = document.querySelector(".grow");
    let grow = 0;
    setInterval(function () {
      if (grow < 100) {
        printGrow.innerHTML = grow++;
      } else {
        printGrow.innerHTML = grow;
      }
    }, 28);
  },
});

tl.to(".loder-main-text", {
  opacity: 0,
  duration: 0.1,
  delay: 2,
  onStart: function () {
    setTimeout(() => {
      tl.to(".loder", {
        opacity: 0,
        height: "0vh",
        duration: 1.2,
      });
    }, 1100);
  },
});
