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




loaderAnimation();
scrollAnimation();
cursorEffect();
centerTextAnimation();
