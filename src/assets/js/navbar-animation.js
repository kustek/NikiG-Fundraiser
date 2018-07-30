'use strict'
$(window).scroll(function() {
  const navbar = $('.my-navbar');
  const navbarLogo = $('.my-navbar__main-logo');
  const isTop = $(document).scrollTop() > 50;

  if (screen.width > 414) {
    if (!isTop) {
      navbar.css('height','95px');
      navbarLogo.css('width','95px');
    } else {
      navbar.css( 'height', '75px' );
      navbarLogo.css('width','75px');
    }
  } else {
    if (!isTop) {
      navbar.css('height','75px');
      navbarLogo.css('width','75px');
    } else {
      navbar.css('height','60px');
      navbarLogo.css('width','60px');
    }
  }
});
