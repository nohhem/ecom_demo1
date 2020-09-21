

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
        //console.log(result.json());
        return result.json();
    })
    .then(data => {
        console.log(data);
        //addition succseful  // put notification code here 
        console.log('entered ourscript then');
        console.log('body', document.body);
        
        // <div id="notification" class="notification-popover success" style="display: none;">Ürün başarılı bir şekilde sepete eklenmiştir.</div>
        var mdiv = document.createElement("div");               // Create a <p> element
        mdiv.innerText = "The product is Added !";               // Insert text
        mdiv.setAttribute("id", "notification");
        mdiv.setAttribute("class", "notification-popover success"); //todo
        mdiv.setAttribute("style", "display: block;");   
        document.body.appendChild(mdiv);                      // Append <p> to <body>

        //alert('succefully submitted'); // make the div visible
        //productElement.remove();//not supporeted in Internet explorer
        //productElement.parentNode.removeChild(productElement);    
    })
    .catch(err =>{
        console.log(err)
    });
};


// const deleteProduct = (btn) => {
//     const prodId= btn.parentNode.querySelector('[name=productId]').value;
//     const csrf = btn.parentNode.querySelector('[name=_csrf]').value;
//     const productElement = btn.closest('article');
//     //will give the closet DOM element with this class/type
//     fetch('/admin/product/' + prodId,{
//         method: 'DELETE',
//         headers : {
//             'csrf-token' : csrf
//             //our csrf 3rd party package not only look in the body,also in query params
//         }
//     }).then(result => {
//         return result.json();
//     })
//     .then(data => {
//         console.log(data);
//         //productElement.remove();//not supporeted in Internet explorer
//         productElement.parentNode.removeChild(productElement);    
//     })
//     .catch(err =>{
//         console.log(err)
//     });
// };

