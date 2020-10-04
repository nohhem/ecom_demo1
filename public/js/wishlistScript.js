let GlobalArray = [];

const addAndremove = (btn) => {
    // when click on adding to whish lists those style will change them immediatly the reason why  is because when click on add product to wish list 
    // the product will be added and the style will change after refreshing so those style to change the styles on click 
    // first i find the id the according to it we change style 
    const prodId = btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

    // this function will add the product to the wish list 

    fetch('/add-remove-wish-list/' + prodId, {
        method: 'POST',
        headers: {
            'csrf-token': csrf
        },

    }).then(result => {
        return result.json();
    }).then(data => {
        console.log(data.data);
        if (data.data == "add") {
            $('#' + prodId).css('color', "#e4826c");
            $('#' + prodId).css('box-shadow', "0px 0px 0px 1px #F8694A inset, 0px 0px 0px 0px #F8694A");
            $('#' + prodId).css('-webkit-box-shadow', " 0px 0px 0px 1px #F8694A inset, 0px 0px 0px 0px #F8694A");
        } else if (data.data == "remove") {
            $('#' + prodId).css('color', "#30323A");
            $('#' + prodId).css('box-shadow', "0px 0px 0px 1px #DADADA inset, 0px 0px 0px 6px transparent");
            $('#' + prodId).css('-webkit-box-shadow', "0px 0px 0px 1px #DADADA inset, 0px 0px 0px 6px transparent");
            $('#' + prodId).css('background-color', "#FFF");
        }
    })
        .catch(err => {
            console.log(err)
        });

};




const checkBoxWish = (btn) => {

    $('#addtoCart').css('display', "block");
    $('#removefromWish').css('display', "block");

    inputs = document.getElementsByClassName("checkvalues");
    let arr = [];


    for (var i = 0, max = inputs.length; i < max; i += 1) {
        // Take only those inputs which are checkbox
        if (inputs[i].type === "checkbox" && inputs[i].checked) {
            arr.push(inputs[i].value);
        }
    }



    if (arr.length < 1) {
        console.log("i should hide")
        $(".addtoCart").hide()
        $(".removefromWish").hide()
    } else if (arr.length <= 1) {
        console.log("i should show")
        $(".addtoCart").show()
        $(".removefromWish").show()
    }

    GlobalArray = arr;

};

const addToCartGroup = (btn) => {
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const csrf = $('#token').val();
    $.ajax({
        url: '/add-cart-group',
        method: 'post',
        dataType: 'json',
        data: { "values": JSON.stringify(GlobalArray) },
        headers: {
            'X-CSRF-Token': csrf
        },
        success: function (response) {
            if (response.msg == 'success') {
                alert('task added successfully');
            } else {
                alert('some error occurred try again');
            }
        },
        error: function (response) {
            alert('server error occured')
        }
    });

}


const removeFromWishListGroup = (btn) => {
    //const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const csrf = $('#token').val();
    $.ajax({
        url: '/remove-wish-list-group',
        method: 'post',
        dataType: 'json',
        data: { "values": JSON.stringify(GlobalArray) },
        headers: {
            'X-CSRF-Token': csrf
        },
        success: function (response) {
            console.log(response)
            let outputHtml = '';
            wishListProduct = response.data

            console.log(wishListProduct)
            // $('#products').append(outputHtml);
            $.each(wishListProduct, function (i, wishListProduct) {
                outputHtml += `<div class="wish-col-md-4 col-md-4 col-sm-6 col-xs-6">
        <div class="product product-single wishproduct wishproduct-single">
            <div class="product-thumb wishproduct-thumb">
                <label
                    class="checkbox checkbox-outline checkbox-outline-2x checkbox-primary ">
                    <input value="${wishListProduct._id}" type="checkbox"
                        class="checkinputhide checkvalues" onclick="checkBoxWish(this)">
                    <span></span></label>
                <img src="${wishListProduct.imageUrl}" alt="">

            </div>
            <div class="product-body">
                <div class="product-rating">
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star"></i>
                    <i class="fa fa-star-o empty"></i>
                </div>
                <h2 class="product-name"><a href="#">${wishListProduct.title}</a>
                </h2>
                <div class="product-btns">
                    <input type="hidden" name="_csrf" value="${csrf}"
                        id="token">
                    <input type="hidden" value="${wishListProduct._id}"
                        name="productId">
                    <button class="primary-btn add-to-cart" onclick="addToCart(this); ">
                        <i class="fa fa-shopping-cart"></i>
                        Add to Cart</button>
                </div>
            </div>
        </div>
    </div>`;
            })

            $('.products').empty();
            $('.products').append(outputHtml);


        },
        error: function (response) {
            alert('server error occured')
        }
    });

}

