var bns, und, bnsLength,btNavActived;
bnsTimer = 8000;
fadeTransition = 'slow';
currBns = 1;

var _cAcallanto_Scripts = {
	Init: function(){  
		try{  	
			if(_cAcallanto_Scripts.isMobile()){
				jQuery('body div').hide();
				window.location = "/mob/"
				return;
			}
			_cAcallanto_Scripts.fnBanners();
			_cAcallanto_Scripts.fnUnidades();
			_cAcallanto_Scripts.fnNavMenu();
			if( jQuery('#talkToUs').length != 0 ){
				_cAcallanto_Scripts.fnSend_talkToUs_Form();
			}
			if( jQuery('#beAcallanto').length != 0 ){
				_cAcallanto_Scripts.fnSend_beAcallanto_Form();
			}
			//_cAcallanto_Scripts.resizeWindow();
		}catch(e){  
			console.error("[Acallanto error] "+e.message);  
		}  
	},
	isMobile : function(){
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			return true;
		}else{
			return false;
		}
	},
	fnBanners: function(){
		bnsURLs = ['','imprensa/1608-Folder-Acallanto.pdf','aAcallanto.html','nossasUnidades.html','aAcallanto.html','instCredenciadas.html'];
		bnsLength = jQuery('section.banners > ul li').length;
		var getBanner = function(){
			jQuery('section.banners > ul li, section.banners aside dl dt, section.banners aside dl dd').fadeOut(fadeTransition,function(){
				jQuery('section.banners nav ul li a').removeClass('hover');
			});
			jQuery('section.banners aside dl dt').eq(currBns-1).fadeIn(fadeTransition);
			jQuery('section.banners aside dl dd').eq(currBns-1).fadeIn(fadeTransition);
			jQuery('section.banners > ul li').eq(currBns-1).fadeIn(fadeTransition,function(){
				if( bnsURLs[currBns-1] == '' ){
					jQuery('section.banners aside > a').hide();
				}else{
					jQuery('section.banners aside > a').show().attr('href',bnsURLs[currBns-1]);
					if( bnsURLs[currBns-1].indexOf('pdf') != -1 ){
						jQuery('section.banners aside > a').attr('target','_blank');
					}else{
						jQuery('section.banners aside > a').removeAttr('target');
					}
				}
				jQuery('section.banners nav ul li').eq(currBns-1).find('a').addClass('hover');
				if(currBns<bnsLength){
					currBns++;
				}else{
					currBns=1;
				}
			});
			bns = setTimeout( function(){getBanner();},bnsTimer);
		}
		//Banners Navigation
		if(bnsLength>1){
			jQuery('section.banners').append('<nav><ul></ul></nav>');
			jQuery('section.banners > ul li').each(function(e){
				jQuery('section.banners nav ul').append('<li><a href="javascript:void(0);">Banner '+e+'</a></li>');
			});
		};

		jQuery('section.banners nav ul li a').click(function(e){
			clearTimeout(bns);
			i = jQuery(this).parent().index();
			currBns = i+1;
			getBanner();
		});
		getBanner();
	},
	fnUnidades : function(){
		unidadeLength = 2;
		currUnidade = 1;
		var rndUnidades = function(i,elem){
			jQuery('main section.content article.nossasUnidades nav a').removeClass('hover');
			jQuery('main section.content article.nossasUnidades dl dt, main section.content article.nossasUnidades dl dd').hide();
			elem.addClass('hover');
			jQuery('main section.content article.nossasUnidades dl dt:eq('+i+'), main section.content article.nossasUnidades dl dd:eq('+i+')').fadeIn(fadeTransition);
			
			if(currUnidade<unidadeLength){
				currUnidade++;
			}else{
				currUnidade=1;
			}
			
			und = setTimeout( function(){jQuery('main section.content article.nossasUnidades nav a').eq(currUnidade-1).click();},bnsTimer);

		}
		jQuery('main section.content article.nossasUnidades nav a').click(function(e){
			clearTimeout(und);
			i = jQuery(this).parent().index();
			rndUnidades(i,jQuery(this));
		});
		
		jQuery('main section.content article.nossasUnidades nav a').eq(0).click();
	},
	fnNavMenu : function(){
		menu = jQuery('main > nav ul li, main section.content article.nossasUnidades a.knowMore, section.banners aside > a');
		if(menu.length > 0){
			menu.click(function(e){
				if( jQuery(this).find('a').attr('target') || jQuery(this).attr('target') ) return;
				e.preventDefault();
				if(jQuery(this).closest('nav').attr('class')=='main'){
					_cAcallanto_Scripts.fnMenuHomeAction( jQuery(this) );
				}else{
					_cAcallanto_Scripts.fnMenuInternalAction( jQuery(this) );
				}
			});
		}
	},
	fnMenuHomeAction : function(e){
		e.closest('nav').removeClass('main').animate({height:0},'slow',function(){
			e.addClass('active');
			jQuery(this).addClass('internal').insertAfter(jQuery('section.banners')).animate({height:81},'slow',function(){
				_cAcallanto_Scripts.fnLoadPage( e.find('a').attr('href'), e.attr('class'), e );
				_cAcallanto_Scripts.fScrollTop();
			});

		});
		jQuery('section.banners nav').animate({marginTop:'-20px'},'slow');
	},
	fnMenuInternalAction : function(e){
		if(jQuery('main > nav ul li.active').attr('class') == e.attr('class')) return;
		if(e.closest('nav').length > 0){			
			e.closest('nav').find('li').removeClass('active');
			e.addClass('active');
			_cAcallanto_Scripts.fnLoadPage( e.find('a').attr('href'), e.attr('class'), e );
		}else{
			jQuery('main > nav ul li').each(function(liIndex){
				if( jQuery(this).find('a').attr('href') == e.attr('href')){
					jQuery(this).click();
				}
			})
			return;
		}
		_cAcallanto_Scripts.fScrollTop();
	},
	fnLoadPage : function(pageRef, actElement, oElement){
		jQuery('main section.content article').fadeOut('slow', function(){

		jQuery('main section.content').load(pageRef+" main section.content article", function( response, status, xhr ) {
		  if ( status == "error" ) {
		    var msg = "Ops, aconteceu alguma coisa errada: ";
		    jQuery('main section.content').html("<article><p>"+ msg + xhr.status + " " + xhr.statusText+"</p></article>");
		  }else{
			jQuery('main section.content article').fadeIn('slow');
		  	_cAcallanto_Scripts.fnNavInternas();
		  	if(jQuery('gallery').length>0){
		  		_cAcallanto_Scripts.fnGallery();
		  	}
		  	if( jQuery('#talkToUs').length != 0 ){
				_cAcallanto_Scripts.fnSend_talkToUs_Form();
			}
			if( jQuery('#beAcallanto').length != 0 ){
				_cAcallanto_Scripts.fnSend_beAcallanto_Form();
			}
		  }
		});

		});
	},
	fnNavInternas : function(){
		container = jQuery('main section.content article.internal');
		if(container.length > 0){
			container.find('nav ul li, a:eq(0)').click(function(e){
				liIndex = jQuery(this).index()+1;
				if(btNavActived){
					if( btNavActived.attr('class') == jQuery(this).attr('class') ){return;} // Resolve Double Click
					btNavActived.removeClass('active').find('span').animate({left:'10px'},'slow',function(){jQuery(this).removeClass('active');}); 
				}
				if(jQuery(this).attr('class')=="home"){liIndex = 0;}
				container.find('aside').hide();

				jQuery('main section.content article.internal div.adultoGallery, main section.content article.internal div.kidsGallery').css({'visibility':'hidden','position':'absolute'});

				intTextRef = jQuery(this).text();
				container.find('aside').eq(liIndex).fadeIn('slow',function(){
					if( intTextRef.toLowerCase().indexOf('adulto') >-1){
						jQuery('main section.content article.internal div.adultoGallery').css({'visibility':'visible','position':'relative'});
					}else if( intTextRef.toLowerCase().indexOf('kids') >-1){
						jQuery('main section.content article.internal div.kidsGallery').css({'visibility':'visible','position':'relative'});
					}
					_cAcallanto_Scripts.fScrollTop();
				});
				btNavActived = jQuery(this);
				jQuery(this).addClass('active').find('span').animate({left:'256px'},'slow',function(){
					jQuery(this).addClass('active');
				})
			});
		}
	},
	fScrollTop : function(){
		//ScrollPage to Loaded Content
		jQuery('html, body').animate({
		    scrollTop: jQuery("main > nav.internal").first().offset().top
		},1500);
		//_cAcallanto_Scripts.resizeWindow();
	},
	fnGallery : function(){
		jQuery(".owl-carousel").owlCarousel({
			items : 1,
			paginationSpeed	 : 400
		});
		jQuery("main section.content article.internal div gallery > div a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'fast', theme:'pp_default', social_tools: false});
	},
	fnSend_talkToUs_Form : function(){
		var form = jQuery('#talkToUs');
        //Apply MASK to phones numbers
	    form.find("input[name=fc_phone]").mask("(99) 9999-9999");
	    form.find("input[name=fc_mobile]").mask("(99) 99999-9999");

	    form.validate({
            rules:{
                 fc_name: 	{ required: true, minlength:6 },
                 fc_email: 	{ required: true, email:true },
                 fc_phone: 	{ require_from_group: [1,'.phone']},
                 fc_mobile: { require_from_group: [1,'.phone']},
                 fc_subject:{ minlength:5 },
                 fc_message:{ required: true, minlength:10 }
            },
            messages : {
                fc_name:{
                    required: "Ajude-nos a te indentificar. Por favor, digite o seu <strong>Nome</strong>.",
                    minlength: "Digite seu <strong>Nome</strong> e <strong>Sobrenome</strong>."
                },
                fc_email:{
                    required: "Precisamos te responder. Por favor, digite seu <strong>E-mail</strong> corretamente.",
                    email: "Parece que este <strong>E-mail</strong> é inválido"
                },
                fc_phone:{
                    require_from_group: "Pode ser que façamos contato por telefone/celular.<br />Por favor, digite ao menos um <strong>Número de telefone</strong> ou <strong>Celular</strong>."},
                fc_mobile:{
                    require_from_group: "Pode ser que façamos contato por telefone/celular.<br />Por favor, digite ao menos um <strong>Número de telefone</strong> ou <strong>Celular</strong>."},
				fc_message:{
                    required: "Qual seria a sua mensagem para nós? Por favor, digite a <strong>Mensagem</strong>."
                }
            },
		    showErrors: function(errorMap, errorList) {
		        if(errorList.length) {
		            form.prev('aside p.errorInfo').html(errorList[0]['message']).fadeIn('slow');
		        }else{
		            form.prev('aside p.errorInfo').html('').fadeOut('fast');
		        }
			},
			debug: true,
			success: "valid",
			submitHandler: function(e) { 
				form.find('input[type=submit]').val('enviando...').attr('disabled', 'disabled');
				var name = jQuery("input[name=fc_name]").val();
				var email = jQuery("input[name=fc_email]").val();
				var phone = jQuery("input[name=fc_phone]").val();
				var mobile = jQuery("input[name=fc_mobile]").val();
				var subject = jQuery("input[name=fc_subject]").val();
				var message = jQuery("textarea[name=fc_message]").val();

				// Returns successful data submission message when the entered information is stored in database.
				var dataString = 'ref=faleConosco&name='+ name + '&email='+ email + '&phone='+ phone + '&mobile='+ mobile + '&subject='+ subject + '&message='+ message;
				$.ajax({
					url : 'enviarEmail.php',
					type: "POST",
					data : dataString,
					success:function(data, textStatus, jqXHR){
						form.fadeOut('fast').prev('aside p.errorInfo').removeClass('errorInfo').addClass('success').html('<strong>Formulário enviado com sucesso!</strong><br />A equipe Acallanto agradece.').fadeIn('slow');
					},
					error: function(jqXHR, textStatus, errorThrown){
						form.fadeOut('fast').prev('aside p.errorInfo').html('<strong>Formulário não enviado!</strong><br />Tente novamente mais tarde por favor.').fadeIn('slow');
					}
			    });
			}
        });       
	},
	fnSend_beAcallanto_Form : function(){
		var form = jQuery('#beAcallanto');
        //Apply MASK to phones numbers
	    form.find("input[name=fc_phone]").mask("(99) 9999-9999");
	    form.find("input[name=fc_mobile]").mask("(99) 99999-9999");

	    form.validate({
            rules:{
                 fc_name: 	{ required: true, minlength:6 },
                 fc_occupation: { minlength:6 },
                 fc_phone: 	{ require_from_group: [1,'.phone']},
                 fc_mobile: { require_from_group: [1,'.phone']},
                 fc_file:{ required: true }
            },
            messages : {
                fc_name:{
                    required: "Ajude-nos a te indentificar. Por favor, digite o seu <strong>Nome</strong>.",
                    minlength: "Digite seu <strong>Nome</strong> e <strong>Sobrenome</strong>."
                },
                fc_phone:{
                    require_from_group: "Pode ser que façamos contato por telefone/celular.<br />Por favor, digite ao menos um <strong>Número de telefone</strong> ou <strong>Celular</strong>."},
                fc_mobile:{
                    require_from_group: "Pode ser que façamos contato por telefone/celular.<br />Por favor, digite ao menos um <strong>Número de telefone</strong> ou <strong>Celular</strong>."},
				fc_file:{
                    required: "Precisamos do seu currículo para análise.<br />Por favor, suba um arquivo <strong>.DOC(x) ou .PDF</strong>."
                }
            },
		    showErrors: function(errorMap, errorList) {
		        if(errorList.length) {
		            form.prev('aside p.errorInfo').html(errorList[0]['message']).fadeIn('slow');
		        }else{
		            form.prev('aside p.errorInfo').html('').fadeOut('fast');
		        }
			},
			debug: true,
			success: "valid",
			submitHandler: function(e) { 
				form.find('input[type=submit]').val('enviando...').attr('disabled', 'disabled');
				var name = jQuery("input[name=fc_name]").val();
				var occupation = jQuery("input[name=fc_occupation]").val();
				var phone = jQuery("input[name=fc_phone]").val();
				var mobile = jQuery("input[name=fc_mobile]").val();
				var file = jQuery("input[name=fc_file]").val();

				// Returns successful data submission message when the entered information is stored in database.
				var dataString = 'ref=sejaAcallanto&name='+ name + '&occupation='+ occupation + '&phone='+ phone + '&mobile='+ mobile + '&file='+ file;
				$.ajax({
					url : 'enviarEmail.php',
					type: "POST",
					data : dataString,
					success:function(data, textStatus, jqXHR){
						form.prev('aside p.errorInfo').show().html(data);
						return;
						jQuery('.ajax-file-upload-statusbar').fadeOut('fast');
						form.fadeOut('fast').prev('aside p.errorInfo').removeClass('errorInfo').addClass('success').html('<strong>Formulário enviado com sucesso!</strong><br />A equipe Acallanto agradece.').fadeIn('slow');
					},
					error: function(jqXHR, textStatus, errorThrown){
						form.fadeOut('fast').prev('aside p.errorInfo').html('<strong>Formulário não enviado!</strong><br />Tente novamente mais tarde por favor.').fadeIn('slow');
					}
			    });
			}
        });       

		jQuery("#fileuploader").uploadFile({
			url:"upload.php",
			allowedTypes:"doc,docx,pdf",
			fileName:'myfile',
			maxFileSize:1024*1024*2,
			onSuccess:function(files,data,xhr){
				jQuery('.ajax-upload-dragdrop').hide();
				jQuery("input[name=fc_file]").val(data);
			}
		});
	},
	resizeWindow : function(){

		wh = jQuery( window ).height();
		dh = jQuery( 'body' ).height();
		ww = jQuery( window ).width();

		if(wh > dh){
			pb = parseInt(wh-dh);
			jQuery('main section.content').css('padding-bottom',pb);
		}else{
			jQuery('main section.content').removeAttr('style');
		}
		jQuery(window).resize(function() {
			_cAcallanto_Scripts.resizeWindow();
		})
	}
}


jQuery(document).ready(function(){
	_cAcallanto_Scripts.Init();        
}); 