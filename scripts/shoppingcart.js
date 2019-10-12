//code to check if the cart has been populated or not
let priceAmount = document.getElementById("CartTotal");
if (priceAmount === "Total=") {
  alert("You have not added any items to the cart yet");
}
/*code below checks to see if the page content has loaded. 
if it has, it runs a ready function which has all the
code for button functionality in it, for a better user experience*/
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//Ready function below which has all the loops for buttons
function ready() {
  /*the loop below will loop through all the remove buttons inside the cart, 
      add a click event to that button, which will then call the removecartitem function */
  let removeCartItembuttons = document.getElementsByClassName("Removebtn");
  for (i = 0; i < removeCartItembuttons.length; i++) {
    let button = removeCartItembuttons[i];
    button.addEventListener("click", removecartitem);
  }
  /*the loop below will loop through all the input value inside
  the cart, and a change event is added, which will call the quantitychanged function*/
  let quantityinputs = document.getElementsByClassName("cart-quantity-input");
  for (i = 0; i < quantityinputs.length; i++) {
    let input = quantityinputs[i];
    input.addEventListener("change", quantitychanged);
  }
}
/*Below is the code needed to block the user from opting 
to buy 0 or a negative value of a specific item*/
function quantitychanged(event) {
  input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  UpdateCartTotal();
}
/*below is the function that allows the user to remove a cart item 
that he/she is not interested in buying anymore*/
function removecartitem() {
  let buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  //remove specific item from localstorage
  let deleteitemname = buttonclicked.parentElement.parentElement.childNodes[1].lastElementChild.innerText;
  let itemsadded = JSON.parse(localStorage.getItem("item"));
  const newlist = itemsadded.filter((value, index, arr) => {
    return value.name !== deleteitemname;
  })
  localStorage.setItem("item", JSON.stringify(newlist))
  UpdateCartTotal();
}

/*Below is the code needed to change the total value of all 
the items currently in the cart*/
function UpdateCartTotal() {
  var total = 0;
  let cartItemcontainer = document.getElementById("cartTable");
  let cartrows = cartItemcontainer.getElementsByClassName("cartrow");
  for (i = 0; i < cartrows.length; i++) {
    cartrow = cartrows[i];
    let priceElement = cartrow.getElementsByClassName("CartRowPrice")[0];
    let quantityElement = cartrow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    /*parseFloat method is used to convert the prices inside the cart to number so that the
      prices can be mulitiplied by the quanity without an undefined value being returned*/
    let price = parseFloat(priceElement.innerText.replace("R", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  /*code below is needed to round totals off to the nearest 2 decimal point,
    so that users do not have to get a total amount that has 3 decimal points or more*/
  total = Math.round(total * 100) / 100;
  let sumofitems = document.getElementById("CartTotal");
  sumofitems.innerText = "R" + total;
}
/*loop for local storage
converted stringified array stored in local storage back into a 
valid javascript data type, then looped through all the data so it
can be used in the cart page*/
let newArray = JSON.parse(localStorage.getItem("item"));
for (let i = 0; i < newArray.length; i++) {
  let price = newArray[i].amount;
  let imagesrc = newArray[i].src;
  let name = newArray[i].name;
  /*all the variables assigned in this loop is passed to the
  ItemAdded function because the let keyword used to assign the variable
  is block scope limiting it to this block of code*/
  itemAdded(price, imagesrc, name);
  UpdateCartTotal();
}
/*code to to insert items in the cart from info retrieved from localstorage
via the loop*/
function itemAdded(price, imagesrc, name) {
  let table = document.getElementById("cartTable");
  let newitem = document.createElement("tr");
  newitem.className = "cartrow";
  newitem.innerHTML = `
            <td id="cartrowitems" class="CartRowItems">
              <img
                class="itemimage"
                src="${imagesrc}"
                alt="Unable to load"
              /><p>${name}</p></td>
            <td class="CartRowPrice">${price}</td>
            <td class="CartRowQuantity">
              <input onchange="quantitychanged(event)" class="cart-quantity-input" type="number" value="1" />
              <button onclick="removecartitem()" class="Removebtn">Delete</button>
            </td>
          `;
  table.appendChild(newitem);
}
/*code blocking user to use the purchase button without 
any items in the cart*/
function onpurchase() {
  if (document.getElementById("CartTotal").innerText === "R0") {
    alert("Your cart is empty!");
  } else {
    document.getElementById("collectOrDeliverform").style.display = "block";
  }
}
/*code used to check whether user has chosen to collect items 
or have it delivered instead*/
function C_or_D() {
  let collection = document.getElementById("Collection");
  let delivery = document.getElementById("delivery");
  if (collection.checked == true) {
    document.getElementById("collectOrDeliverform").style.display = "none";
    document.getElementById("discount").style.display = "block";
  } else if (delivery.checked == true) {
    document.getElementById("collectOrDeliverform").style.display = "none";
    document.getElementById("deliverydetailsform").style.display = "block";
  } else {
    alert("Please select your delivery option");
    let button = document.getElementById("discountbtn");
    button.type = "button";
  }
}
//code for cancelling discount coupon
function discountcouponcancelled() {
  document.getElementById("discount").style.display = "none";
  document.getElementById("confirm_OrderCouponExcluded").style.display =
    "block";
}
//Code to grant user a discount coupon for subcribing
function discountforcoupon() {
  document.getElementById("discount").style.display = "none";
  document.getElementById("confirm_OrderCouponincluded").style.display =
    "block";
  event.preventDefault();
}
//code in case user doesnt't want to have their items delivered
function backtocollectordeliv() {
  document.getElementById("deliverydetailsform").style.display = "none";
  document.getElementById("collectOrDeliverform").style.display = "block";
}
//code to display discount form after filling out delivery details
function displaycoupon() {
  document.getElementById("deliverydetailsform").style.display = "none";
  document.getElementById("discount").style.display = "block";
  event.preventDefault();
}
//code for confirm order button, which displays the price excluding discount
let endoftransactionprice = document.getElementById("CartTotal").innerText;
document.getElementById("newh3forprice2").innerText =
  "Your total is " + endoftransactionprice + " Excluding discount";
//code for confirm order button, which displays the price excluding discount
let allitemsAddedprice = document
  .getElementById("CartTotal")
  .innerText.replace("R", "");
let twentypercDisc = allitemsAddedprice * 0.2;
document.getElementById("newh3forprice").innerText =
  "Your total is R" +
  Number(allitemsAddedprice - twentypercDisc) +
  " Including discount";

//function for comfirm order functionality, for a discount inculded
function CouponExcluded() {
  let allitemsAddedprice = document.getElementById("CartTotal").innerText;
  //Data stored in variable below used to generate a random number for reference.
  let randomNumberGenerate = Math.floor(Math.random() * 100);
  alert(
    "Thank you for Shopping with us, your order was a success. Your total is " +
      allitemsAddedprice +
      ". Your reference number is: " +
      randomNumberGenerate
  );
  /*code below will delete the cart data transferred from pruducts page
  because user has completed the sale.*/
  window.localStorage.removeItem("item");
  document.location.reload();
}
//code in case user has cancelled their order
function ordercancelled() {
  document.location.reload();
}
//function for comfirm order functionality, for a discount excluded
function CouponIncluded() {
  let allitemsAddedprice = document
    .getElementById("CartTotal")
    .innerText.replace("R", "");
  let twentypercDisc = allitemsAddedprice * 0.2;
  //Data stored in variable below used to generate a random number for reference.
  let randomNumberGenerate = Math.floor(Math.random() * 100);
  alert(
    "Your order was a success. Your new total, including your discount is R" +
      (allitemsAddedprice - twentypercDisc) +
      ". Your reference number is: " +
      randomNumberGenerate
  );
  /*code below will delete the cart data transferred from pruducts page
  because user has completed the sale.*/
  window.localStorage.removeItem("item");
  document.location.reload();
}
