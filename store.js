if(document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    //remove
	const removeCartItemBtn = document.querySelectorAll(".btn-danger");
	removeCartItemBtn.forEach((n) => n.addEventListener("click", removeCartItem));

    //quantity
    const quantityInput = document.querySelectorAll(".cart-quantity-input");
    quantityInput.forEach(n => n.addEventListener("change", quantityChanged));

    //addToCart
    const addToCartBtn = document.querySelectorAll(".shop-item-button");
    addToCartBtn.forEach(n => n.addEventListener("click", addToCartClicked));

    //purchase
    document.querySelector(".btn-purchase").addEventListener("click", purchaseClicked);
}

//【RemoveItems】
function removeCartItem(e) {
	e.target.parentNode.parentNode.remove();
	updateCartTotal();
    updateQuantityTotal();
}


//【QuantityInputChanged】
function quantityChanged(e) {
	if (isNaN(e.target.value) || e.target.value <= 0) {
		e.target.value = 1;
	}
	updateCartTotal();
    updateQuantityTotal();
}


//【AddItemsIntoCart】
//選取items(點擊shop item btn)
function addToCartClicked(e) {
    const shopItem = e.target.parentNode.parentNode;
    const imageSrc = shopItem.querySelector(".shop-item-image").src;
    const title = shopItem.querySelector(".shop-item-title").textContent;
    const price = shopItem.querySelector(".shop-item-price").textContent;

    addItemToCart(imageSrc, title, price);
    updateCartTotal();
    updateQuantityTotal();
}
//將新items放進去cart
function addItemToCart(imageSrc, title, price) {
    const cartRow = document.createElement("div");
    const cartItems = document.querySelector(".cart-items");

    //判斷選取項目是否之前已放進cart中過
    const cartItemNames = document.querySelectorAll(".cart-item-title");

    //這邊不能使用forEach，因為forEach無法中斷行為
    for(let i = 0; i < cartItemNames.length; i++) {
        if(cartItemNames[i].textContent == title) {
            alert("This item is already added to the cart.");
            return
        }
    }
    const cartRowContents = `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input type="number" class="cart-quantity-input" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);

    //remove btn在前面DOM完成後便先設定好，新的cart-item則沒有這個功能，因此這邊要重新再設定
    cartRow.querySelector(".btn-danger").addEventListener("click", removeCartItem);
    cartRow.querySelector(".cart-quantity-input").addEventListener("change", quantityChanged);
}
//【Quantity Amount】
function updateQuantityTotal() {
    const cartItemContainer = document.querySelector(".cart-items");
	const cartRows = cartItemContainer.querySelectorAll(".cart-row");
    var quantityAmount = 0;

    //not work
    //cart不會歸零
    if(cartItemContainer.hasChildNodes()) {
        for (let i = 0; i < cartRows.length; i++) {
			const cartRow = cartRows[i];
			const quantity = cartRow.querySelector(".cart-quantity-input").value;
			quantityAmount = quantityAmount + Number(quantity);
            document.querySelector(".cart-quantity").textContent = quantityAmount;
			console.log(quantityAmount);
		}
    }else {
        document.querySelector(".cart-quantity").textContent = 0;
    }
}

//【UpdateTotal】
function updateCartTotal() {
    const cartItemContainer = document.querySelector(".cart-items");
    const cartRows = cartItemContainer.querySelectorAll(".cart-row");
    var total = 0;
    for(let i = 0; i < cartRows.length; i++) {
        const cartRow = cartRows[i];
        const price = cartRow.querySelector(".cart-price").textContent.replace("$","");
        const quantity = cartRow.querySelector(".cart-quantity-input").value;
        total = total + price * quantity;
    }
    total = Math.round(total*100)/100;
    //total*100是為了保留小數點的後兩位數
    document.querySelector(".cart-total-price").textContent = "$"+ total;
}

//【Purchase Btn】
function purchaseClicked() {
    alert("Thank your for your purchase.")
    const cartItems = document.querySelector(".cart-items");
    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    updateQuantityTotal();
}
