import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { simulatePayment, initiatePayment } from "../../features/payment/paymentSlice";

const PaymentSimulation = ({ orderId, onPaymentSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error, paymentStatus } = useSelector((state) => state.payment);
  const [paymentMethod, setPaymentMethod] = useState("simulate");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSimulatePayment = async () => {
    const result = await dispatch(simulatePayment(orderId));
    if (simulatePayment.fulfilled.match(result)) {
      onPaymentSuccess && onPaymentSuccess(result.payload);
    }
  };

  const handleMpesaPayment = async () => {
    if (!phoneNumber) {
      alert("Please enter phone number");
      return;
    }
    const result = await dispatch(initiatePayment({ orderId, phoneNumber }));
    if (initiatePayment.fulfilled.match(result)) {
      onPaymentSuccess && onPaymentSuccess(result.payload);
    }
  };

  const handlePayment = () => {
    if (paymentMethod === "simulate") {
      handleSimulatePayment();
    } else {
      handleMpesaPayment();
    }
  };

  return (
    <div className="payment-simulation">
      <h3>Payment Options</h3>
      {error && (
        <div className="error-message">
          {error.message || JSON.stringify(error)}
        </div>
      )}
      
      {paymentStatus && (
        <div className="success-message">
          <p>✓ {paymentStatus.message}</p>
          {paymentStatus.invoice_number && <p>Invoice: {paymentStatus.invoice_number}</p>}
        </div>
      )}

      <div className="payment-method-selector">
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="simulate"
            checked={paymentMethod === "simulate"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Test Payment (Free)</span>
        </label>
        <label className="payment-option">
          <input
            type="radio"
            name="paymentMethod"
            value="mpesa"
            checked={paymentMethod === "mpesa"}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <span>Real M-Pesa Payment</span>
        </label>
      </div>

      {paymentMethod === "mpesa" && (
        <div className="mpesa-form">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="254712345678"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
      )}

      <button
        onClick={handlePayment}
        disabled={loading || (paymentMethod === "mpesa" && !phoneNumber)}
        className="pay-btn"
      >
        {loading ? "Processing..." : paymentMethod === "simulate" ? "Simulate Payment" : "Pay with M-Pesa"}
      </button>
    </div>
  );
};

export default PaymentSimulation;
