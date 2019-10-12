$(function () {

    let scrollTop = $(".scrollTop");

    $(window).scroll(function () {
        $(this).scrollTop() > 100 ? scrollTop.css("opacity", "1") :  scrollTop.css("opacity", "0")
    });

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

    $("#ketogether .brand").on("click",() => {
        window.open('https://www.flipsnack.com/savinajia/ketogether_branding_guide.html')
    })

    scrollTop.click(function() {
        $('html, body').animate({
          scrollTop: 0
        }, 800);
        return false;
    });

    $('#task1').slippry({
      slippryWrapper: '<div class="sy-box" />', // wrapper to wrap everything, including pager
      useCSS: false, 
      transition: 'horizontal'
    });

    $('#task2').slippry({
      slippryWrapper: '<div class="sy-box" />', // wrapper to wrap everything, including pager
      useCSS: false, 
      transition: 'horizontal'
    });

    $('#task3').slippry({
      slippryWrapper: '<div class="sy-box" />', // wrapper to wrap everything, including pager
      useCSS: false, 
      transition: 'horizontal'
    });
});