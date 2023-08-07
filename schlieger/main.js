let kaufButtons = document.querySelectorAll('.add-to-cart');
let productList = document.querySelector('#product-list');
let totalCost = document.querySelector('#total-cost');
let total = 0;

const main = document.querySelector('main');

let productDescription = document.querySelectorAll(".product-description");
productDescription.forEach(description => {
    if (description.textContent.length > 200){
        description.textContent = description.textContent.substring(0, 200) + "...";
    }
})

console.log(kaufButtons)

kaufButtons.forEach(button => {
    button.addEventListener('click', () => {
        let name = button.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.querySelector("h5").textContent;
        let price = button.parentElement.querySelector('.price').textContent;

        let productContainer = document.createElement('div');
        productContainer.classList.add('border-top', 'border-bottom', 'row', 'justify-content-between', 'align-items-center');

        let removeButton = document.createElement('div');
        removeButton.classList.add('col-1');
        let trash = document.createElement('i');
        trash.classList.add('bi', 'bi-trash', 'remove-item');
        removeButton.appendChild(trash);

        let productName = document.createElement('div');
        productName.classList.add('text-muted', 'product-name', 'col-8');
        productName.textContent = name;

        let productCost = document.createElement('div');
        productCost.classList.add('cost', 'col-3', 'text-end');
        productCost.textContent = price;

        productList.appendChild(productContainer);
        productContainer.appendChild(removeButton);
        productContainer.appendChild(productName);
        productContainer.appendChild(productCost);

        price = price.replaceAll(' ', '').replace('EUR', '');
        console.log(price);
        total += parseInt(price);


        let removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                let product = button.parentElement.parentElement;
                let productPrice = parseInt(button.parentElement.parentElement.querySelector(".cost").textContent.replace(' ', '').replace('EUR', ''));
                console.log(productPrice);
                productList.removeChild(product);
                total -= parseInt(productPrice);
                totalCost.textContent = total + " EUR";
            })
        })

        /*
        costs = document.querySelectorAll('.cost');
        costs = [...costs];
        
        costs.forEach(item => {
            preis = parseInt(item.textContent);
            total += preis;
            console.log(total);
            costs = [];
        })
        */

        totalCost.textContent = total + " EUR";
    })
})

let productDetailInfoBtns = document.querySelectorAll('.mehr');
console.log(...productDetailInfoBtns);

productDetailInfoBtns.forEach(button => {
    button.addEventListener('click', () => {
        let productPath = 'images/'
        productPath += button.parentElement.parentElement.parentElement.parentElement.querySelector("h5").textContent;
        productPath += '.png';
        productPath = productPath.replaceAll(' ', '');
        console.log(productPath);


        let productWindow = document.createElement('div');
        productWindow.classList.add('container-fluid', 'd-flex', 'flex-column', 'align-items-center','border', 'shadow-lg', 'position-absolute', 'top-0', 'bottom-0', 'start-0', 'end-0','z-3', 'bg-schwh');
        let windowControl = document.createElement('div');
        windowControl.classList.add('container-fluid', 'd-flex', 'justify-content-between', 'align-items-center');
        
        let windowName = document.createElement('h2');
        windowName.classList.add('display-5');
        windowName.textContent = 'Produkt ID';

        let windowClose = document.createElement('div');
        let windowBtn = document.createElement('a');
        windowBtn.setAttribute('href', '#produkt');
        windowBtn.classList.add('bi', 'bi-x-lg');
        windowClose.appendChild(windowBtn);

        windowControl.appendChild(windowName);
        windowControl.appendChild(windowClose);
        productWindow.appendChild(windowControl);

        let productImage = document.createElement('img');
        productImage.classList.add('img-fluid');
        productImage.setAttribute('style', 'height: 90vh;');
        productImage.setAttribute('src', productPath);

        productWindow.appendChild(productImage);
        main.appendChild(productWindow);
        disableScroll();

        windowClose.addEventListener('click', () => {
            productWindow.remove();
            enableScroll();
        })
    })
})

let montageBuy = document.querySelectorAll('.montage-buy');
montageBuy.forEach(button => {
    button.addEventListener('click', () => {
        let name = "Montage";
        let price = button.parentElement.parentElement.querySelector('.kwp-preis').textContent;
        price = price.replace('kWp', '');
        price = price.replace('EUR', '');
        price = price.replaceAll(' ', '').replace('EUR', '');
        let qty = button.parentElement.parentElement.querySelector('input').value;
        price = parseInt(price);
        qty = parseInt(qty);
        price *= qty;

        let productContainer = document.createElement('div');
        productContainer.classList.add('border-top', 'border-bottom', 'row', 'justify-content-between', 'align-items-center');

        let removeButton = document.createElement('div');
        removeButton.classList.add('col-1');
        let trash = document.createElement('i');
        trash.classList.add('bi', 'bi-trash', 'remove-item');
        removeButton.appendChild(trash);

        let productName = document.createElement('div');
        productName.classList.add('text-muted', 'product-name', 'col-7');
        productName.textContent = name;

        let productCost = document.createElement('div');
        productCost.classList.add('cost', 'col-4', 'text-end');
        productCost.textContent = price + " EUR";

        productList.appendChild(productContainer);
        productContainer.appendChild(removeButton);
        productContainer.appendChild(productName);
        productContainer.appendChild(productCost);

        console.log(price);
        total += parseInt(price);


        let removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                let product = button.parentElement.parentElement;
                let productPrice = parseInt(button.parentElement.parentElement.querySelector(".cost").textContent.replace(' ', '').replace('EUR', ''));
                console.log(productPrice);
                productList.removeChild(product);
                total -= parseInt(productPrice);
                totalCost.textContent = total + " EUR";
            })
        })

        totalCost.textContent = total + " EUR";
    });
})


// SCROLLING
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
    window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
    window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
    window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
    window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  }
  
  // call this to Enable
  function enableScroll() {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
    window.removeEventListener('touchmove', preventDefault, wheelOpt);
    window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
  }
