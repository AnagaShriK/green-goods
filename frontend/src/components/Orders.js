import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import { useSelector } from 'react-redux';

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = useSelector(state => state.user.userInfo);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      const { data } = await api.get('/orders');
      setOrders(data);
    };
    fetchOrders();
  }, [user]);

  if (!user) return <p className="mt-5 text-center">Please login to view orders.</p>;

  return (
    <div className="container mt-5">
      <h3 className="text-center text-success mb-4">Your Orders</h3>
      <ul className="list-group">
        {orders.map(order => (
          <li key={order._id} className="list-group-item">
            <strong>Order #{order._id}</strong>: ₹{order.totalPrice} — {new Date(order.createdAt).toLocaleString()}
            <ul>
              {order.orderItems.map(i => <li key={i.plant}>{i.name} x {i.qty}</li>)}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
