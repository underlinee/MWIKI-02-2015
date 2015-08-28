document.addEventListener("DOMContentLoaded", function(e) {
	WIKI.init();
});

var WIKI = WIKI || {};

WIKI.init = function() {
	var btnNewmap = $("#newmap .submit");
	var timenav = $("#timenav");
	
	btnNewmap.on("click", function(){
		var year = $("#newmap .year").val();
		var flag = new WIKI.flag(year);
		timenav.prepend(flag.element);
		$('#modals .mask, .window').hide();
	})

 	$('div[name=modal]').click(function(e) {
        var modalId = $(this).attr('href');   
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();
    
    	var mask = $('#modals .mask');
        mask.css({'width':maskWidth,'height':maskHeight});
        mask.fadeIn(800);    
        mask.fadeTo("slow",0.8);    
    
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        var modal = $(modalId);
        modal.css('top',  windowHeight/2-modal.height()/2);
        modal.css('left', windowWidth/2-modal.width()/2);
        modal.fadeIn(800); 
    });
    
    $('.window .close').click(function (e) {
        $('#modals .mask, .window').hide();
    });        
    
    $('#modals .mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });            
    
    $(window).resize(function () {
 		var modal = $('#modals .window');
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();
        modal.css('top',  windowHeight/2 - box.height()/2);
        modal.css('left', windowWidth/2 - box.width()/2);
	});

};

WIKI.flag = {};
WIKI.flag.year = 0;
WIKI.flag = function(year) {
	this.flagPointer = $("#timenav .flag-pointer");
	this.year = year;
	var template = Handlebars.compile(Templates.mapFlag);
	var flagObj = { position : year/2 };
	this.element = $(template(flagObj));
	this.element.on("click", function(){
		this.movePointer(this.year/2);
	}.bind(this));
};
WIKI.flag.prototype.movePointer = function(left){
	this.flagPointer.css('left',left);	
}

Templates = {}; 
Templates.mapFlag = [
	'<li class="mapFlag">',
		'<div class="bar" style="left: {{position}}px;"></div>',
		'<div class="year"></div>',
	'</li>'
].join("\n");