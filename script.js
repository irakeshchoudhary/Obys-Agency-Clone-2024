function loaderAnimation() {
    var counter = document.querySelector('#counter');
    var counterValue = 0;
    var intervalId = setInterval(function () {
        if (counterValue < 100) {
            counterValue++;
            counter.textContent = counterValue;
        }
        else {
            clearInterval(intervalId);
        }
    }, 35);

    // GSAP Timeline for Sequential Animations
    var tl = gsap.timeline();

    // Step 1: Animate '.line h1' coming from the bottom
    tl.from('.line h1', {
        y: 150,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.3,
        stagger: 0.25,
    })

        // Step 2: Fade-in effect for '.counter span'
        .from('.counter span', {
            opacity: 0,
            duration: 0.6,
        }, "-=0.4") // Starts slightly earlier (overlapping with previous step)

        // Step 3: Fade-in effect for '.wait'
        .from('.wait', {
            opacity: 0,
            duration: 0.6,
        }, "+=0.5") // Starts 0.5 seconds after the previous step

        // Step 4: Fade-out animation for '#loader'
        .to('#loader', {
            duration: 0.4,
            opacity: 0,
        }, "+=2") // Starts 2 seconds after the previous step (matches countdown timing)

        // Step 5: Fade-out animation for '#web'
        .to('#web', {
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
        }, "-=0.4") // Overlaps slightly with loader fade-out

        // Step 6: Hide '#loader' completely (set display to 'none')
        .set('#loader', {
            display: 'none',
        })
}

function scrollAnimation() {
    let tl = gsap.timeline({
        repeat: -1,
        paused: true,
    });


    tl.from('.scrollText', {
        y: 100,
        duration: 1.5,
        stagger: 0.5,
    }).to('.scrollText', {
        y: -100,
        duration: 1.5,
        stagger: 0.5,
    });


    tl.play();


    ScrollTrigger.create({
        trigger: "#page1",
        start: "top top",
        end: "bottom top",
        onLeave: () => tl.pause(),
        onEnterBack: () => tl.play(),
    });
}

function cursorEffect() {
    document.addEventListener('mousemove', (event) => {
        gsap.to('#crsr', {
            x: event.clientX,
            y: event.clientY,
            duration: 0.3,
            ease: 'power2.out',
        })
    })
    Shery.makeMagnet(".nav3 a", {});
    Shery.makeMagnet(".nav1 svg", {});

    const crsr = document.querySelector("#crsr");
    // Hover effect for interactive elements
    const hoverableElements = document.querySelectorAll("a, svg, button, [role='button']");
    hoverableElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            gsap.to(crsr, {
                scale: 2,
                duration: 0.3,
            });
        });

        el.addEventListener("mouseleave", () => {
            gsap.to(crsr, {
                scale: 1,
                duration: 0.3,
            });
        });
    });
}

function centerTextAnimation() {
    let tl = gsap.timeline();
    tl.from('.lines h1', {
        y: 150,
        duration: 0.6,
        ease: 'power2.out',
        delay: 5,
        stagger: 0.25,
    })
}

function locomotiveScroll() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// Initialize sticky navigation
locoScroll.on('locoScroll', () => {
    const targetElement = document.getElementById('target-element');
    if (targetElement.offsetTop <= window.scrollY && window.scrollY <= targetElement.offsetTop + targetElement.offsetHeight) {
        document.querySelector('.nav1').classList.add('sticky');
    } else {
        document.querySelector('.nav1').classList.remove('sticky');
    }
});

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}

function sheryAnimation(){
    Shery.imageEffect('.img-container',{
        style: 5,
        debug: true,
        gooey: true
    })

    Shery.imageEffect(".img-container", {
        style: 6,
        debug: true,
      });
}

loaderAnimation();
scrollAnimation();
cursorEffect();
centerTextAnimation();
locomotiveScroll();
sheryAnimation();
