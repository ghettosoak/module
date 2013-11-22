(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

var spotselect = 0;
var pagew, pageh, pageratio, pointfive, breadth, resizingpause;
var plshold = learnd = inmotion = overlaid = ismobile = false;
var plsholdcache = [];
var imghistory = [];
var $master = $('.master');
var $windowpane = $(window);
var $plusnorm = $('#plusnorm');
var $punkt = $('#punkt');
var movement = new placedelegate();

$(document).ready(function(){
  pagew = $windowpane.width();
  pageh = $windowpane.height();
  pageratio = pagew / pageh;

  breadth = $master.find('div').size();
  $master.css('width',pagew*breadth);
  $master.find('div').css({'height':pageh, 'width':pagew});
  // $('.holder').css({'height':pageh, 'width':pagew});

  var eighty = (pageh-(pageh*.5))/2;
  pointfive = pagew*.05;
  $(".pointl, .pointr, .pointhoverl, .pointhoverr").css('top',(pageh-400)/2);
  if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) ismobile = true;
});

$windowpane.load(function(){
  for (var c = 1; c <= breadth; c++){
    plsholdcache.push(c)
    imghistory.push(c)
  }
  // plsholdcache.push(1, 2, 3, breadth, (breadth-1));
  // imghistory.push(1, 2, 3, breadth, (breadth-1));
  movement.forth(breadth-2);
  $(".keys").animate({top:30}, 800, 'easeOutBounce');
  $('.info_overlay').css('left',pagew)
});

function howto(pressd){
  learnd = true;
  $(".keys").animate({top:-129}, 800, 'easeInExpo');

  if (pressd == 'left') $(".pointr").stop().animate({right:-40},500);
  else if (pressd == 'right') $(".pointl").stop().animate({left:-40},500);
  else{
    $(".pointr").stop().animate({right:-40},500);
    $(".pointl").stop().animate({left:-40},500);
  }
}

$('.soc_in, .logo').click(function(){
  if (!overlaid){
    if (!ismobile) $('.info_overlay').animate({'left':(pagew*.2)},500, 'easeInExpo')
    else $('.info_overlay').animate({'left':(pagew*.05)},500, 'easeInExpo')
    overlaid = true;
  }else{
    $('.info_overlay').animate({'left':pagew},500, 'easeInExpo')
    overlaid = false;
  }
});

$('.info_overlay_close').click(function(){
  $('.info_overlay').animate({'left':(pagew)},500, 'easeInExpo')
  overlaid = false;
});

$windowpane.resize(function(){
  clearTimeout(resizingpause);
  resizingpause = setTimeout(function(){
    pagew = $windowpane.width();
    pageh = $windowpane.height();
    pageratio = pagew / pageh;
    $master.css('width',pagew*breadth);
    $master.find('div').css({'height':pageh, 'width':pagew})
    .each(function(e){
      // if ($(this).contents().size() == 1)
        resizer($(this).find('img'), (e+1))
    });
    $('.info_overlay').css('left',pagew)
  }, 500);

});

function placedelegate(){
  function forth(tic){
    plsholdcache.push(tic);
    imghistory.push(tic);
    through();
    console.log('yeah!')
  }
  this.forth = forth; 
  function through(){
    if (!plshold){
      if (plsholdcache.length != 0){
        console.log(plsholdcache)
        putandplace(plsholdcache.shift());
        setTimeout(through,200);
      }
    }else setTimeout(through,200);
  }
}

function putandplace(thisplsthx){
  console.log(thisplsthx)
  plshold = true;
  $punkt.css('display','block');
  var img = $("<img class/>").load(function(){
    $.when( img ).done(function() {
      $('.t'+thisplsthx).append(img);
      resizer($(this), thisplsthx);
    })
  }).attr('src', 'inc/'+thisplsthx+'.jpg');  
}

function resizer(hello, numbering){
  var tehpos = $('.t'+numbering).data('center');
   
  var newpheight = hello.height();
  var newpwidth = hello.width();
  var newimgratio = newpwidth / newpheight;

  var newcalcheight = pagew / newimgratio;
  var newcalcwidth = pageh * newimgratio;

  var newhoribuffer = ((newcalcwidth-pagew)/2);
  var newvertbuffer = ((newcalcheight-pageh)/2);
  
  if (newimgratio < pageratio){
    if (tehpos == 'top') hello.css({'top': 0, 'width':pagew}); 
    if (tehpos == 'bottom') hello.css({'bottom': 0, 'width':pagew});
    if (tehpos == 'center' || tehpos == 'right' || tehpos == 'left') hello.css({'top': -newvertbuffer, 'width':pagew}); 
  }
  if (newimgratio > pageratio){
    if (tehpos == 'right') hello.css({'height':pageh, 'right': 0}); 
    if (tehpos == 'left') hello.css({'height':pageh, 'left': 0}); 
    if (tehpos == 'center' || tehpos == 'top' || tehpos == 'bottom') hello.css({'height':pageh, 'left': -newhoribuffer}); 
  }
  plshold = false;
  $punkt.css('display','none');
}

$(".pointhoverl").hover(function(){
  $(".pointl").stop().animate({left:0},400);
}, function(){
  $(".pointl").stop().animate({left:-40},400);
});

$(".pointhoverr").hover(function(){
  $(".pointr").stop().animate({right:0},400);
}, function(){
  $(".pointr").stop().animate({right:-40},400);
});

function carouseling(direction){
  if (!inmotion){
    inmotion = true;
    if (direction == 'left'){
      spotselect --;
      if (spotselect <= 0) spotselect = breadth;
      $master.css('left',-pagew).children('div').last().detach().prependTo($master).parent().stop().animate({'left':'0px'}, 400);
      if ((imghistory.indexOf(spotselect-2) == -1) && (spotselect-2 > 0)) movement.forth(spotselect-2)
    }
    if (direction == 'right'){
      spotselect ++;
      if (spotselect >= breadth+1) spotselect = 0;      
      $master.stop().animate({'left': -pagew}, 400, function(){
        $master.children('div').first().detach().parent().end().appendTo($master).parent().css('left','0px');
      });
      if ((imghistory.indexOf(spotselect+3) == -1) && (spotselect+3 <= breadth)) movement.forth(spotselect+3)
    }
    setTimeout(function(){inmotion = false}, 400)
  }
}

$windowpane.keydown(function(e){
  if (e.keyCode == 37)carouseling('left');
  if (e.keyCode == 39)carouseling('right');
  if (!learnd) howto();
});

$(".pointhoverl").click(function(){
  carouseling('left')
  if (!learnd) howto('left');
});
$(".pointhoverr").click(function(){
  carouseling('right')
  if (!learnd) howto('right');
});











