jQuery(function($) {
    $('.owl-carousel').owlCarousel({
        loop:true,
        nav:true,
        items: 1,
        dots: false,
        navText: [
            '<span class="fa fa-chevron-left"></span><span class="sr-only">Previous</span>',
            '<span class="fa fa-chevron-right"></span><span class="sr-only">Next</span>'
        ]
    })
    .on('touchstart', function(e) {
        // e.preventDefault();
        window.scrollX = 0;
    });
});
