'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, items, removeFromCart, updateQuantity, totalPrice } = useCart();
    const router = useRouter();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;
        setIsCheckingOut(true);
        
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ items })
            });
            const data = await response.json();
            
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error("Failed to create checkout session");
                setIsCheckingOut(false);
            }
        } catch (error) {
            console.error(error);
            setIsCheckingOut(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1A0F0A] border-l border-amber-900/30 z-[70] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-amber-900/30">
                            <h2 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50 flex items-center gap-2">
                                <ShoppingBag className="text-[#D4A574]" /> Your Cart
                            </h2>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 rounded-lg text-amber-100/70 hover:text-white hover:bg-amber-900/30 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <ShoppingBag className="w-16 h-16 text-amber-900/50" />
                                    <p className="text-amber-100/60 font-['Inter']">Your cart is empty.</p>
                                    <button 
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            router.push('/takeaway');
                                        }}
                                        className="text-[#D4A574] hover:text-[#E5B584] underline underline-offset-4"
                                    >
                                        Order Takeaway
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 bg-[#24150D] rounded-2xl border border-amber-900/30">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-black/50">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-['Playfair_Display'] font-bold text-amber-50 leading-tight">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-xs text-amber-100/60 font-['Inter'] mt-1">
                                                        {item.size} {item.customizations && `• ${item.customizations}`}
                                                    </p>
                                                </div>
                                                <button 
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-amber-100/40 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            
                                            <div className="mt-auto flex items-center justify-between pt-3">
                                                <div className="flex items-center gap-3 bg-[#1A0F0A] rounded-lg p-1 border border-amber-900/40">
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 rounded text-amber-100/70 hover:text-white hover:bg-amber-900/30 disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button 
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 rounded text-amber-100/70 hover:text-white hover:bg-amber-900/30"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <span className="font-semibold text-[#D4A574]">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-amber-900/30 bg-[#1A0F0A]">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-amber-100/80 font-['Inter']">Subtotal</span>
                                    <span className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full py-4 bg-gradient-to-r from-[#D4A574] to-[#C08A56] hover:from-[#E5B584] hover:to-[#D4A574] text-[#1A0F0A] rounded-xl text-lg font-bold shadow-lg shadow-[#D4A574]/20 transition-all transform active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isCheckingOut ? 'Loading...' : 'Proceed to Checkout'}
                                </button>
                                <p className="text-center text-xs text-amber-100/40 mt-4 flex justify-center gap-1">
                                    <span>Secure checkout powered by</span> <span className="font-semibold">Stripe</span>
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
