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
    }, 25);

    gsap.from('.line h1', {
        y: 150,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.5,
        stagger: 0.25,
    })

    gsap.from('.counter span', {
        opacity: 0,
        duration: 0.6,
        delay: 0.5
    })

    gsap.from('.wait', {
        opacity: 0,
        duration: 0.6,
        delay: 1
    })

    gsap.to('#loader', {
        duration: 0.4,
        opacity: 0,
        delay: 4.8,
    })

    gsap.to('#web', {
        opacity: 0,
        duration: 1.2,
        delay: 4.2,
        ease: 'power2.out',
    })

    gsap.from('#loader', {
        display: 'none',
    });

    gsap.from('#page1', {
        delay: 0.2,
        y: 1200,
        opacity: 0
    })
}
// loaderAnimation();