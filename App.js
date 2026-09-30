// App.js
import React, { useState } from "react";
import "./App.css";

function App() {
  const [menu] = useState([
    { name: "Greek Salad", price: 12.99, description: "Crispy lettuce, peppers, olives, and feta." },
    { name: "Bruschetta", price: 7.99, description: "Grilled bread with garlic and tomatoes." },
    { name: "Grilled Fish", price: 20.0, description: "Catch of the day with capers and creme fraiche." },
    { name: "Pasta", price: 18.99, description: "Penne with aubergines, tomato sauce, and basil." },
    { name: "Lemon Dessert", price: 6.99, description: "Fluffy ricotta cake with lemon." }
  ]);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notifications: {
      orderStatus: false,
      passwordChanges: false,
      specialOffers: false,
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProfile((prev) => ({
        ...prev,
        notifications: { ...prev.notifications, [name]: checked },
      }));
    } else {
      setProfile((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile saved: " + JSON.stringify(profile, null, 2));
  };

  return (
    <div className="App">
      <header>
        <h1>Little Lemon</h1>
        <h3>Chicago</h3>
        <p>
          We are a family owned Mediterranean restaurant, focused on traditional
          recipes served with a modern twist.
        </p>
      </header>

      <section>
        <h2>ORDER FOR DELIVERY!</h2>
        {menu.map((item, index) => (
          <div key={index} className="menu-item">
            <h3>{item.name} - ${item.price}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </section>

      <section>
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <label>
            First Name:
            <input type="text" name="firstName" value={profile.firstName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="lastName" value={profile.lastName} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type="tel" name="phone" value={profile.phone} onChange={handleChange} />
          </label>
          <br />

          <h3>Email Notifications</h3>
          <label>
            <input
              type="checkbox"
              name="orderStatus"
              checked={profile.notifications.orderStatus}
              onChange={handleChange}
            />
            Order statuses
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="passwordChanges"
              checked={profile.notifications.passwordChanges}
              onChange={handleChange}
            />
            Password changes
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="specialOffers"
              checked={profile.notifications.specialOffers}
              onChange={handleChange}
            />
            Special offers
          </label>
          <br />

          <button type="submit">Save Profile</button>
        </form>
      </section>
    </div>
  );
}

export default App;
