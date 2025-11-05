document.addEventListener("DOMContentLoaded", function () {
    var mm = gsap.matchMedia();

    function setupCardSlider() {
        var cardSlider = document.querySelector('.card-slider');
        if (!cardSlider) {
            return;
        }

        var cardHeader = document.querySelector('.card-slider__title');
        if (!cardHeader) {
            return;
        }

        var cardHeaderParagraph = document.querySelector('.card-slider__description');
        var cardSliderContainer = document.querySelector('.card-slider__list');
        var cardSliderItems = gsap.utils.toArray('.card-slider__list .card-slider__item');
        if (!cardSliderContainer || !cardSliderItems.length) {
            return;
        }

        var cardHeaderAnimated = new SplitText(cardHeader, { type: "chars" });

        var cardScrollAnimationTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: cardSlider,
                start: "top +=90%",
                end: "bottom bottom"
            }
        });

        var headingAnimationProps = {
            y: 20,
            opacity: 0,
            duration: 0.2,
            ease: "power3.inOut"
        };

        var itemAnimationProps = {
            y: 20,
            opacity: 0,
            duration: 0.2,
            ease: "power3.inOut",
            stagger: 0.2
        };

        gsap.fromTo(
            cardHeaderAnimated.chars,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                ease: "power3.inOut",
                stagger: 0.01,
                scrollTrigger: {
                    trigger: cardSlider,
                    start: "top +=85%",
                    end: "bottom bottom"
                }
            }
        );

        if (cardHeaderParagraph) {
            cardScrollAnimationTimeline.from(cardHeaderParagraph, { ...headingAnimationProps, delay: 0.5 });
        }

        cardScrollAnimationTimeline.from(cardSliderItems, itemAnimationProps);

        mm.add("(min-width: 1025px)", () => {
            gsap.to(cardSliderItems, {
                xPercent: -100 * (cardSliderItems.length - 2.5),
                ease: "none",
                scrollTrigger: {
                    trigger: cardSliderContainer,
                    start: "top +=10%",
                    end: "bottom +=5%",
                    pin: true,
                    scrub: 1
                }
            });
        });

        mm.add("(max-width: 1024px)", () => {
            gsap.to(cardSliderItems, {
                xPercent: -100 * (cardSliderItems.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: cardSliderContainer,
                    start: "top +=10%",
                    end: "bottom +=5%",
                    pin: true,
                    scrub: 1
                }
            });
        });

    }

    function startWhenFontsReady() {
        var init = function () {
            setupCardSlider();
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(init).catch(init);
        } else {
            window.addEventListener("load", init, { once: true });
        }
    }

    startWhenFontsReady();
});