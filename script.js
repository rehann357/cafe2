const menu = [
  {cat:"Chinese",name:"Veg Fried Rice",price:11},{cat:"Chinese",name:"Egg Fried Rice",price:12},
  {cat:"Chinese",name:"Chicken Fried Rice",price:13},{cat:"Chinese",name:"Prawn Fried Rice",price:17},
  {cat:"Chinese",name:"Mixed Fried Rice",price:18},{cat:"Chinese",name:"Chicken Chilli",price:16},
  {cat:"Chinese",name:"Chicken Manchurian",price:16},{cat:"Chinese",name:"Fried Crispy Chicken",price:17},
  {cat:"Chinese",name:"Garlic Chicken",price:17},{cat:"Chinese",name:"Ginger Chicken",price:17},
  {cat:"Nepali",name:"Chicken MoMo - Steam",price:13},{cat:"Nepali",name:"Chicken MoMo - Kothe",price:16},
  {cat:"Nepali",name:"Chicken MoMo - Fried",price:16},{cat:"Nepali",name:"Chicken MoMo - Jhol",price:16},
  {cat:"Nepali",name:"Buff MoMo - Steam",price:19},{cat:"Nepali",name:"Buff MoMo - Jhol",price:19},
  {cat:"Nepali",name:"Veg MoMo - Steam",price:12},{cat:"Nepali",name:"Chowmin Chicken",price:15},
  {cat:"Nepali",name:"Chowmin Veg",price:12},{cat:"Nepali",name:"Thukpa Veg",price:14},
  {cat:"Burgers",name:"Chicken Burger",price:7},{cat:"Burgers",name:"Chicken Double Burger",price:10},
  {cat:"Burgers",name:"Chicken Lemon Burger",price:10},{cat:"Burgers",name:"Zinker Burger",price:12},
  {cat:"Burgers",name:"Mega Zinker Burger",price:15},{cat:"Burgers",name:"Omelet Burger",price:7},
  {cat:"Burgers",name:"Veg Burger",price:7},{cat:"Burgers",name:"Hot Dog Burger",price:7},
  {cat:"Burgers",name:"Chicken Fillet Burger",price:12},{cat:"Burgers",name:"Nuggets Burger",price:10},
  {cat:"Sandwich",name:"Chicken Paratha Sandwiches",price:5},{cat:"Sandwich",name:"Chicken Chilli Paratha",price:7},
  {cat:"Sandwich",name:"Cheese Sandwich",price:2},{cat:"Sandwich",name:"Vegetable Sandwich",price:3},
  {cat:"Sandwich",name:"Chicken Club",price:13},{cat:"Sandwich",name:"Vegetable Club",price:13},
  {cat:"Shawarma",name:"Chicken Shawarma",price:5},{cat:"Shawarma",name:"Chicken Shawarma Spicy",price:6},
  {cat:"Shawarma",name:"Chicken Shawarma with Cheese",price:6},{cat:"Shawarma",name:"Chicken Shawarma Plate",price:18},
  {cat:"Indian",name:"Daal Fry",price:5},{cat:"Indian",name:"Daal Makhani",price:14},
  {cat:"Indian",name:"Aloo Gobi",price:10},{cat:"Indian",name:"Bhindi Masala",price:13},
  {cat:"Indian",name:"Mutter Paneer",price:14},{cat:"Indian",name:"Chicken Roast",price:15},
  {cat:"Indian",name:"Butter Chicken",price:17},{cat:"Indian",name:"Chicken Curry",price:12},
  {cat:"Biryani",name:"Chicken Biryani / Hyderabadi",price:12},{cat:"Biryani",name:"Egg Biryani",price:10},
  {cat:"Biryani",name:"Chicken Fry Biryani",price:14},{cat:"Biryani",name:"Mutton Biryani",price:15},
  {cat:"Breakfast",name:"Chana Masala with 2 Paratha",price:7},{cat:"Breakfast",name:"Chicken Curry with 2 Paratha",price:10},
  {cat:"Breakfast",name:"Puri Bhaji (2 pcs)",price:8},{cat:"Breakfast",name:"Aloo Paratha",price:3},
  {cat:"Tea & Coffee",name:"Karak Tea",price:1},{cat:"Tea & Coffee",name:"Fresh Milk Tea",price:2},
  {cat:"Tea & Coffee",name:"Suleimani",price:1},{cat:"Tea & Coffee",name:"Black Coffee",price:2},
  {cat:"Tea & Coffee",name:"Turkish Coffee",price:3},{cat:"Soup",name:"Hot N Sour Soup - Chicken",price:12},
  {cat:"Soup",name:"Hot N Sour Soup - Veg",price:9},{cat:"Soup",name:"Manchow Soup - Chicken",price:12},
  {cat:"Snacks",name:"Aloo Samosa",price:1.5},{cat:"Snacks",name:"Chicken Samosa",price:1.5},
  {cat:"Snacks",name:"Veg Samosa",price:1},{cat:"Snacks",name:"Chicken Spring Roll",price:2},
  {cat:"Fresh Juice",name:"Avocado Juice",price:8},{cat:"Fresh Juice",name:"Orange Juice",price:8},
  {cat:"Fresh Juice",name:"Strawberry Juice",price:8},{cat:"Fresh Juice",name:"Mango Juice",price:8},
  {cat:"Chicken Grill",name:"Half Chicken + Kubboos + Hummus + Garlic + Salad",price:17},
  {cat:"Chicken Grill",name:"Full Chicken + Kubboos + Hummus + Garlic + Salad",price:27}
];

let currentCat = "All";
let cart = JSON.parse(localStorage.getItem("akadhCart") || "[]");
let authMode = "login";

const cats = ["All", ...new Set(menu.map(x => x.cat))];
document.getElementById("categories").innerHTML = cats.map(c =>
  `<button class="cat ${c==="All"?"active":""}" onclick="filterMenu('${c.replaceAll("'","\\'")}',this)">${c}</button>`
).join("");

function filterMenu(cat, btn){
  currentCat = cat;
  document.querySelectorAll(".cat").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  renderMenu();
}
function renderMenu(){
  const items = currentCat==="All" ? menu : menu.filter(x=>x.cat===currentCat);
  document.getElementById("menuGrid").innerHTML = items.map((x,i)=>
    `<article class="food-card"><h3>${x.name}</h3><p>${x.cat}</p><div class="price">AED ${x.price.toFixed(2)}</div><button class="add" onclick='addToCart(${JSON.stringify(x)})'>+ Add to Cart</button></article>`
  ).join("");
}
function addToCart(item){
  const found = cart.find(x=>x.name===item.name);
  if(found) found.qty++;
  else cart.push({...item,qty:1});
  saveCart();
  openCart();
}
function saveCart(){
  localStorage.setItem("akadhCart",JSON.stringify(cart));
  document.getElementById("cartCount").textContent = cart.reduce((s,x)=>s+x.qty,0);
  renderCart();
}
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length){box.innerHTML='<p class="muted">Your cart is empty.</p>';document.getElementById("cartTotal").textContent="0.00";return}
  box.innerHTML=cart.map((x,i)=>`<div class="cart-row"><div><b>${x.name}</b><br><small>AED ${x.price.toFixed(2)} each</small></div><div class="qty"><button onclick="changeQty(${i},-1)">−</button> ${x.qty} <button onclick="changeQty(${i},1)">+</button></div><b>AED ${(x.price*x.qty).toFixed(2)}</b></div>`).join("");
  document.getElementById("cartTotal").textContent=cart.reduce((s,x)=>s+x.price*x.qty,0).toFixed(2);
}
function changeQty(i,d){cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);saveCart()}
function openCart(){renderCart();document.getElementById("cartModal").classList.add("show")}
function closeCart(){document.getElementById("cartModal").classList.remove("show")}
function openAuth(){document.getElementById("authModal").classList.add("show")}
function closeAuth(){document.getElementById("authModal").classList.remove("show")}
function toggleAuthMode(){
  authMode=authMode==="login"?"signup":"login";
  document.getElementById("authTitle").textContent=authMode==="login"?"Welcome Back":"Create Account";
  document.getElementById("authSub").textContent=authMode==="login"?"Login to continue your order.":"Create an account for faster ordering.";
  document.getElementById("nameWrap").classList.toggle("hidden",authMode==="login");
  document.getElementById("authSubmit").textContent=authMode==="login"?"Login":"Create Account";
  document.getElementById("switchText").textContent=authMode==="login"?"Don't have an account?":"Already have an account?";
}
function handleAuth(e){
  e.preventDefault();
  const email=document.getElementById("email").value;
  localStorage.setItem("akadhUser",JSON.stringify({email,name:document.getElementById("name").value}));
  alert(authMode==="login"?"Login successful!":"Account created successfully!");
  closeAuth();
}
function checkout(){
  if(!cart.length)return alert("Your cart is empty.");
  if(!localStorage.getItem("akadhUser")){closeCart();openAuth();return}
  const total=cart.reduce((s,x)=>s+x.price*x.qty,0).toFixed(2);
  const text=encodeURIComponent(`Hello Akadh Cafeteria, I want to order:\n${cart.map(x=>`${x.name} x${x.qty}`).join("\n")}\nTotal: AED ${total}`);
  window.open(`https://wa.me/971507502393?text=${text}`,"_blank");
}
function toggleNav(){
  const nav=document.getElementById("nav");
  nav.style.display=nav.style.display==="flex"?"none":"flex";
  nav.style.position="absolute";nav.style.top="76px";nav.style.left="0";nav.style.right="0";
  nav.style.background="#160d0b";nav.style.padding="20px";nav.style.flexDirection="column";
}
renderMenu();saveCart();
