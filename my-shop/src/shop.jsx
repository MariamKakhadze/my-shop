import React, { useState } from "react";

// The data array remains largely the same, but we define it 
// with traditional variable styles
var products = [
  { id: 1, name: "Apple iPhone 15", price: 2799, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400" },
  { id: 2, name: "Samsung Galaxy S24", price: 2299, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400" },
  { id: 3, name: "Sony WH-1000XM5", price: 899, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, name: "Apple MacBook Air", price: 3499, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
  { id: 5, name: "iPad Pro", price: 2199, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
  { id: 6, name: "Nintendo Switch", price: 799, image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400" }
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  // --- FUNCTIONS ---

 
  function addToCart(product) {
    setCart(function (prev) {
      var existing = prev.find(function (item) {
        return item.id === product.id;
      });

      if (existing) {
        return prev.map(function (item) {
          if (item.id === product.id) {
            return Object.assign({}, item, { qty: item.qty + 1 });
          } else {
            return item;
          }
        });
      }

      
      var newProduct = Object.assign({}, product, { qty: 1 });
      return prev.concat([newProduct]);
    });
  }

 
  function removeFromCart(id) {
    setCart(function (prev) {
      return prev.filter(function (item) {
        return item.id !== id;
      });
    });
  }

 
  var filtered = products.filter(function (p) {
    var productName = p.name.toLowerCase();
    var searchTerm = search.toLowerCase();
    return productName.indexOf(searchTerm) !== -1;
  });

  
  var totalQty = cart.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);

  var totalPrice = cart.reduce(function (sum, item) {
    return sum + (item.price * item.qty);
  }, 0);

 

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem", fontFamily: "sans-serif" }}>
      <h1>Online Shop</h1>

      <input
        type="text"
        placeholder="პროდუქტის ძებნა..."
        value={search}
        onChange={function (e) {
          setSearch(e.target.value);
        }}
        style={{ width: "100%", padding: "8px 12px", marginBottom: "1rem", fontSize: 14 }}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: "1rem" }}>
          {filtered.length === 0 ? (
            <p>პროდუქტი ვერ მოიძებნა</p>
          ) : (
            filtered.map(function (product) {
              return (
                <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden" }}>
                  <img src={product.image} alt={product.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
                  <div style={{ padding: "10px 12px" }}>
                    <p style={{ fontWeight: 500, marginBottom: 4 }}>{product.name}</p>
                    <p style={{ marginBottom: 10 }}>₾{product.price.toLocaleString()}</p>
                    <button
                      onClick={function () {
                        addToCart(product);
                      }}
                      style={{ width: "100%", padding: "7px 0", cursor: "pointer" }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div style={{ border: "1px solid #ddd", borderRadius: 8, padding: "1rem" }}>
          <h2>კალათა ({totalQty})</h2>

          {cart.length === 0 ? (
            <p style={{ color: "#888", marginTop: "1rem" }}>კალათა ცარიელია</p>
          ) : (
            <div>
              {cart.map(function (item) {
                return (
                  <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid #eee" }}>
                    <div>
                      <p style={{ fontWeight: 500, fontSize: 13 }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: "#666" }}>
                        ₾{(item.price * item.qty).toLocaleString()} | რაოდ.: {item.qty}
                      </p>
                    </div>
                    <button
                      onClick={function () {
                        removeFromCart(item.id);
                      }}
                      style={{ color: "red", background: "none", border: "none", cursor: "pointer" }}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}

              <div style={{ marginTop: "1rem", borderTop: "1px solid #eee", paddingTop: "0.75rem" }}>
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>სულ პროდუქტი:</span><strong>{totalQty}</strong>
                </p>
                <p style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span>ჯამი:</span><strong>₾{totalPrice.toLocaleString()}</strong>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;