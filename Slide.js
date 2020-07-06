var slideW = $('#slides').width();

  
  // Next slide
  $('.next-slide').click(function( e ){
    e.preventDefault(); 
   //  left: "+=50",
    $('#slides').animate({scrollLeft:"+="+slideW}, 600);
  });
  
  //previous slide
    $('.back-slide').click(function( e ){
    e.preventDefault();
    $('#slides').animate({scrollLeft: "-="+slideW }, 600);
  });



