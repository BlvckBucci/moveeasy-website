import { supabase } from "./supabaseClient";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

const totalPrice = cart.reduce((total, item) => total + item.price, 0); //here we are setting the value of the cart


//BELOW IS AN ASYNC FUNCTION THAT SENDS A POST REQUEST TO THE DATABASE TABLE 'subscribers' to INSERT THE NAME AND EMAIL INPUTED BY THE CUSTOMER
async function handleSubmit(e) {
  
  e.preventDefault();

  const { error } = await supabase
    .from("subscribers")
    .insert([
      {
        name: name,
        email: email
      }
    ]);

  if (error) {
    alert("Something went wrong");
    console.log(error);
  } else {
    alert("Welcome to Moveeasy!");
    setName("");
    setEmail("");
  }
}
function addToCart(product) {
  setCart([...cart, product]);
  alert(`${product.name} added to cart`);
  
}

//BELOW IS AN ASYNC FUNCTION THAT SENDS A POST REQUEST TO THE DATABASE TABLE 'orders' to INSERT THE DETAILS INPUTED BY THE CUSTOMER
//ORDER DETAILS
async function placeOrder(e) {
  e.preventDefault();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const { error } = await supabase
    .from("orders")
    .insert([
      {
        customer_name: customerName,
        phone: phone,
        address: address,
        items: cart,
        total: total
      }
    ]);

  if (error) {
  alert(error.message);
  console.log(error);

  } else {
    alert("Order placed successfully!");
    setCart([]);
    setCustomerName("");
    setPhone("");
    setAddress("");
    setPage("home");
  }

  const formatPrice = (price) =>
  price.toLocaleString("en-NG");
}


  
    return (
<div className="container">

<nav className="navbar">
   <h1 className="logo" onClick={() => setPage("home")}>
  MOVEEASY
</h1>
<button className="shop-btn" onClick={() => setPage("shop")}>
  Shop Now 
</button>

<button
  className="shop-btn"
  onClick={() => setPage("cart")}
>
  Cart ({cart.length})
</button>
</nav>

{page === "home" && (
<>
<section className="hero">
 <h1>Move Freely.</h1>
        <p>Minimal fashion designed for comfort and movement</p>
        <button
  className="explore-btn"
  onClick={() => setPage("shop")}
>
  Explore Collection
</button>
</section>

<section className="collection">
 <h2>New Collection</h2>

        <div className="products">
          <div className="product-card">
           <img src={heroImg} className="product-image" />
            <h3>Moveeasy Essential Hoodie</h3>
            <p>₦45,000</p>
          </div>

          <div className="product-card">
            <img src={viteLogo} className="product-image" />
            <h3>Moveeasy Comfort Joggers</h3>
            <p>₦38,000</p>
          </div>

          <div className="product-card">
           <img src={reactLogo} className="product-image" />
            <h3>Moveeasy Minimal Tee</h3>
            <p>₦22,000</p>
          </div>
        </div>
</section>

<section className="signup">
 <h2>Join the Moveeasy List</h2>
  <p>Be the first to know when new pieces drop.</p>

    <form className="signup-form" onSubmit={handleSubmit}>
<input
  type="text"
  placeholder="Your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="email"
  placeholder="Your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
    <button type="submit">Join Now</button>
  </form>
</section>
</>
)}
{page === "shop" && (
  <section className="shop-page">
    <h2>Shop Moveeasy</h2>
    <p>Explore our latest minimal comfort pieces.</p>

    <div className="products">
      <div className="product-card">
        <img src={heroImg} className="product-image" />
        <h3>Moveeasy Essential Hoodie</h3>
        <p>₦45,000</p>
       <button
  className="cart-btn"
  onClick={() =>
    addToCart({
      name: "Moveeasy Essential Hoodie",
      price: 45000
    })
  }
>
  Add to Cart
</button>
      </div>

      <div className="product-card">
        <img src={viteLogo} className="product-image" />
        <h3>Moveeasy Comfort Joggers</h3>
        <p>₦38,000</p>
       <button
  className="cart-btn"
  onClick={() =>
    addToCart({
      name: "Moveeasy Comfort Joggers",
      price: 38000
    })
  }
>
  Add to Cart
</button>
      </div>

      <div className="product-card">
        <img src={reactLogo} className="product-image" />
        <h3>Moveeasy Minimal Tee</h3>
        <p>₦22,000</p>

<button
  className="cart-btn"
  onClick={() =>
    addToCart({
      name: "Moveeasy Minimal Tee",
      price: 22000
    })
  }
>
  Add to Cart
</button>

      </div>
    </div>
  </section>
)}
{page === "cart" && (
  <section className="shop-page">
    <h2>Your Cart</h2>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <>
        {cart.map((item, index) => (
          <div className="product-card" key={index}>
            <h3>{item.name}</h3>
            <p>₦{item.price}</p>

            <button
              onClick={() => {
                setCart(cart.filter((_, i) => i !== index));
              }}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="cart-total">
          <h3>Total: ₦{totalPrice}</h3>
        </div>

        <form className="checkout-form" onSubmit={placeOrder}>
          <input
            type="text"
            placeholder="Full name"
            value={customerName}
            required
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
          
            type="text"
            placeholder="Phone number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="text"
            placeholder="Delivery address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="checkout-btn" type="submit">
            Place Order
          </button>
        </form>
      </>
    )}
  </section>
)}
<footer className="footer">
  <div className="footer-content">
    <h2 className="footer-logo">MOVEEASY</h2>

    <p className="footer-text">
      Minimal fashion designed for comfort and movement.
    </p>

    <div className="footer-links">
      <a href="#">Home</a>
      <a href="#">Shop</a>
      <a href="#">About</a>
      <a href="#">Contact</a>
    </div>

    <div className="footer-socials">
    

      <a
        href="https://tiktok.com/@blvck_b1"
        target="_blank"
        rel="noreferrer"
      >
        TikTok
      </a>

      <a
        href="https://wa.me/09023191346"
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </div>

    <p className="copyright">
      © {new Date().getFullYear()} Moveeasy. All rights reserved.
    </p>
  </div>
</footer>
</div>

  )
}

export default App;