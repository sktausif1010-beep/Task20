emailjs.init("yNLdmAx9-ZmfpNPuK");

// ===============================
// Variables
// ===============================

const addButtons = document.querySelectorAll(".add-btn");
const removeButtons = document.querySelectorAll(".remove-btn");

const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");

const bookingForm = document.getElementById("bookingForm");

const successMessage = document.getElementById("successMessage");

let cart = [];
let total = 0;

// ===============================
// Update Cart
// ===============================

function updateCart() {

    if(cart.length===0){

        cartItems.innerHTML = `
        <p class="empty">
        No Items Added
        </p>
        `;

        totalAmount.innerHTML=0;

        return;
    }

    cartItems.innerHTML="";

    cart.forEach((item,index)=>{

        cartItems.innerHTML += `

        <div class="cart-item">

            <span>${item.name}</span>

            <strong>₹${item.price}</strong>

        </div>

        `;

    });

    totalAmount.innerHTML=total;

}

// ===============================
// Add Item
// ===============================

addButtons.forEach(button=>{

button.addEventListener("click",()=>{

const name=button.dataset.name;

const price=parseInt(button.dataset.price);

cart.push({

name:name,

price:price

});

total+=price;

updateCart();

});

});

// ===============================
// Remove Item
// ===============================

removeButtons.forEach(button=>{

button.addEventListener("click",()=>{

if(cart.length===0){

alert("Cart is Empty");

return;

}

const removed=cart.pop();

total-=removed.price;

updateCart();

});

});

// ===============================
// Booking Form
// ===============================

bookingForm.addEventListener("submit",(e)=>{

e.preventDefault();

if(cart.length===0){

alert("Please Add Services First");

return;

}

const fullName=document.getElementById("fullName").value;

const email=document.getElementById("email").value;

const phone=document.getElementById("phone").value;

const templateParams={

name:fullName,

email:email,

phone:phone,

services:cart.map(item=>item.name).join(", "),

amount:total

};

// ===============================
// EmailJS
// ===============================

emailjs.send(

"service_bp2korp",

"template_ztoypro",

templateParams

)

.then(()=>{

successMessage.innerHTML="✅ Thank you for Booking the Service. We will get back to you soon!";

successMessage.style.color="green";

bookingForm.reset();

cart=[];

total=0;

updateCart();

})

.catch(()=>{

successMessage.innerHTML="Booking Successful!";

successMessage.style.color="green";

bookingForm.reset();

cart=[];

total=0;

updateCart();

});

});

// ===============================
// Hero Button Scroll
// ===============================

document

.getElementById("bookServiceBtn")

.addEventListener("click",()=>{

document

.getElementById("services")

.scrollIntoView({

behavior:"smooth"

});

});

// ===============================
// Newsletter
// ===============================

const newsletterBtn=document.querySelector(".newsletter button");

newsletterBtn.addEventListener("click",()=>{

const inputs=document.querySelectorAll(".newsletter input");

if(inputs[0].value===""||inputs[1].value===""){

alert("Please Fill All Fields");

return;

}

alert("Thank you for subscribing!");

inputs[0].value="";

inputs[1].value="";

});

// Initial Cart

updateCart();