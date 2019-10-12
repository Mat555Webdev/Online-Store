/*code below checks to see if the page content has loaded 
if it has, it runs a ready function which has all the
code for button functionality in it, for a better user experience*/
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
//Ready function below which has all the loops for buttons
function ready() {
  /*the loop below will loop through all the addtocart buttons in the catalogue page, 
    add a click event to that button, which will then call the addtocartclicked function */
  let addTocartbtns = document.getElementsByClassName("addToCartbtn");
  for (i = 0; i < addTocartbtns.length; i++) {
    let button = addTocartbtns[i];
    button.addEventListener("click", addtocartclicked);
  }
}
//below is the code needed to get all the details of the selected item in the catalogue page
function addtocartclicked(event) {
  let button = event.target;
  let shopitem = button.parentElement.parentElement;
  let imageSrc = shopitem.getElementsByClassName("itemimage")[0].src;
  let title = shopitem.getElementsByClassName("itemname")[0].innerText;
  let price = shopitem.getElementsByClassName("itemprice")[0].innerText;
  /*all the variables assigned in this function is passed to the
  itemAddedtocart function because the let keyword used to assign the variable
  is block scope, limiting it to this block of code*/
  itemAddedtocart(imageSrc, title, price);
}
//Empty array created, which will be used to store information
let myShopItems = [];
function itemAddedtocart(imageSrc, title, price) {
  //Object created that will store info of the specific item the user chooses
  let item = { src: `${imageSrc}`, name: `${title}`, amount: `${price}` };
  if (window.localStorage.item === undefined) {
    myShopItems.push(item);
    /*Code to add the total of all the items chosen so far,and
    display it as an alert*/
    let mytotal = 0;
    let cartTotal = [0];
    for (i = 0; i < myShopItems.length; i++) {
      mytotal += Number(myShopItems[i].amount.replace("R", " "));
      cartTotal.push(mytotal);
    }
    let lastvalue = cartTotal[cartTotal.length - 1];
    alert("The total value of your cart is R" + lastvalue);
    /*Array is stored in local storage using the setItem method,
    also converted to text using JSON.stringify*/
    localStorage.setItem("item", JSON.stringify(myShopItems));
  } else {
    let items = JSON.parse(localStorage.getItem("item"));
    /*loop and if conditional used to stop a user from adding more
  than one of the same item*/
    for (i = 0; i < items.length; i++) {
      if (item.src == items[i].src) {
        alert("this item has already been added to your cart");
        return;
      }
    }
    items.push(item);
    console.log(items);
    let mytotal = 0;
    let cartTotal = [0];
    for (i = 0; i < items.length; i++) {
      mytotal += Number(items[i].amount.replace("R", " "));
      cartTotal.push(mytotal);
    }
    let lastvalue = cartTotal[cartTotal.length - 1];
    alert("The total value of your cart is R" + lastvalue);
    /*Array is stored in local storage using the setItem method,
    also converted to text using JSON.stringify*/
    localStorage.setItem("item", JSON.stringify(items));
  }
}
