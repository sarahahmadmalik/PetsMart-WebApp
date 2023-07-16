import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles/Cart.css'; // Import the CSS file
import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import Footer from './Footer';
library.add(faTrash);

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, cartTotal, shippingCost, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handlePage =() =>{
    navigate('../Checkout')
  }
  return (
    <>
      <div className="main">
        <NavBar />
      </div>
      <div className='Cart-wrapper'>
        <div className="Cart">
          <div className='Cart-title'>
            <div><h1>Your Cart</h1></div>
            <div><Link to={'/Shop'}>Continue Shopping</Link></div>
          </div>
          <div className='empty-cart'>
            <button className='empty-button' onClick={clearCart}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th> 
              </tr>
            </thead>
            <tbody>
            {cartItems.map((item) => (
  item.quantity > 0 && (
    <tr key={item.product.id}>
      <td className='cart-product'>
        <img src={item.product.image} alt="Product" />
        {item.product.title}
      </td>
      <td>${item.product.price}</td>
      <td>
        <div className='inc-dec'>
          <button onClick={() => addToCart(item.product.id, item.product.category, Number(item.quantity)-1, item.type)}>-</button>
          {item.quantity}
          <button onClick={() => addToCart(item.product.id, item.product.category, Number(item.quanity)+1,item.type)}>+</button>
        </div>
      </td>
      <td>${Number(item.product.price) * Number(item.quantity)}</td>
      <td>
        <button className="remove-button" onClick={() => removeFromCart(item.product.id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  )
))}

            </tbody>
          </table>
          { (cartItems.length === 0 ) ? (
            <div className='empty'><p>No items in the cart</p></div>
          ) : (
            <div className="subtotal">
              <div className='price-total'>
                <p className='tot-price'>Total Price:</p><p>${cartTotal}</p>
              </div>
              <div className='price-total'>
                <p className='tot-price'>Shipping Cost:</p><p>${shippingCost}</p>
              </div>
              <div className='price-total'>
                <p className='final-total'>SubTotal: </p> <p>${(parseFloat(cartTotal) + parseFloat(shippingCost)).toFixed(2)}</p>
              </div>
              <button className="checkout" onClick={handlePage}>Check out</button>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Cart;
