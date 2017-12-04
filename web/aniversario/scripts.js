var bn=0;
var bnl;
var actived=false; 
var loading=true;
var _cAcallanto_Scripts = {
	Init: function(){  
		try{  	
			_cAcallanto_Scripts.loaderImages();
			jQuery( window ).resize(function() {
				if(loading)return;
				_cAcallanto_Scripts.resizeWindow()
			});
		}catch(e){  
			console.error("[Acallanto error] "+e.message);  
		}  
	},
	loaderImages : function(){
		totalImgs = jQuery('body img').length;
		calc = 100/totalImgs;
		t=0;
		jQuery('body img').each(function(e){
			jQuery(this).load(function(ee){
				t++;
				jQuery('.loader').animate({width:(t*calc)+"%"},100);
				if(t==totalImgs){
					jQuery('.loader').fadeOut('slow');
					loading = false;
					setTimeout(function(){ _cAcallanto_Scripts.resizeWindow();},3000);
				}
			})	
		})
	},
	fScrollTop : function(){
		//ScrollPage to Loaded Content
		jQuery('html, body').animate({
		    scrollTop: jQuery("main > nav.internal").first().offset().top
		},1500);
		//_cAcallanto_Scripts.resizeWindow();
	},
	resizeWindow : function(){
		jQuery('main ul > li, main ul > li img').removeAttr('style');
		bw = jQuery(window).width();
		bh = jQuery(window).height();
		bnl = jQuery('main ul > li').length-2;
		adjust = jQuery('main > ul').css({'height':bh,'width':bw});
		var porc = eval(( (1920-(1920-bw))*100 )/1920);
		jQuery('main ul > ol li img').css('width',porc+'%');

		setTimeout(function(){
			if( jQuery('main ul > li').eq(bn).find('img').width()  > jQuery(window).width() ){
				adjust = eval(jQuery('main ul > li').eq(bn).find('img').width()-jQuery(window).width() )/2;
				jQuery('main ul > li img').css('margin-left',-adjust);
			}else{
				//alert( jQuery('main ul li').eq(bn).find('img').width() + ' - ' + jQuery(window).width() );
				jQuery('main ul > li img').css({'width':jQuery(window).width(),'height':'auto'});
				adjust = eval(jQuery('main ul > li img').eq(bn).height() - jQuery(window).height());

				jQuery('main ul > li').css({'height':'100%'});
				jQuery('main ul > li img').css('margin-top',-(adjust/2));
			}
			jQuery('main').css({'width':'100%','height':'100%'});
		},100)
		
		jQuery('main ul > li').each(function(){
			if(jQuery(this).attr('style')!=undefined){
				jQuery(this).css('margin-top',-bh);
			}
		});
		jQuery('main a').click(function(){
			if(actived)return;
			actived=true;
			jQuery('main ul > li').eq(bn).animate({'marginTop':-bh},500,function(){
				jQuery('main a img').eq(bn+1).animate({'opacity':1},500);
				if(bn<bnl){
					bn++;
				}else{
					jQuery('main a').fadeOut('slow',function(){
						setInterval( function(){jQuery('main .logoFinal').fadeIn('slow');} ,1500);
					});
				}
				actived=false;
			});
		});
		jQuery('main').animate({'opacity':1},500);//.css({'width':'100%','height':'100%'})
		jQuery('main a img, main a p').show();
		jQuery('main a img').eq(0).animate({'opacity':1},500);
	}
}


jQuery(document).ready(function(){
	_cAcallanto_Scripts.Init();        
}); 