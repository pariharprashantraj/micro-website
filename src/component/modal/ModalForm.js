import React, { useState } from "react";
import axios from "axios";
import "./ModalForm.css"; // Import your custom styles

const countryCodes = [
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  // Add more country codes as needed
];

const ModalForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+91");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://google-node.onrender.com/submit", {
        name,
        email,
        phone: `${countryCode} ${phone}`,
      });
      console.log("Form submitted successfully!");
      onClose(); // Close modal on submit
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-form-layout">
          {/* Left Content */}
          <div className="modal-container">
            <div className="form-left">
              <h3>We Promise</h3>
              <ul>
                <li>Instant Call Back</li>
                <li>Free Site Visit</li>
                <li>Best Price</li>
              </ul>
            </div>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <div className="phone-input">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      {countryCodes.map((code) => (
                        <option key={code.code} value={code.code}>
                          {code.flag} {code.country} ({code.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                <div className="centered">
                  <button type="submit" className="submit-button">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            {/* Right Content */}
            <div className="form-right">
              <h3>Get Information On Availability</h3>
              <ul>
                <li>Available Units</li>
                <li>Payment Plan</li>
                <li>Floor Plan</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Contact */}
        <div className="modal-footer">
          <a href="tel:+918989098296" className="phone-link">
            📞 +91 8989098296
          </a>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
