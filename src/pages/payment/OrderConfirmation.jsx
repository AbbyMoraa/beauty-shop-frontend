import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BillingAddressForm from "../../components/payment/BillingAddressForm";
import PaymentSimulation from "../../components/payment/PaymentSimulation";
import InvoiceDisplay from "../../components/payment/InvoiceDisplay";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  
  const [step, setStep] = useState(1);
  const [addressSaved, setAddressSaved] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleAddressSuccess = () => {
    setAddressSaved(true);
  };

  const handlePaymentSuccess = () => {
    setPaymentComplete(true);
    setStep(3);
  };

  if (!orderId) {
    return (
      <div className="order-confirmation-page">
        <div className="confirmation-container">
          <div className="error-message">
            No order ID provided. Please complete checkout first.
          </div>
          <button onClick={() => navigate("/checkout")} className="view-orders-btn">
            Go to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <h1>Order Confirmation</h1>
        <p className="order-id">Order ID: {orderId}</p>

        <div className="progress-steps">
          <div className={`step ${step >= 1 ? "active" : ""}`}>1. Address</div>
          <div className={`step ${step >= 2 ? "active" : ""}`}>2. Payment</div>
          <div className={`step ${step >= 3 ? "active" : ""}`}>3. Invoice</div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <BillingAddressForm onSuccess={handleAddressSuccess} />
            {addressSaved && (
              <button onClick={() => setStep(2)} className="next-btn">
                Continue to Payment
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <PaymentSimulation
              orderId={parseInt(orderId)}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        )}

        {step === 3 && paymentComplete && (
          <div className="step-content">
            <div className="success-banner">
              <h2>✓ Payment Successful!</h2>
              <p>Your order has been confirmed and paid.</p>
            </div>
            <InvoiceDisplay orderId={parseInt(orderId)} />
            <button onClick={() => navigate("/orders")} className="view-orders-btn">
              View All Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmation;
