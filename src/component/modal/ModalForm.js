import React, { useState } from "react";
import axios from "axios";
import "./ModalForm.css"; // Create a CSS file for modal styles

const ModalForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://google-node.onrender.com/submit",
        {
          name,
          email,
          phone,
        }
      );
      console.log(response.data); // Handle success
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Contact Us</h2>
        {/* <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+1">+1 (USA)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+91">+91 (India)</option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;
