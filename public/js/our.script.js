

const addToCart = (btn) => {
    const prodId= btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
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
        //wow_default_alert();
         
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

        }else{
            console.log(data.qty,' qty >0')
            //decrease quantity
            document.getElementById(prodId).querySelector('[name=itemQty]').value=data.qty;

        }
        //swal("My Cart","The Product is Added Succesfully !" , "success");
        //wow_default_alert();
    })
    .catch(err =>{
        console.log(err)
    });

}
//----code for notify-----//
//----code for notify-----//

function createElementFromHTML(htmlString) {
    console.log('createElementFromHTML')
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild; 
  }

  function wow_default_alert () {
    alert("Hello World!");
  }

  function ref_code () {
      const deleteProduct = (btn) => {
    const prodId= btn.parentNode.querySelector('[name=productId]').value;
    const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
    const productElement = btn.closest('article');
    //will give the closet DOM element with this class/type
    fetch('/admin/product/' + prodId,{
        method: 'DELETE',
        headers : {
            'csrf-token' : csrf
            //our csrf 3rd party package not only look in the body,also in query params
        }
    }).then(result => {
        return result.json();
    })
    .then(data => {
        console.log(data);
        //productElement.remove();//not supporeted in Internet explorer
        productElement.parentNode.removeChild(productElement);    
    })
    .catch(err =>{
        console.log(err)
    });
};

        //refernce code
        //     console.log('body', document.body);
        //     // <div id="notification" class="notification-popover success" style="display: none;">Ürün başarılı bir şekilde sepete eklenmiştir.</div>
        //                  // Create a <p> element
        //     //var mdiv =createElementFromHTML(``);
        //     var htmlString = `<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //     <div class="modal-dialog" role="document">
        //       <div class="modal-content">
        //         <div class="modal-header">
        //           <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        //           <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //             <span aria-hidden="true">&times;</span>
        //           </button>
        //         </div>
        //         <div class="modal-body">
        //           ...
        //         </div>
        //         <div class="modal-footer">
        //           <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //           <button type="button" class="btn btn-primary">Save changes</button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>`;

        //     var mdiv = new DOMParser().parseFromString(htmlString, "text/html");
        //     mdiv=mdiv.firstChild;
        //     console.log('created the html element ---------');
        //     console.log(mdiv);
        //     //var mdiv = document.createElement("div");  
        //     //mdiv.setAttribute("class", "modal"); //todo
        //     // mdiv.setAttribute("style", "display: block;");
        //     // mdiv.innerText =''               // Insert text
        //     document.body.appendChild(mdiv);   // Append <p> to <body>

        //     //alert('succefully submitted'); // make the div visible
        //     //productElement.remove();//not supporeted in Internet explorer
        //     //productElement.parentNode.removeChild(productElement);   
  }


console.log('ourscript');