
const addToCart = (btn) => {
    // if(!prodId && !csrf){// not included as arguments get them
    const prodId= btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    // } 
    //const productElement = btn.closest('div');
    //will give the closet DOM element with this class/type
    fetch('/add-to-cart/' + prodId,{
        method: 'POST',
        headers : {
            'csrf-token' : csrf
            //our csrf 3rd party package not only look in the body,also in query params
        }
    }).then(result => {
        // console.log(result.json());
        return result.json();
    })
    .then(data => {
        // console.log('entered ourscript then');
        // console.log(data);
        //increase cart quantity
        document.getElementById("cartTotalQty").innerHTML = data.qty ;
        swal("My Cart","The Product is Added Succesfully !" , "success");
        
    })
    .catch(err =>{
        console.log(err)
    });
};

const deleteFromCart = (btn) => {
    const prodId= btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    console.log('productId',prodId);
    //const productElement = btn.closest('div');
    //will give the closet DOM element with this class/type
    fetch('/delete-from-cart/' + prodId ,{
        method: 'POST',
        headers : {
            'csrf-token' : csrf
            //our csrf 3rd party package not only look in the body,also in query params
        }
    }).then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
        //maniplute the dom => delete item if nedded or decrease quantity
        if(data.qty <= 0){
            //delete item
            document.getElementById(prodId).remove();
        }
        //swal("My Cart","The Product is deleted Succesfully !" , "success");
        
    })
    .catch(err =>{
        console.log(err)
    });

}

const onChangeItemQty = (btn) => {
    console.log(btn);
    console.log(btn.value);
    testajaxOnChangeItemQty(btn);

}

const testajaxOnChangeItemQty= (btn) => {
    const prodId= btn.parentNode.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.parentNode.querySelector('[name=_csrf]').value;
    console.log(btn.value);
    $.ajax({
        url:'/edit-cart/'+ prodId,
        method:'post',
        dataType:'json',
        headers:{'csrf-token':csrf},
        data:{'reqData':btn.value},
        success:function(response){
            console.log(response.msg,'success',response.msg=="success");
            if(response.message=="success"){
                console.log('success:function(response.qty){',response);
                    //maniplute the dom => delete item if nedded or change quantity
                if(response.qty <= 0){
                    //delete item
                    console.log('deleteing the item with id ', prodId)
                    document.getElementById(prodId).remove();
                }else{
                    console.log(response.qty,' qty >0')
                    //update quantity
                    document.getElementById(prodId).querySelector('[name=itemQty]').setAttribute("value", response.qty);
                }
                
                $("#cart-table").load(" #cart-table > *");
                $('#cover-spin').hide();
                swal("My Cart","The Quantity is updated Succesfully !" , "success");
            }else {
                console.log('not expected message');
                alert('some error occurred try again');
            }
        },
        error:function(response){
            alert('server error occured')
        }
    });
};



//----code for notify-----//
//----code for notify-----//

function createElementFromHTML(htmlString) {
    console.log('createElementFromHTML')
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  }

 

