var pagew = $(window).width();
var pageh = $(window).height();
var spotselect = 0;
var pageratio, pointfive;

$(document).ready(function(){
  $(".t1, .t2, .t3, .t4, .t5").css('width',pagew);
  for (var w = 0; w <= 3; w++){
    $(".t"+(w+1)).css('left',pagew*w);  
  }

  var imgnumber = $(".master img").size();
  var imgarray = [];
  pageratio = pagew / pageh;

  var eighty = (pageh-(pageh*.5))/2;
  pointfive = pagew*.05;
  $(".pointl, .pointr, .pointhoverl, .pointhoverr").css('top',eighty);


  setTimeout(howto, 2500)
  putandplace(1);
});

function howto(){
  $(".pointr").animate({right:-pointfive},500);
  $(".pointl").animate({left:-pointfive},500);
  $(".keys").animate({top:30}, 800, 'easeOutBounce', function(){
    $(this).delay(2000).animate({top:-129}, 800, 'easeInExpo');
  });
}

$(window).resize(function(){
  pagew = $(window).width();
  pageh = $(window).height();
  pageratio = pagew / pageh;
  console.log(pagew +', '+pageh+', '+pageratio);
});

$(window).keydown(function(e){
    if (e.keyCode == 37)moveleft();
    if (e.keyCode == 39)moveright();
    else{}
});

$(".pointhoverl").click(function(){moveleft()});
$(".pointhoverr").click(function(){moveright()});



function afterimagesetforward(movement){
  var newpheight = $(movement).height();
  var newpwidth = $(movement).width();

  var newimgratio = newpwidth / newpheight;
  var newcalcheight = pagew / newimgratio;
  var newcalcwidth = newpheight * newimgratio;
  var newhoribuffer = ((newcalcwidth-pagew)/2);
  var newvertbuffer = ((newcalcheight-pageh)/2);
  console.log(newhoribuffer, newvertbuffer, newimgratio, pageratio);
  if (newimgratio < pageratio){
    $(movement).css('top', -newvertbuffer);
    $(movement).css('width',pagew);
  }
  if (newimgratio > pageratio){
    $(movement).css('height',pageh);
    $(movement).css('left', newvertbuffer);
  }
  console.log(movement+'complete!');
}

(function( $ ){
  $.fn.afterimageset = function() {
    var newpheight, newpwidth, newimgratio, newcalcheight, newcalcwidth, newhoribuffer, newvertbuffer;
    console.log(this);
    var aheightorsomething = this.height();
    if (this.complete) afterimagesetforward(this);
    else {

      var plshold = setInterval(function(){
        console.log(aheightorsomething)
        if (this.complete){
          afterimagesetforward(this);
          plshold.clearInterval();
        }
      },200);
    }

    // var newpheight = this.height();
    // var newpwidth = this.width();

    // var newimgratio = newpwidth / newpheight;
    // var newcalcheight = pagew / newimgratio;
    // var newcalcwidth = newpheight * newimgratio;
    // var newhoribuffer = ((newcalcwidth-pagew)/2);
    // var newvertbuffer = ((newcalcheight-pageh)/2);
    // console.log(newhoribuffer, newvertbuffer, newimgratio, pageratio);
    // if (newimgratio < pageratio){
    //   this.css('top', -newvertbuffer);
    //   this.css('width',pagew);
    // }
    // if (newimgratio > pageratio){
    //   this.css('height',pageh);
    //   this.css('left', newvertbuffer);
    // }
    // console.log(img+'complete!');
  };
})( jQuery );

function putandplace(img){
  // $(".master").append('<div class="t'+img+'"><img src=inc/'+img+'.jpg class="t'+img+'_i" /></div>');
  $(".t"+img).css('width',pagew).css('left', (img-1)*pagew);

  $('<img src=inc/'+img+'.jpg class="t'+img+'_i" />').appendTo('.t'+img).afterimageset(this);

  

  // setTimeout(afterimageset, 1000);
  // 

  
}



$(".pointhoverl").hover(function(){
  $(".pointl").stop().animate({left:0},400);
}, function(){
  $(".pointl").stop().animate({left:-pointfive},400);
});

$(".pointhoverr").hover(function(){
  $(".pointr").stop().animate({right:0},400);
}, function(){
  $(".pointr").stop().animate({right:-pointfive},400);
});



function moveleft(){
  spotselect --;
  $(".master").stop().animate({left: - pagew*(spotselect)}, 800);
  if (spotselect <= 0){
    $(".master").stop().animate({left: pointfive}, 200, function(){
      $(".master").stop().animate({left: 0}, 200);
    });
    spotselect = 0;
  }
}

function moveright(){
  spotselect ++;
  $(".master").stop().animate({left: - pagew*(spotselect)}, 800, function(){
    putandplace(spotselect+3);
  });
  if (spotselect >= 25){
    $(".master").stop().animate({left: - pagew*(25)-pointfive}, 200, function(){
      $(".master").stop().animate({left: - pagew*(25)}, 200);
    });
    spotselect = 25;
  }
  
}

// function afterimageset(movement){
  //   var newpheight = $(".t"+img+"_i").height();
  //   var newpwidth = $(".t"+img+"_i").width();

  //   var newimgratio = newpwidth / newpheight;
  //   var newcalcheight = pagew / newimgratio;
  //   var newcalcwidth = newpheight * newimgratio;
  //   var newhoribuffer = ((newcalcwidth-pagew)/2);
  //   var newvertbuffer = ((newcalcheight-pageh)/2);
  //   console.log(newhoribuffer, newvertbuffer, newimgratio, pageratio);
  //   if (newimgratio < pageratio){
  //     $(".t"+img+"_i").css('top', -newvertbuffer);
  //     $(".t"+img+"_i").css('width',pagew);
  //   }
  //   if (newimgratio > pageratio){
  //     $(".t"+img+"_i").css('height',pageh);
  //     $(".t"+img+"_i").css('left', newvertbuffer);
  //   }
  //   console.log(img+'complete!');
  // }














