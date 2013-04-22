/*
* Easy jCarousel
* https://github.com/carlosrberto/easy-jcarousel/
*
* Copyright (c) 2013 Carlos Roberto Gomes Junior
* http://carlosroberto.name/
* 
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 0.3.1
*/

(function() {
	EasyjCarousel = function(el, options) {
		this.el = el;
		this.options = options;
		this.$carousel = $('.jcarousel', this.el);
		this.$carouselList = $('.jcarousel-list', this.el);
		this.$carouselNext = $('.jcarousel-next', this.el);
		this.$carouselPrev = $('.jcarousel-prev', this.el);
		this.$carousel.jcarousel(this.options);

		this.itemWidth = this.getItemWidth();
		this.itemHeight = this.getItemHeight();
		this.initEvents();
		this.updateDimensions();
		this.checkDimensions();
		this.$carouselPrev.addClass('disable');
	}

	EasyjCarousel.prototype = {
		checkDimensions: function() {
			var totalItens = $('.jcarousel-item', this.$carouselList).length;
			var visibleItens;

			if ( this.options.vertical ) {
				visibleItens = this.$carousel.height()/this.itemHeight;
			} else {
				visibleItens = Math.ceil( this.$carousel.width()/this.itemWidth );
			}

			if ( visibleItens <= totalItens ) {
				this.$carouselNext.addClass('disable');
			}
		},

		getItemWidth: function() {
			var item = $('.jcarousel-item', this.el).eq(0),  itemWidth;
			itemWidth = item.outerWidth() + parseFloat(item.css('margin-left')) + parseFloat(item.css('margin-right'));
			return itemWidth;
		},

		getItemHeight: function() {
			var item = $('.jcarousel-item', this.el).eq(0),  itemHeight;
			itemHeight = item.outerHeight() + parseFloat(item.css('margin-bottom')) + parseFloat(item.css('margin-top'));
			return itemHeight;
		},		

		updateDimensions: function() {
			if ( this.options.vertical ) {
				this.$carouselList.width( this.itemHeight * $('.jcarousel-item', this.jcarousel).length );
			} else {
				this.$carouselList.width( this.itemWidth * $('.jcarousel-item', this.jcarousel).length );
			}
		},

		initEvents: function() {
			this.$carouselNext.on('click', $.proxy(this, 'next'));
			this.$carouselPrev.on('click', $.proxy(this, 'prev'));

			this.$carousel.on('scrollend.jcarousel', $.proxy(function(event, carousel) {
				var hasPrev = carousel.hasPrev(), hasNext = carousel.hasNext();

				if ( hasPrev ) {
					this.$carouselPrev.removeClass('disable');
				} else {
					this.$carouselPrev.addClass('disable');
				}

				if ( hasNext ) {
					this.$carouselNext.removeClass('disable');
				} else {
					this.$carouselNext.addClass('disable');
				}				
			}, this));			
		},

		next: function( event ) {
			event.preventDefault();
			this.$carousel.jcarousel('scroll', '+=1');
		},

		prev: function( event ) {
			event.preventDefault();
			this.$carousel.jcarousel('scroll', '-=1');
		}
	}

	$(function() {
		var carousels = $('[data-easy-jcarousel=true]');
		carousels.each(function() {
			var options = {
				vertical: $(this).data('easy-jcarousel-vertical') == true ? true : false
			}
			$(this).data('easyCarousel', new EasyjCarousel($(this), options));
		});
	});
})();