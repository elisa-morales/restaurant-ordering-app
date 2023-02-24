import { menuArray } from './data.js'

const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
const card = document.getElementById('card-details')

let order = []

document.addEventListener("click", function(e) {
    if (e.target.dataset.id) {
        addItemToCart(e.target.dataset.id)        
    } else if (e.target.dataset.remove) {
        removeItemFromCart(e.target.dataset.remove)
    } else if (order.length > 0 && e.target.dataset.btn) {
        card.style.display = 'inline'
    } else if (e.target.dataset.close) {
        card.style.display = 'none'
    }
}) 

document.addEventListener('submit', function(e){
    e.preventDefault()
    
    const cardData = new FormData(document.getElementById('form'))
    const cardName = cardData.get('card-name')
    
    card.style.display = 'none'
    cart.style.display = 'none'
    order = []
    
    document.getElementById("order-coming-message").innerHTML = 
    `<p class='order-message'>Thanks, ${cardName}! Your order is on its way!</p>`
})

function getMenu() {
    let menuHtml = ``
    
    menuArray.forEach(function(item) {
        menuHtml += `
        <div class="item-wrapper">
            <p class="item-emoji">${item.emoji}</p>
            <div class="item-info">
                <p class="item-name">${item.name}</p>
                <p class="item-ingredients">${item.ingredients}</p>
                <p class="">${item.price}</p>
            </div>
            <button class="item-btn" data-id="${item.id}">+</button>
        </div>
        <hr>
        `
    })
    return menuHtml
}

function addItemToCart(itemId) {
    const targetItemObj = menuArray.filter(function(item) {
        return item.id == itemId
    })[0]
    
    order.push(targetItemObj)

    renderCart()
    renderCartItems()
}

function removeItemFromCart(itemIndex) {
    
    order.splice(itemIndex, 1)
    
    renderCart()
    renderCartItems()
}

function getCart() {
    
    let cartHtml = `
            <h3>Your order</h3>
            <div id="cart-items"></div>
            <hr>
            <div class="cart-total-price">
            <div class="cart-total">Total price:</div>
            <div class="cart-total-amount" id="cart-total-amount"></div>
            </div>
            <button id="cart-btn" data-btn="button">Complete order</button>
            ` 
    return cartHtml
}


function renderCartItems() {
    order.forEach(function(item, index) {
       document.getElementById('cart-items').innerHTML += `
       <div class="cart-single-item">
       <div class="item-name">${item.name}
       <p class="remove-item" data-remove="${index}">remove</p>
       </div>
       <p class="item-price">$ ${item.price}</p>
       </div>
       ` 
   })
   renderTotal()
}

function renderTotal() {
    let prices = 0
    order.forEach(function(item) {
        prices += item.price
    })
    document.getElementById('cart-total-amount').textContent = '$' + ' ' + prices
}


function render() {
    menu.innerHTML = getMenu()
}

function renderCart() {
    cart.innerHTML = getCart()
}

render()

