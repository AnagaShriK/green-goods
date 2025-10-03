import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../api/axiosConfig';
import { removeFromCart, clearCart } from '../store/slices/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);
  const user = useSelector(state => state.user.userInfo);

  const total = items.reduce((a, b) => a + b.qty * b.price, 0);

  const placeOrder = async () => {
    if (!user) return alert('Please login first');
    try {
      await api.post('/orders', { orderItems: items, totalPrice: total });
      dispatch(clearCart());
      alert('Order placed!');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center text-success mb-4">Your Cart</h3>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.plant} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {item.name} x {item.qty}
            </div>
            <div>
              ₹{item.price * item.qty}
              <button className="btn btn-sm btn-danger ms-2" onClick={() => dispatch(removeFromCart(item.plant))}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-3">
        <h5>Total: ₹{total}</h5>
        <button className="btn btn-success mt-2" onClick={placeOrder} disabled={!items.length}>Place Order</button>
      </div>
    </div>
  );
}

export default Cart;
