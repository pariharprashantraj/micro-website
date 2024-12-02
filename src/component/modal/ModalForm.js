import React, { useState } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./ModalForm.css";
import { FcCustomerSupport } from "react-icons/fc";
import { FaCar } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { GiMoneyStack } from "react-icons/gi";
import { LuMap } from "react-icons/lu";

const ModalForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      await axios.post("https://google-node.onrender.com/submit", {
        name,
        email,
        phone,
      });
      setStatusMessage(
        "Thanks for contacting us. We shall get back to you shortly."
      );
    } catch (error) {
      setStatusMessage("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-form-layout">
          {/* Left Content */}
          <div className="form-left">
            <h3 className="centerd-text side-header">We Promise</h3>
            <div className="centered flex-column option">
              <FcCustomerSupport className="large-icon" />
              <div className="centerd-text">Instant Call Back</div>
            </div>
            <div className="centered flex-column option">
              <FaCar className="large-icon" />
              <div className="centerd-text">Free Site Visit</div>
            </div>
            <div className="centered flex-column option">
              <RiMoneyRupeeCircleFill className="large-icon" />
              <div className="centerd-text">Best Price</div>
            </div>
          </div>

          {/* Form Container */}
          <div className="form-container">
            <h1 className="project-title form-header">KALYANI</h1>
            {statusMessage ? (
              <p className="status-message">{statusMessage}</p>
            ) : (
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
                <PhoneInput
                  country={"in"}
                  value={phone}
                  onChange={setPhone}
                  inputStyle={{
                    width: "100%",
                    borderRadius: "5px",
                    padding: "10px",
                  }}
                  required
                />
                <button
                  type="submit"
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Pre-Register Now"}
                </button>
              </form>
            )}
          </div>

          {/* Right Content */}
          <div className="form-right">
            <h3 className="centerd-text side-header right-header">
              Get Information On Availability
            </h3>

            <div className="centered flex-row option option-right">
              <SiTicktick className="small-icon" />
              <div className="centerd-text">Available Units</div>
            </div>
            <div className="centered flex-row option">
              <GiMoneyStack className="small-icon" />
              <div className="centerd-text">Payment Plan</div>
            </div>
            <div className="centered flex-row option">
              <LuMap className="small-icon" />
              <div className="centerd-text">Floor Plan</div>
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
