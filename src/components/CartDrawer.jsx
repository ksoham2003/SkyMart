import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartContext } from "../context/CartContext";
import toast from "react-hot-toast";

const CartDrawer = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    totalItems, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen 
  } = useContext(CartContext);

  const handleCheckout = () => {
    clearCart();
    setIsCartOpen(false);
    toast.success("Order placed successfully!", {
      duration: 3000,
      icon: "🎉",
      style: {
        borderRadius: '16px',
        background: '#1A1A1A',
        color: '#FFF',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '14px',
        fontWeight: 'bold',
      },
    });
  };

  const drawerVariants = {
    closed: { x: "100%", transition: { type: "spring", damping: 25, stiffness: 200 } },
    open: { x: 0, transition: { type: "spring", damping: 25, stiffness: 200 } },
  };

  const backdropVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={drawerVariants}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-white/10 bg-[#0A0A0A] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#cef00f] rounded-xl flex items-center justify-center text-black">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-xl text-white">Cart</h2>
                  <p className="text-xs text-[#cef00f] font-bold uppercase tracking-wider">{totalItems} Items</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 border border-white/10 rounded-xl hover:bg-white/5 transition-all text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingBag size={48} className="text-white/20" />
                  <p className="text-sm font-medium text-white/40 uppercase tracking-widest">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="text-[#cef00f] text-xs font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4 group hover:border-white/10 transition-all"
                  >
                    <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white truncate">{item.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#cef00f] font-black">${(item.price * item.quantity).toFixed(2)}</span>
                        <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest">${item.price.toFixed(2)} each</span>
                      </div>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 text-white/50 hover:text-[#cef00f] hover:bg-white/5 rounded-md transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 text-white/50 hover:text-[#cef00f] hover:bg-white/5 rounded-md transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-white/30 hover:text-red-500 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#0F0F0F] border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm font-medium">Total</span>
                  <span className="text-2xl font-black text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#cef00f] text-black font-black rounded-2xl shadow-[0_10px_30px_rgba(206,240,15,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  Checkout 
                  <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-white/30 hover:text-red-500 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors"
                >
                  Clear cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
