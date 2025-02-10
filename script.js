let body = document.querySelector("body");
let crsr = document.querySelector(".crsr");
let flagContainer = document.querySelector("#flag-container");
let videoContainer = document.querySelector(".video-container");
let video = document.querySelector(".video-container video");
let image = document.querySelector(".video-container img");
let text = document.querySelector(".footer-text-hedding");

function loddingAnimation() {
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
          height: "0vh",
          duration: 0.5,
        });
      }, 1100);
    },
  });
  //  page 1 Animation
  let tl2 = gsap.timeline();
  tl2.from(".nav", {
    opacity: 0,
    delay: 4.8,
  });
  tl2.from(".headding h1, .headding .text", {
    y: "100%",
    stagger: 0.3,
    delay: 0,
    opacity: 0,
  });
}

function cursorAnimation() {
  body.addEventListener("mousemove", function (deatil) {
    crsr.style.top = `${deatil.y}px`;
    crsr.style.left = `${deatil.x}px`;
  });
  Shery.makeMagnet(".nav .menu h3, .icon");
}

function sheryAnimation() {
  Shery.imageEffect(".project-img", {
    style: 2, //Select Style
    config: {
      resolutionXY: { value: 100 },
      distortion: { value: true },
      mode: { value: -10 },
      mousemove: { value: 0 },
      modeA: { value: 1 },
      modeN: { value: 0 },
      speed: { value: 1, range: [-500, 500], rangep: [-10, 10] },
      frequency: { value: 140.54, range: [-800, 800], rangep: [-50, 50] },
      angle: { value: 0.5, range: [0, 3.141592653589793] },
      waveFactor: { value: 1.54, range: [-3, 3] },
      color: { value: 10212607 },
      pixelStrength: { value: 3, range: [-20, 100], rangep: [-20, 20] },
      quality: { value: 5, range: [0, 10] },
      contrast: { value: 1, range: [-25, 25] },
      brightness: { value: 1, range: [-1, 25] },
      colorExposer: { value: 0.18, range: [-5, 5] },
      strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
      exposer: { value: 8, range: [-100, 100] },
      zindex: { value: "9996999", range: [9999999, -9999999] },
      aspect: { value: 0.8214264578720128 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 3.67, range: [1, 15] },
      durationOut: { value: 0.14, range: [0.1, 5] },
      durationIn: { value: 0.17, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.43, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 2.29, range: [0, 10] },
      metaball: { value: 0.46, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.46, range: [0, 2] },
      noise_scale: { value: 8.4, range: [0, 100] },
      a: { value: 1.37, range: [0, 30] },
      b: { value: -0.94, range: [-1, 1] },
    },

    gooey: true,
    preset: "./presets/wigglewobble.json",
  });
}

function locomotivejs() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function mouseFollows() {
  let click = 0;

  // custom video play btn mouse traking Animation

  videoContainer.addEventListener("mouseenter", function () {
    videoContainer.addEventListener("mousemove", function (deatil) {
      let videoContainerPosition = videoContainer.getBoundingClientRect();
      gsap.to(".costum-video-play-btn", {
        top: deatil.y - videoContainerPosition.top,
        left: deatil.x - videoContainerPosition.left,
      });
      gsap.to(".crsr", {
        opacity: 0,
      });
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(".costum-video-play-btn", {
      top: "20%",
      left: "65%",
    });
    gsap.to(".crsr", {
      opacity: 1,
    });
  });

  //  flag mouse traking animation

  flagContainer.addEventListener("mouseenter", function () {
    flagContainer.addEventListener("mousemove", function (deatil) {
      let flagContainerPosition = flagContainer.getBoundingClientRect();
      gsap.to(".flag", {
        top: deatil.y - flagContainerPosition.top,
        left: deatil.x - flagContainerPosition.left,
        opacity: 1,
      });
    });
  });

  flagContainer.addEventListener("mouseleave", function () {
    gsap.to(".flag", {
      opacity: 0,
    });
  });

  // vido play and pause

  videoContainer.addEventListener("click", function () {
    if (click === 0) {
      video.play();
      click = 1;
      image.style.opacity = 0;
      gsap.to(".costum-video-play-btn", {
        height: "5.5vw",
        width: "5.5vw",
      });
    } else {
      video.pause();
      click = 0;
      image.style.opacity = 1;
      gsap.to(".costum-video-play-btn", {
        height: "10.5vw",
        width: "10.5vw",
      });
    }
  });
}

function footerTextAnime() {
  // footer text Animation
  let splitedText = text.textContent.split("");
  let storeText = "";
  splitedText.forEach(function (e) {
    storeText += `<span>${e}</span>`;
  });
  text.innerHTML = storeText;
  text.addEventListener("mouseenter", function () {
    gsap.to(".footer-text-hedding span", {
      fontFamily: "silk serif",
      color: "transparent",
      textStroke: "1px white",
      fontWeight: 500,
      duration: 0.1,
      stagger: 0.05,
    });
  });
  text.addEventListener("mouseleave", function () {
    gsap.to(".footer-text-hedding span", {
      fontFamily: "plain light",
      color: "white",
      textStroke: "1px white",
      duration: 0.1,
      stagger: 0.05,
    });
  });
}

function microInteraction(){

  function trackingScroll(){
    const scroll = new LocomotiveScroll({
      el: document.querySelector("main"), // Locomotive's container
      smooth: true
    });
    
    // tracking locomotive scroll
    scroll.on("scroll", (position) => {
      let scrollInfo = document.querySelector(".scroll-info");
      let scrollPosition = position.scroll.y;
      if(scrollPosition > 0){
        gsap.to(".scroll-info",{
          opacity: 0,
        })
      }
      else{
        gsap.to(".scroll-info",{
          opacity: 1,
        })
      }
    });
  }
  trackingScroll();
  
gsap.from(".projects-section h1",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  scrollTrigger: {
    trigger: ".projects-section h1",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})

gsap.from(".projects-section .underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: ".projects-section .underline ",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})

gsap.from("#project-name-1",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-1",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-name-2",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-2",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-name-3",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-3",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-name-4",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-4",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-name-5",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-5",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-name-6",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: "#project-name-6",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from("#project-1 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-1 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from("#project-2 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-2 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from("#project-3 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-3 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from("#project-4 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-4 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from("#project-5 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-5 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from("#project-6 .project-underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: "#project-6 .project-underline",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})

gsap.from(".page3-main-text h1",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  scrollTrigger: {
    trigger: ".page3-main-text h1",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})

gsap.from(".page3-main-text .underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: ".page3-main-text .underline ",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from(".about #underline-2",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  scrollTrigger: {
    trigger: ".about #underline-2",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from(".footer-page .underline",{
  opacity: 0,                    
  width: "0%",                       
  duration: 1,
  stagger: 0.8,
  scrollTrigger: {
    trigger: ".footer-page .underline ",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",         
  },
})
gsap.from(".about-pera p",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".about-pera p",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
gsap.from(".footer-info",{
  opacity: 0,                    
  y: 100,                        
  duration: 0.8,
  stagger: 0.5,
  scrollTrigger: {
    trigger: ".footer-info",  
    scroller: "main",
    start: "top 80%",         
    end: "bottom top",           
  },
})
}

loddingAnimation();
locomotivejs();
cursorAnimation();
mouseFollows();
sheryAnimation();
footerTextAnime();
microInteraction();
