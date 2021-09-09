//dev branch

$.fn.extend({
	printElement: function() {
		var frameName = 'printIframe';
		var doc = window.frames[frameName];
		if (!doc) {
			$('<iframe>').hide().attr('name', frameName).appendTo(document.body);
			doc = window.frames[frameName];
		}
		doc.document.body.innerHTML = this.html();
		doc.window.print();
		return this;
	}
});

$.fn.Tabs = function() {
	var selector = this;

	this.each(function() {
		var obj = $(this); 
		$(obj.attr('href')).hide();
		$(obj).click(function() {
			$(selector).removeClass('selected');
			
			$(selector).each(function(i, element) {
				$($(element).attr('href')).hide();
			});
			
			$(this).addClass('selected');
			$($(this).attr('href')).fadeIn();
			return false;
		});
	});

	$(this).show();
	$(this).first().click();
	if(location.hash!='' && $('a[href="' + location.hash + '"]').length)
		$('a[href="' + location.hash + '"]').click();	
};


 jQuery.validator.setDefaults({
  errorClass: 'invalid',
	successClass: 'valid',
	focusInvalid: false,
	errorElement: 'span',
	errorPlacement: function (error, element) {
    if ( element.parent().hasClass('jq-checkbox') ||  element.parent().hasClass('jq-radio')) {
      element.closest('label').after(error);
      
    } else if (element.parent().hasClass('jq-selectbox')) {
      element.closest('.jq-selectbox').after(error);
    } else {
      error.insertAfter(element);
    }
  },
  highlight: function(element, errorClass, validClass) {
    if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().addClass(errorClass).removeClass(validClass);
    } else {
    	$(element).addClass(errorClass).removeClass(validClass);
    }
  },
  unhighlight: function(element, errorClass, validClass) {
  	if ( $(element).parent().hasClass('jq-checkbox') ||  $(element).parent().hasClass('jq-radio') || $(element).parent().hasClass('jq-selectbox')) {
    	$(element).parent().removeClass(errorClass).addClass(validClass);
    } else {
    	$(element).removeClass(errorClass).addClass(validClass);
    }
  }
});
//дефолтные сообщения, предупреждения
jQuery.extend(jQuery.validator.messages, {
  required: "Обязательное поле",
  email: "Некорректный email адрес",
  url: "Некорректный URL",
  number: "Некорректный номер",
  digits: "Это поле поддерживает только числа",
  equalTo: "Поля не совпадают",
  maxlength: jQuery.validator.format('Максимальная длина поля {0} символа(ов)'),
  minlength: jQuery.validator.format('Минимальная длина поля {0} символа(ов)'),
  require_from_group: jQuery.validator.format('Отметьте миниммум {0} из этих полей')
});
//кастомные методы валидатора
jQuery.validator.addMethod("lettersonly", function(value, element) {
  return this.optional(element) || /^[a-zA-ZА-Яа-я\s]+$/i.test(value);
}, "Только буквы");

jQuery.validator.addMethod("telephone", function(value, element) {
  return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){6,14}(\s*)?$/i.test(value);
}, "Некорректный формат"); 


//функция для навешивания изображений фоном
function backgrounded (selector) {
	$(selector).each(function(){
		var $this = $(this),
		$src = $this.find('.bg').attr('src');
		if($this.find('.bg').length) {
			$this.addClass('backgrounded').css('backgroundImage','url('+$src+')');
		}
	});
}


//lazy load для сторонних либ
function lazyLibraryLoad(scriptSrc,linkHref,callback) {
  let script = document.createElement('script');
  script.src = scriptSrc;
  document.querySelector('script[src*="script.js"]').before(script);

  if (linkHref !== '') {
    let style = document.createElement('link');
    style.href = linkHref;
    style.rel = 'stylesheet';
    document.querySelector('link[href*="style.css"]').before(style);
  }

  script.onload = callback
}

//создаем ползунки
function createRangeSlider(sliderID,minID,maxID) {
	$(sliderID).ionRangeSlider({
		type: "double",
		from: parseInt($(minID ).val(),10) || 0,
		to: parseInt($(maxID).val(),10) || 100,
		grid: false,
		onChange: function(data) {
			$(minID).val(data.from);
			$(maxID).val(data.to);
		}
	})

	if (minID !== undefined && maxID !== undefined) {
		let rangeData = $(sliderID).data('ionRangeSlider');

		$(document).on('change',minID,function(){
			$val = parseInt(this.value,10);
			if ($val !== NaN) {
				rangeData.update({from: $val})
			}
		});
		$(document).on('change',maxID,function(){
			$val = parseInt(this.value,10);
			if ($val !== NaN) {
				rangeData.update({to: $val})
			}
		});
	}
}


function ionSliderInit() {

	//ползунок для цены
	createRangeSlider('#range-prices','#range_price_min','#range_price_max');

	//ползунок рейтинга
	createRangeSlider('#range-ratings','#range_rating_min','#range_rating_max');

	//ползунок площадь уборки
	createRangeSlider('#range-area','#range_area_min','#range_area_max');

	//ползунок емкость пылесборника
	createRangeSlider('#range-l','#range_l_min','#range_l_max');
}




jQuery(document).ready(function($){

	if (window.devicePixelRatio == 1) {
		$('html').addClass('no-retina');
	}


	$('.slick-goods').slick({
		slidesToShow: 3,
		infinite: false,
		responsive: [
			{
				breakpoint: 576,
				settings: {
					arrows:false,
					variableWidth: true,
					slidesToShow: 1
				}
			}
		]
	});


	$('.slick-main').slick({
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows:false
				}
			}
		]
	});

	lazyLibraryLoad(
		'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css',
		ionSliderInit
	)

	$(document).on('click','.catalog-sorting-link',function(){
		if ($(this).hasClass('active')) {
			$(this).toggleClass('reverse')
		} else {
			$('.catalog-sorting-link').removeClass('active');
			$(this).addClass('active');
		}
	})

	$(document).on('click','.scroll-link',function(e){
		e.preventDefault();
		const hash = $(this).attr('href');
		const that = $(this);
		let tabs = $(this).closest('.card-tabs');
		if ($(hash).length) {
			let offset = $(hash).offset().top;
			$('html,body').animate({
				scrollTop:offset-100
			},300);
		}
	})

	
	$(document).on('click','.card-purposes-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next('.card-purposes-drop').toggleClass('opened');
	})
	$(document).on('mouseup',function(e){
		if ($('.card-purposes').has(e.target).length === 0){
			$('.card-purposes-drop').removeClass('opened');
			$('.card-purposes-toggler').removeClass('opened');
		}
	});


	$(document).on('click','.card-prices-toggler',function(e){
		e.preventDefault();
		$(this).toggleClass('opened');
		$(this).next('.card-prices-drop').toggleClass('opened');
	})
	$(document).on('mouseup',function(e){
		if ($('.card-prices').has(e.target).length === 0){
			$('.card-prices-drop').removeClass('opened');
			$('.card-prices-toggler').removeClass('opened');
		}
	});


	if ( $('.ya-share2').length ) {
		var shareScript = document.createElement('script');
		shareScript.src = '//yastatic.net/share2/share.js';
		document.body.appendChild(shareScript);
	}


	$('main table').wrap('<div class="responsive-table"></div>');


	//Замена телефонов и email ссылками
	$('.phone-link, .tel').each(function(){
		var phone = $(this).text().replace(/[^+0-9]/g, '');
		$(this).wrapInner('<a href="tel:' + phone + '"></a>');
	});
	$('.mail-link').each(function(){
		var mail = $(this).text().replace(/\W\@/g, '');
		$(this).wrapInner('<a href="mailto:' + mail + '"></a>');
	});


	//mfp для видео
  $('.mfp-video').magnificPopup({
    type: 'iframe',
    mainClass: 'magnific-video',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
	});
	

	$(document).on('click','.mfp-custom-close',function(e){
		e.preventDefault();
		$.magnificPopup.close();
	});
   

	//инициализация MFP popup для форм
	$(document).on('click','.ajax-mfp',function(){
		var a = $(this);
		$.magnificPopup.open({
			items: { src: a.attr('data-href') },
			type: 'ajax',    
			overflowY: 'scroll',
			removalDelay: 300,
			mainClass: 'my-mfp-zoom-in',
			ajax: {
				tError: 'Ошибка. <a href="%url%">Контент</a> не может быть загружен',
			},
			callbacks: {
				open: function () {
					setTimeout(function(){
						$('.mfp-wrap').addClass('not_delay');
						$('.white-popup').addClass('not_delay');
					},700);
				}
		  }
		});
		return false;
	});



	//стилизация элементов форм
	$('input[type="checkbox"], input[type="radio"], input[type="file"], select').not('.not-styler').styler({
		singleSelectzIndex: '1',
	});


	
	$("#comment_form").validate({
    rules: {
      f_name: {
        required: true,
        lettersonly: true
      },
      f_comment: {
        required: true
			}
    }
  });


	$(window).on('scroll',function(e){
		let st = $(window).scrollTop();
		// console.log(st);
		if (st > 60) {
			$('header.header').addClass('fixed');
			$('body').addClass('header-fixed');
		} else {
			$('header.header').removeClass('fixed');
			$('body').removeClass('header-fixed');
		}
	});

	if(matchMedia) {
		var screen768 = window.matchMedia('(max-width:768px)');
		screen768.addListener(changes768);
		changes768(screen768);
	}
	function changes768(screen768) {
		if(screen768.matches) {
			$('.card-item').each(function(key,item){
				let purposes = $(item).find('.card-purposes');
				purposes.insertAfter($(item).find('.card-item-line'));
			})
		} else {
			$('.card-item').each(function(key,item){
				if ($(item).find('.card-item-line').next('.card-purposes').length) {
					let purposes = $(item).find('.card-item-line').next('.card-purposes');
					purposes.appendTo($(item).find('.card-cols'));
				}
				
			})
		}
	}

	function toggledText(selector) {
		if ($(selector).text().length > 250) {
			$(selector).addClass('ui-toggled').append('<span class="ui-toggled-toggler">Читать полностью</span>');
		}
		$(document).on('click','.ui-toggled-toggler',function(e){
			e.preventDefault();
			let parent = $(this).parent('.ui-toggled');
			if ($(this).text() === 'Читать полностью') {
				parent.addClass('opened');
				$(this).text('Скрыть');
			} else {
				parent.removeClass('opened');
				$(this).text('Читать полностью');
			}
		})
	}

	if($('.main-top-txt').length) {
		toggledText('.main-top-txt');
	}

	$(document).on('click','.compare-item-purposes-btn',function(e){
		const $this = $(this);
		const $drop = $this.next('.compare-item-purposes-drop');
		if ($drop.length && $drop.find('.card-purposes-item').length) {
			e.preventDefault();
			$this.toggleClass('opened');
			$drop.toggleClass('opened');
		}
	})
	$(document).on('mouseup',function(e){
		if ($('.compare-item-purposes').has(e.target).length === 0){
			$('.compare-item-purposes-drop').removeClass('opened');
			$('.compare-item-purposes-btn').removeClass('opened');
		}
	});

	$(document).on('click','.filters-toggler',function(e){
		e.preventDefault();
		let isopen = $(this).attr('data-isopen');
		let filters = $(this).prev('.filters-hidden');
		if (isopen == 'false') {
			filters.slideDown(100);
			$(this).attr('data-isopen','true');
			$(this).text($(this).attr('data-close'));
		} else {
			filters.slideUp(100);
			$(this).attr('data-isopen','false');
			$(this).text($(this).attr('data-open'));
		}
	});

	if ($('.card-wrapper').length) {
		$('.wrapper').addClass('wrapper-sticky');
	}

	if ($('.card-scroll-tracking').length) {
		$(window).scroll(function(){
			var $sections = $('.card-scroll-tracking');
			$sections.each(function(key,item){
				var top  = $(item).offset().top - 120;
				// var bottom = top +$(item).height();
				var scroll = $(window).scrollTop();
				var id = $(item).attr('id');
					if( scroll > top){
						$('.card-tabs a.active').removeClass('active');
						$('.card-tabs a[href="#'+id+'"]').addClass('active');
					}
				})
		});
	}

	if ($('.col-catalog-filters').length) {
		$('.catalog-sorting').append('<span class="m-filters-toggler" onclick="">Фильтры</span>');
		$('.col-catalog-filters').after('<div class="m-filters-close" onclick="">Закрыть фильтры</div>')
	}

	$(document).on('click','.m-filters-toggler',function(e){
		e.preventDefault();
		$(this).addClass('opened');
		$('.col-catalog-filters').addClass('opened');
		$('.m-filters-close').addClass('opened');
	})

	$(document).on('click','.m-filters-close',function(e){
		e.preventDefault();
		$(this).removeClass('opened');
		$('.col-catalog-filters').removeClass('opened');
		$('.m-filters-toggler').removeClass('opened');
	})

});//ready close


$(window).on('load',function(){

	if ($('.lightgallery').length) {
		lazyLibraryLoad(
			'//cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/js/lightgallery.min.js',
			'//cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css',
			function () {
				$('.lightgallery').lightGallery({
					download: false,
					selector: 'a'
				})
			}
		);
	}

});