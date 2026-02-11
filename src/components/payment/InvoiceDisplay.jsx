import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoice } from "../../features/payment/paymentSlice";

const InvoiceDisplay = ({ orderId }) => {
  const dispatch = useDispatch();
  const { currentInvoice, loading, error } = useSelector((state) => state.payment);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchInvoice(orderId));
    }
  }, [orderId, dispatch]);

  if (loading) return <div>Loading invoice...</div>;
  if (error) return <div className="error-message">{error.message}</div>;
  if (!currentInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="invoice-display">
      <div className="invoice-header">
        <h2>Invoice / Receipt</h2>
        <button onClick={handlePrint} className="print-btn">Print</button>
      </div>

      <div className="invoice-details">
        <div className="invoice-row">
          <span className="label">Invoice Number:</span>
          <span className="value">{currentInvoice.invoice_number}</span>
        </div>
        <div className="invoice-row">
          <span className="label">Order ID:</span>
          <span className="value">{currentInvoice.order_id}</span>
        </div>
        <div className="invoice-row">
          <span className="label">Amount:</span>
          <span className="value">KES {currentInvoice.amount?.toFixed(2)}</span>
        </div>
        <div className="invoice-row">
          <span className="label">Status:</span>
          <span className={`value status-${currentInvoice.status?.toLowerCase()}`}>
            {currentInvoice.status}
          </span>
        </div>
        <div className="invoice-row">
          <span className="label">Date:</span>
          <span className="value">
            {new Date(currentInvoice.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      {currentInvoice.order_details && (
        <div className="order-details">
          <h3>Order Details</h3>
          <pre>{JSON.stringify(currentInvoice.order_details, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default InvoiceDisplay;
