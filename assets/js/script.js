$(function() {
 // Opening
    setTimeout(() => {
        $("#header").css("opacity", "1")
    }, 1500)
    setTimeout(() => {
        $("#main").css("opacity", "1")
    }, 1750)

    // reveal words
    new RevealFx(document.querySelector(".rev-1"), {
        revealSettings: {
            bgcolor: "#434E6F",
            delay: 1750,
            onCover: function (t, e) {
                t.style.opacity = 1
            }
        }
    }).reveal()
    
    new RevealFx(document.querySelector(".rev-2"), {
        revealSettings: {
            bgcolor: "#434E6F",
            delay: 2000,
            onCover: function (t, e) {
                t.style.opacity = 1
            }
        }
    }).reveal()
    
    new RevealFx(document.querySelector(".rev-3"), {
        revealSettings: {
            bgcolor: "#434E6F",
            delay: 2250,
            onCover: function (t, e) {
                t.style.opacity = 1
            }
        }
    }).reveal()
    
    new RevealFx(document.querySelector(".rev-4"), {
        revealSettings: {
            bgcolor: "#434E6F",
            delay: 2500,
            onCover: function (t, e) {
                t.style.opacity = 1
            }
        }
    }).reveal()

    

    setTimeout(() => {
        $(".introduction").css("opacity", "1")
        $(".intro-right").css("opacity", "1")
    }, 3000)

    setTimeout(() => {
        $("#menu").css("opacity", "1")
        $("#down").css("opacity", "1")
        $(".contact-container").css("opacity", "1")
    }, 3500)

    setTimeout(() => {
        $("#about").css("opacity", "1")
    }, 4000)

    //set photo slider
    const photos = ["assets/img/photo.JPG","assets/img/photo2.jpg","assets/img/photo3.jpg"]
    let i = 0
    const photoSlider = setInterval(() => {
        $(".box__img").attr("src", photos[i])
        i++
        if (i > 2) {
            i = 0
        }
    }, 5000)


    $(window).scroll(function () {
        $(this).scrollTop() > 120 ? $("#down").css("opacity", "0") : $("#down").css("opacity", "1")
    })

    //menu

    const handleClickMenu = (el) => {
        $(".nav-overlay").toggleClass("nav-overlay-active")
        $(".nav-open-img").toggleClass("nav-open-img-deactive")
        $(".nav-close-img").toggleClass("nav-close-img-active")
    }
    $('#menu').on('click', handleClickMenu);
    $(".nav-overlay-container li").each(function() {
        $(this).on("click", handleClickMenu)
    })

    //header
    let didScroll,
        lastScrollTop = 0,
        delta =  10,
        navbarHeight = $("header").outerHeight()

    $(window).scroll(function(event){
        didScroll = true;
    }); 

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        let st = $(this).scrollTop();
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }

    //sticky
    const projects = d3.select("#projects")
    let scrolly = projects.selectAll(".scrolly")
    let left = scrolly.select(".left")
    let right = scrolly.select(".right")
    let step = right.selectAll(".step")

    const scroller = scrollama();

    function handleResize() {
        let leftH = left.clientHeight,
            leftTop = (window.innerHeight - leftH) / 3

        left.style('top', leftTop + 'px')
        scroller.resize()
    }

    function setupStickyfill() {
        d3.selectAll('.sticky').each(function () {
            Stickyfill.add(this);
        });
    }

    

    function init() {
        setupStickyfill();

        // 1. force a resize on load to ensure proper dimensions are sent to scrollama
        handleResize();

        // 2. setup the scroller passing options
        // 		this will also initialize trigger observations
        // 3. bind scrollama event handlers (this can be chained like below)
        scroller.setup({
            step: '#projects .scrolly .right .step',
            offset: 1,
            threshold: 1,
        })

        // setup resize event
        window.addEventListener('resize', handleResize);
    }

    init();

    //switch

    //contact

    // const waypoints = $('#contact').waypoint({
        
    //     handler: function() {
    //         console.log("hahah")
    //         new RevealFx(document.querySelector(".rev-5"), {
    //             revealSettings: {
    //                 bgcolor: "#434E6F",
    //                 delay: 500,
    //                 onCover: function (t, e) {
    //                     t.style.opacity = 1
    //                 }
    //             }
    //         }).reveal()
        
    //         new RevealFx(document.querySelector(".rev-6"), {
    //             revealSettings: {
    //                 bgcolor: "#434E6F",
    //                 delay: 1000,
    //                 onCover: function (t, e) {
    //                     t.style.opacity = 1
    //                 }
    //             }
    //         }).reveal()
    //     }
    // })




    

    

    

    

})