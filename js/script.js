var wHeight = $(window).height();
var scrollNow = 0;
var wSlideItem = ($('.slide-item').parent().width() / 5)+25;


function setTransform() {
    var tImg2 = wHeight * 2;
    var tImg3 = wHeight * 3;

    $(".img2").css({
        "transform": "translateY(-" + tImg2 + "px)"
    })

    $(".img3").css({
        "transform": "translateY(-" + tImg3 + "px)"
    })

    $(".second-thumnail").fadeOut(300);

}

function openSearch() {
    $('html').css('overflow-y', 'hidden');
    $('.close-search').css('transform', 'translateX(0)');
    $('.search').css('transform', 'translateX(0)');
}

function closeSearch() {
    $('html').css('overflow-y', 'auto');
    $('.close-search').css('transform', 'translateX(-100vw)');
    $('.search').css('transform', 'translateX(-100vw)');
}

function rupiah(angka){
	var number_string = angka.replace(/\./g,'').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return rupiah;
}

function cartOpen() {
    $('html').css('overflow-y', 'hidden');
    $('.close-cart').css('display', 'block');
    $('.cart-box').css('transform', 'translateX(0)');
    $('.cart-btn-box').css('transform', 'translateX(0)');
}

function cartClose() {
    $('html').css('overflow-y', 'scroll');
    $('.close-cart').css('display', 'none');
    $('.cart-box').css('transform', 'translateX(100vw)');
    $('.cart-btn-box').css('transform', 'translateX(100vw)');
}

function priceCart() {
    var price = 0;
    for (let i = 0; i < $(".cart-body .price-item").length; i++) {
        price += parseInt($('.cart-body .price-item:eq('+i+')').attr('price'));
    };

    $('.cart-btn-box .total-price').html('Rp. ' + rupiah(price.toString()));
}

function qtyCart() {
    var qty = 0;
    for (let i = 0; i < $(".cart-body #item-qty").length; i++) {
        qty += parseInt($('.cart-body #item-qty:eq('+i+')').val());
    };
    $('.navbar .bedge-item').html(qty);
    priceCart();
}

function setPriceItem() {
    for (let i = 0; i < $(".cart-body .cart-item").length; i++) {
        var qty = parseInt($('.cart-body .cart-item:eq('+i+') #item-qty').val());
        var price = parseInt($('.cart-body .cart-item:eq('+i+') .price-item').attr('nPrice'));
        $('.cart-box .cart-body .cart-item:eq('+i+') .price-item').attr('price', (price * qty).toString());
        $('.cart-box .cart-body .cart-item:eq('+i+') .price-item').html('Rp. ' + rupiah((price * qty).toString()));
    };

    qtyCart();
}

function addCart(id, name, color, price, img) {
    if ($('.cart-box .cart-body').find('.'+id).length) {
        // add qty Item
        var qty = parseInt($('.cart-box .cart-body .'+id+' #item-qty').val()) + 1;
        $('.cart-box .cart-body .'+id+' #item-qty').val(qty);
        setPriceItem();
    }else{
        // New Item
        $('.cart-body').prepend(''+
            '<div class="cart-item '+ id +'">'+
                '<div class="item-img">'+
                    '<img src="'+ img +'" alt="" height="100%">'+
                '</div>'+
                '<div class="item-detail">'+
                    '<h3>'+ name +'</h3>'+
                    '<div class="item-color-box">'+
                        '<h6>Color :</h6>'+
                        '<div class="item-color" style="background-color: '+ color +';"></div>'+
                    '</div>'+
                    '<h4 class="price-item" nPrice="'+ price +'" price="'+ price +'">Rp. '+ rupiah(price.toString()) +'</h4>'+
                    '<div class="item-qty">'+
                        '<i class="fas fa-trash-alt remove-item" style="font-size: 17px;cursor: pointer;color: red;margin-right: 30px;"></i>'+
                        '<i class="fas fa-minus minus-item" style="font-size: 17px;cursor: pointer;color: #636668;"></i>'+
                        '<input type="number" name="item-qty" id="item-qty" min="1" max="99" value="1">'+
                        '<i class="fas fa-plus plus-item" style="font-size: 17px;cursor: pointer;color: #636668;"></i>'+
                    '</div>'+
                '</div>'+
            '</div>'
        );
        qtyCart();
    }
}

function slideItem() {
    $('.slide-box').prepend($('.slide-box .slide-item:eq(7)').get(0));
    $('.slide-item').width(($('.slide-item').parent().width() / 5)+20);
    $('.slide-item').height(($('.slide-item').parent().width() / 5)+20);
    $('.slide-box').height(($('.slide-item').parent().width() / 5)+20);
    $('.slide-box').css({"transform": "translateX(-" + ((($('.slide-item').width()-5)/4)+$('.slide-item').width()+5) + "px)"});

    
    for (let i = 0; i < $(".slide-box .slide-item").length; i++) {
        $('.slide-box .slide-item:eq('+i+')').css({"transform": "translateX(" + (wSlideItem * i) + "px)"});
    }
    $('.slide-item').css('transition', 'all 500ms ease');
}

function slideRight() {
    var fTransX =  $('.slide-box .slide-item:eq(1)').css('transform').split(",")[4].trim();
    for (let i = 0; i < $(".slide-box .slide-item").length; i++) {
        var transX = $('.slide-box .slide-item:eq('+i+')').css('transform').split(",")[4].trim() - fTransX;
        $('.slide-box .slide-item:eq('+i+')').css({"transform": "translateX(" + transX + "px)"});
    }
    $('.slide-box').append($('.slide-box .slide-item:eq(0)').get(0));
    $('.slide-box .slide-item:eq(7)').css({"transform": "translateX(" + (fTransX*7) + "px)"});
}

function slideLeft() {
    var fTransX =  parseFloat($('.slide-box .slide-item:eq(1)').css('transform').split(",")[4].trim());
    for (let i = 0; i < $(".slide-box .slide-item").length; i++) {
        var transX = parseFloat($('.slide-box .slide-item:eq('+i+')').css('transform').split(",")[4].trim()) + fTransX;
        $('.slide-box .slide-item:eq('+i+')').css({"transform": "translateX(" + transX + "px)"});
    }
    $('.slide-box').prepend($('.slide-box .slide-item:eq(7)').get(0));
    $('.slide-box .slide-item:eq(0)').css({"transform": "translateX(0px)"});
}



$(document).ready(function () {

    console.log();
    setTransform();
    setPriceItem();
    slideItem();
    var wHeight = $(window).height();
    
    $('.btn-add-cart').click(function() {
        var id = $(this).parents('.img-box').siblings('.caption').find('.active').attr('itemId');
        var name = $(this).parents('.img-box').siblings('.caption').find('.pro-name').html();
        var color = $(this).parents('.img-box').siblings('.caption').find('.active').css('background-color');
        var price = $(this).parents('.img-box').siblings('.caption').find('.pro-price').attr('price');
        var img = $(this).parent().siblings('img').attr('src');
        addCart(id, name, color, price, img);
    });

    $("#inputSearch").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".search .prod-list-item").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $(document).on('click', '.plus-item', function() {
        if ($(this).siblings('input').val() < 99) {
            var val =  parseInt($(this).siblings('input').val()) + 1;
            $(this).siblings('input').val(val);
            setPriceItem();
        }
    });

    $(document).on('click', '.minus-item', function() {
        if ($(this).siblings('input').val() > 1) {
            var val =  parseInt($(this).siblings('input').val()) - 1;
            $(this).siblings('input').val(val);
            setPriceItem();
        }
    });

    $(document).on('click', '.remove-item', function() {
        console.log('ggg');
        $(this).parentsUntil('.cart-body').remove();
        setPriceItem();
    });

    $('.color-opt').click(function() {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var url = $(this).attr('img-color');
        $(this).parentsUntil('caption').siblings('.img-box').find('img').attr('src', url);
    })


    $('.slide-toggle').click(function() {
        if ($(this).attr('direct') === 'left') {
            slideLeft();
        } else if ($(this).attr('direct') === 'right') {
            slideRight();
        }
    });


    $(window).scroll(function () {
        var wScroll = $(this).scrollTop();

        var transImg2 = -wHeight + wScroll;
        var transImg3 = (-wHeight * 2) + wScroll;
        var transHead = (-wHeight * 2 - (wHeight/2)) + wScroll;

        // Section-1
        if (wScroll < wHeight) {
            $(".img2").css({
                "transform": "translateY(" + transImg2 + "px)"
            })
        } else {
            $(".img2").css({
                "transform": "translateY(0)"
            })
        }

        if (wScroll < wHeight * 2) {
            $(".img3").css({
                "transform": "translateY(" + transImg3 + "px)"
            })
        } else {
            $(".img3").css({
                "transform": "translateY(0)"
            })
        }

        if (wScroll < wHeight * 3 && transHead < 0) {
            $(".header-1").css({
                "transform": "translateY(" + transHead + "px)"
            })
        }else if (transHead == -100) {
            $(".header-1").css({
                "transform": "translateY(-100px)"
            })
        }else{
            $(".header-1").css({
                "transform": "translateY(0)"
            })
        }

    });

});


$(window).resize(function () {
    $(this).scrollTop(0);
    location.reload();
    slideItem();
});