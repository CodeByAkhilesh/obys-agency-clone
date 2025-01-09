function loddingAnimation(){
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
      tl.to(".loder",{
        height: "0vh",
        duration: 0.5,
      });
    }, 1100);
  },
  
});
}

function cursorAnimation(){
  let body = document.querySelector("body");
  let crsr = document.querySelector(".crsr");

  body.addEventListener("mousemove",function(deatil){
    crsr.style.top = `${deatil.y}px`;
    crsr.style.left = `${deatil.x}px`;
  });
Shery.makeMagnet(".nav .menu h3, .icon");
}

loddingAnimation();
cursorAnimation();

let  tl2 = gsap.timeline();
tl2.from(".nav",{
  opacity: 0,
  delay: 4.8,
});
tl2.from(".headding h1, .headding .text",{
  y: '100%',
  stagger: 0.3,
  delay: 0,
});


let backElem = document.querySelectorAll(".text");

backElem.forEach(function(e){
  e.addEventListener("mousemove",function(deatil){
      gsap.from(".backElem",{
        top: deatil.y,
        left: deatil.x,
        opacity: 1,
      })
      e.addEventListener("mouseleave",function(){
        gsap.from(".backElem",{
          opacity: 0,
        })
      })

  })

})


