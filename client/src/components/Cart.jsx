import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { X, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { token } = useAuth();

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error('Razorpay SDK failed to load');
        return;
      }

      // Create order
      const orderResponse = await axios.post(
        'http://localhost:5001/api/payments/create-order',
        { amount: totalPrice },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "TravelEase",
        description: "Trip Booking Payment",
        order_id: orderResponse.data.id,
        handler: async (response) => {
          try {
            const bookingDetails = cartItems.map(item => ({
              tripId: item._id,
              quantity: item.quantity,
              amount: item.price * item.quantity
            }));

            const verifyResponse = await axios.post(
              'http://localhost:5001/api/payments/verify',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingDetails
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            toast.success('Payment successful!');
            clearCart();
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#7C3AED"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Failed to initiate checkout');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4 flex items-center">
        <ShoppingCart className="w-6 h-6 mr-2" />
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center justify-between border-b pb-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">₹{item.price} per person</p>
                </div>
                <div className="flex items-center">
                  <p className="font-semibold mr-4">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center">
            <p className="text-xl font-semibold">Total:</p>
            <p className="text-xl font-semibold">₹{totalPrice}</p>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </motion.div>
  );
}

export default Cart;

