import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAddress } from "../../features/payment/paymentSlice";

const BillingAddressForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payment);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    address_line: "",
    city: "",
    postal_code: "",
    address_type: "billing",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    const result = await dispatch(createAddress(formData));
    if (createAddress.fulfilled.match(result)) {
      setSuccess(true);
      onSuccess && onSuccess(result.payload);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="billing-address-form">
      <h3>Billing Address</h3>
      {error && (
        <div className="error-message">
          {error.message || JSON.stringify(error)}
        </div>
      )}
      {success && (
        <div className="success-message">
          Address saved successfully!
        </div>
      )}
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="254712345678"
          required
        />
      </div>

      <div className="form-group">
        <label>Address Line *</label>
        <input
          type="text"
          name="address_line"
          value={formData.address_line}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Postal Code</label>
        <input
          type="text"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Address Type *</label>
        <select
          name="address_type"
          value={formData.address_type}
          onChange={handleChange}
          required
        >
          <option value="billing">Billing</option>
          <option value="delivery">Delivery</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Address"}
      </button>
    </form>
  );
};

export default BillingAddressForm;
