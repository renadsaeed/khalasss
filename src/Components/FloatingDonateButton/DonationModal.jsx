import React, { useState } from "react";
import "./DonationModal.css";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51RZ3hdDA4Wy2GWeknjsiBCPURn8YHuPDx0TFOKYdYuKzUcW78UUvxF9x2VgnSxCN0LSl01jn8jXAwboCBuBrhcLZ009AOVHDdr"
);

const DonationModal = ({ isOpen, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = [10, 50, 100];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount("");
  };

  const handleDonate = async () => {
    const amount = selectedAmount || customAmount;

    if (!amount) {
      alert("يرجى اختيار أو إدخال مبلغ التبرع.");
      return;
    }

    const stripe = await stripePromise;

    try {
      const response = await fetch(
        "https://waslalkhair.runasp.net/api/Payments/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        }
      );

      const data = await response.json();

      if (data.stripeSessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.stripeSessionId,
        });
        if (error) {
          console.error("Stripe Checkout Error:", error);
          alert("حدث خطأ أثناء التوجيه للدفع.");
        }
      } else {
        console.error("Invalid response from server:", data);
        alert("حدث خطأ أثناء معالجة التبرع.");
      }
    } catch (error) {
      console.error("Error creating payment session:", error);
      alert("حدث خطأ أثناء التبرع. يرجى المحاولة لاحقاً.");
    }
  };
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="donation-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h2 className="donation-title">تبرع سريع</h2>
        </div>

        <div className="modal-content">
          {/* Amount Selection */}
          <div className="amount-selection">
            <div className="predefined-amounts">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  className={`amount-btn ${
                    selectedAmount === amount ? "selected" : ""
                  }`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  {amount} ج.م
                </button>
              ))}
            </div>

            <div className="custom-amount">
              <input
                type="number"
                placeholder="مبلغ التبرع"
                value={customAmount}
                onChange={handleCustomAmountChange}
                className="amount-input"
              />
              <span className="currency">ج.م</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="donation-info">
            <div className="info-item">
              <span className="info-icon">ℹ️</span>
              <span>سيذهب تبرعك تلقائياً للحالات الأشد احتياجاً</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <div className="payment-icons">
              <div className="payment-icon mada">mada</div>
              <div className="payment-icon mastercard">MC</div>
              <div className="payment-icon apple-pay">Apple Pay</div>
              <div className="payment-icon visa">VISA</div>
            </div>
          </div>

          {/* Donate Button */}
          <button className="donate-button" onClick={handleDonate}>
            تبرع الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
