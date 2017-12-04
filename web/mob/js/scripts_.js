var navg=false;

var _cAcallanto_Scripts = {
	Init: function(){  
		try{  	
			_cAcallanto_Scripts.fnNavMenu();
		}catch(e){  
			console.error("[Acallanto error] "+e.message);  
		}  
	},
	fnNavMenu : function(){
		jQuery('main nav.main ul li a').click(function(e){
			elem = jQuery(this).parent();
			e.preventDefault();
			jQuery('body').animate({
			    scrollTop: jQuery("main").first().offset().top
			},400,function(){
				_cAcallanto_Scripts.goMenu(elem);
			});
		});
		
		/*Internal*/
		jQuery('main section > nav ul li a').click(function(){
			//SECTION
			s = jQuery(this).closest('section');
			//LI index of CLICK event
			i = jQuery(this).parent().index();
			//NAV
			n = jQuery(this).closest('nav');
			//Set text according to A element click
			t = jQuery(this).text();

			//Hide Nav First of all
			n.fadeOut('fast',function(){
				//Set TITLE 
				jQuery('main section article h2').html(t);
				//Show article aside by the click index
				s.find('article').fadeIn('fast').find('aside').eq(i).fadeIn('slow');
				s.find('article > a').click(function(){
					//Force Click when the content has only ONE content aside
					if( section.find('> nav ul li').length==1 ){ jQuery('main section > nav ul li a').click();	}

					s.find('article aside').eq(i).fadeOut('slow').parent().fadeOut('fast',function(){
						n.fadeIn('fast');
					});
				});
			});
		});

	},
	goMenu : function(pageRef,hrefRef){
		homeIco = jQuery('main nav.main ul li.homePage');
		pageRef = pageRef;
		section = jQuery('section.'+pageRef.attr('class'));
		link = hrefRef;
		footer = jQuery('main footer');
		if(!navg){
			jQuery('main nav.main, main footer').fadeOut('fast');
			//alert(  )
			jQuery('main header aside').fadeOut('slow',function(){
				jQuery('main').addClass('internal');
				//Force Click when the content has only ONE content aside
				if( section.find('> nav ul li').length==1 ){ section.find('> nav ul li a').click();	}
				setTimeout(function(){
					pageRef.css('display','inline-block').animate({opacity: 1},'slow',function(){
						homeIco.css('opacity','1').animate({marginRight:'+=26.5%'},'slow',function(){
							section.fadeIn('fast');
							footer.fadeIn('fast'); 
						});
					});
				},100);
			});
			navg=pageRef;
		}else{
			jQuery('main section').fadeOut('fast');
			footer.fadeOut('fast');
			homeIco.animate({marginRight:'-=26.5%'},'fast',function(){
				homeIco.css('opacity','0');
				navg.animate({opacity: 0},'fast',function(){
					navg.removeAttr('style','display');
					jQuery('main').removeClass('internal');
					setTimeout(function(){
						jQuery('main nav.main, main footer, main header aside').fadeIn('slow');
					},1000)
					navg=false;
				});
			});
			
		}
	}
}


jQuery(document).ready(function(){
	_cAcallanto_Scripts.Init();        
}); 