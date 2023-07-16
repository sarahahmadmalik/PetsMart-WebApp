import React, { useState, useContext, useEffect } from 'react';
import '../styles/Checkout.css';
import Cart from '../components/Cart'
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import LazyLoader from './LazyLoader';
import NotificationCard from './NotificationCard';

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    shippingMethod: '',
    paymentMethod: '', // New payment method field
    cardNumber: '', // New card number field
    cardHolderName: '', // New card holder name field
    expirationDate: '', // New expiration date field
    cvv: '' // New CVV field
  });

  const pageNavigate = useNavigate();

  const { cartItems, cartTotal, shippingCost, clearCart } = useContext(CartContext);
  const [activeStage, setActiveStage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStageChange = (stage) => {
    if (stage < activeStage) {
      setActiveStage(stage);
    }
  }

  const handlePageNavigate = () => {
    pageNavigate('../Cart');
  }

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowNotification(true);
    setIsOrderPlaced(true)
    // Simulating an asynchronous order placement
    setTimeout(() => {
      setIsLoading(false);
     
    }, 2000);

    clearCart();
    
  }

  useEffect(() => {
    if (isOrderPlaced) {
      // Scroll to the success message section after order placement
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [isOrderPlaced]);




  const handleSubmit = (e) => {
    e.preventDefault();

    setActiveStage(prevState => prevState + 1);

    // Perform your checkout logic here
    // You can access the form data from the state variable (formData)

    // Reset the form after submission
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      apartment: '',
      city: '',
      postalCode: '',
      phoneNumber: '',
      shippingMethod: ''
    });
  };

  console.log(cartTotal);

  return (
    <div className="checkout-container">
      {isLoading && (
        <>
        <div className="loader-overlay">
        <LazyLoader/>
        </div>

        </>
      )}

{!isLoading && showNotification && (
        <div  className={`notification-banner ${isOrderPlaced ? 'show-card' : ''}`}>
       <NotificationCard />
     </div>
        )}
      {!isLoading && !showNotification && (
        <>
      <div className='checkout-wrapper'>
        <div className='heading'>
      <h1 className="checkout-heading">PetCare</h1></div>
      <div className="checkout-links">
        <span className={`checkout-link ${activeStage === 0 ? 'active' : ''}`} onClick={() => handlePageNavigate()}>
          Cart
        </span>
        <span className="checkout-link">{'>'}</span>
        <span className={`checkout-link ${activeStage === 1 ? 'active' : ''}`} onClick={() => handleStageChange(1)}>
          Customer Information
        </span>
        <span className="checkout-link">{'>'}</span>
        <span className={`checkout-link ${activeStage === 2 ? 'active' : ''}`} onClick={() => handleStageChange(2)}>
          Shipping Method
        </span>
        <span className="checkout-link">{'>'}</span>
        <span className={`checkout-link ${activeStage === 3 ? 'active' : ''}`} onClick={() => handleStageChange(3)}>
          Payment Method
        </span>
      </div>
      
      {activeStage === 1 && (
       <form className="checkout-form" onSubmit={handleSubmit}>
       {/* Stage 2: Customer Information */}
       <div className="form-row">
        <div className='contact-label'>
         <label className="form-label" htmlFor="contactInformation">
           Contact Information:
         </label>
         <p className="form-login">
           Already have an account? <a href="/">Login</a>
         </p>
         </div>
         <input
           className="form-input"
           type="email"
           id="contactInformation"
           name="contactInformation"
           value={formData.contactInformation}
           onChange={handleInputChange}
           placeholder="Enter your email"
           required
         />
       </div>
       
       <h2 className="shipping-address-heading">Shipping Address</h2>
       < div className="form-row -inline">
         <input
           className="form-input-inline"
           type="text"
           id="firstName"
           name="firstName"
           value={formData.firstName}
           onChange={handleInputChange}
           placeholder="First Name"
           required
         />
         <input
           className="form-input-inline"
           type="text"
           id="lastName"
           name="lastName"
           value={formData.lastName}
           onChange={handleInputChange}
           placeholder="Last Name"
           required
         />
       </div>
       <div className="form-row">
         <input
           className="form-input"
           type="text"
           id="address"
           name="address"
           value={formData.address}
           onChange={handleInputChange}
           placeholder="Address"
           required
         />
       </div>
       <div className="form-row">
         <input
           className="form-input"
           type="text"
           id="apartment"
           name="apartment"
           value={formData.apartment}
           onChange={handleInputChange}
           placeholder="Apartment/Suite (optional)"
         />
       </div>
       <div className="form-row -inline">
         <input
           className="form-input-inline"
           type="text"
           id="city"
           name="city"
           value={formData.city}
           onChange={handleInputChange}
           placeholder="City"
           required
         />
         <input
           className="form-input-inline"
           type="text"
           id="postalCode"
           name="postalCode"
           value={formData.postalCode}
           onChange={handleInputChange}
           placeholder="Postal Code"
           required
         />
       </div>
       <div className="form-row">
         <input
           className="form-input"
           type="tel"
           id="phoneNumber"
           name="phoneNumber"
           value={formData.phoneNumber}
           onChange={handleInputChange}
           placeholder="Phone Number"
         />
       </div>
       <div className='submit-area'>
       <span className="return-link" onClick={() => handleStageChange(0)}>
    &lt; Return to Cart
  </span>
        <button className="form-submit" type="submit">
         Continue to Shipping Method
       </button>
       </div>
       
     </form>
      )}
     {activeStage === 2 && (
      <form className='shipping-method' onSubmit={handleSubmit}>
        
            <h2 className="shipping-method-heading">Shipping Method</h2>
            <div className="shipping-options">
              <div className="shipping-option first">
                <div>
                <input type="radio" id="pickup" name="shippingMethod" value="pickup"  onChange={handleInputChange}/>
                <label htmlFor="pickup">Pickup</label>
                </div>
                {formData.shippingMethod === 'pickup' && (
                <div>
                  <p className="pickup-address-details">123 Main St, City, Postal Code</p>
                </div>
              )}
              </div>
              <div className="shipping-option">
                <input type="radio" id="homeDelivery" name="shippingMethod" value="homeDelivery"   onChange={handleInputChange}/>
                <label htmlFor="homeDelivery">Home Delivery</label>
              </div>
            </div>
            <div className="pickup-address">
             
            </div>
            <div className="submit-area">
              <span className="return-link" onClick={() => handleStageChange(1)}>
                &lt; Return to Customer Info
              </span>
              <button className="form-submit" type="submit" >
                Continue to Payment Method
              </button>
            </div>
        
          </form>
        )}
        
{activeStage === 3 && (
        <form className="checkout-form" onSubmit={handleSubmitPayment}>
          {/* Stage 3: Payment Method */}
          <h2 className="payment-method-heading">Payment Method</h2>
          <div className="payment-options">
            <div className="payment-option">
              <input
                type="radio"
                id="debitCard"
                name="paymentMethod"
                value="debitCard"
                onChange={handleInputChange}
              />
              <label htmlFor="debitCard">Debit Card</label>
            </div>
            <div className="payment-option">
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="cashOnDelivery"
                onChange={handleInputChange}
              />
              <label htmlFor="cashOnDelivery">Cash on Delivery</label>
            </div>
          </div>

          {/* Debit Card Details */}
          {formData.paymentMethod === 'debitCard' && (
            <div className="debit-card-details">
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="Card Number"
                  required
                />
              </div>
              <div className="form-row">
                <input
                  className="form-input"
                  type="text"
                  id="cardHolderName"
                  name="cardHolderName"
                  value={formData.cardHolderName}
                  onChange={handleInputChange}
                  placeholder="Card Holder Name"
                  required
                />
              </div>
              <div className="form-row -inline">
                <input
                  className="form-input-inline"
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleInputChange}
                  placeholder="Expiration Date"
                  required
                />
                <input
                  className="form-input-inline"
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="CVV"
                  required
                />
              </div>
            </div>
          )}

          <div className="submit-area">
            <span className="return-link" onClick={() => handleStageChange(2)}>
              &lt; Return to Shipping Method
            </span>
            <button className="form-submit" type="submit">
              Place Order
            </button>
          </div>
        </form>
      )}
     
      </div>
      <div className="checkout-summary">
          <div className="checkout-summary-items">
            {cartItems.map((item) => (
              <div className="checkout-summary-item" key={item.product.id}>
                <img src={item.product.image} alt={item.product.title} className="checkout-summary-item-image" />
                <div className="checkout-summary-item-details">
                  <h3 className="checkout-summary-item-title">{item.product.title}</h3>
                  <p className="checkout-summary-item-quantity">Quantity: {item.quantity}</p>
                  <p className="checkout-summary-item-price">${item.product.price}</p>
                </div>
              </div>
            ))}

          </div>
          <div className="checkout-summary-total">
      
            <div className='checkout-price-div'> 
            <div><p className="checkout-summary-subtotal">Subtotal:</p><p> ${cartTotal}</p></div> 
            <div><p className="checkout-summary-shipping">Shipping:</p><p> ${shippingCost}</p></div>
            </div>
            <div className='total-div'>
            <p className="checkout-summary-total-price">Total: </p><p>${(parseFloat(cartTotal) + parseFloat(shippingCost)).toFixed(2)}</p></div>
          </div>
        </div>
        </>
        )}
      </div>

  );
};

export default Checkout;