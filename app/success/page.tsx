'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function SuccessPage() {
    const { clearCart } = useCart();

    useEffect(() => {
        // Clear shopping cart on successful checkout
        clearCart();
    }, [clearCart]);

    return (
        <div className="min-h-screen bg-[#1A0F0A] py-32 px-4 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#24150D] p-12 rounded-3xl border border-green-500/30 text-center max-w-lg w-full shadow-2xl shadow-green-900/10"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', bounce: 0.5 }}
                    className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle2 className="w-12 h-12 text-green-400" />
                </motion.div>
                
                <h1 className="text-4xl font-['Playfair_Display'] font-bold text-amber-50 mb-4">
                    Payment Successful!
                </h1>
                
                <p className="text-amber-100/70 font-['Inter'] mb-10 leading-relaxed">
                    Thank you for your order. Our master baristas will begin preparing your premium artisan coffee shortly.
                </p>

                <div className="flex flex-col gap-4">
                    <Link href="/takeaway" className="w-full py-4 bg-[#D4A574] hover:bg-[#E5B584] text-[#1A0F0A] rounded-xl font-semibold transition-colors">
                        Order More Coffee
                    </Link>
                    <Link href="/" className="flex items-center justify-center gap-2 w-full py-4 bg-transparent border border-amber-900/50 hover:bg-amber-900/30 text-amber-50 rounded-xl transition-colors group">
                        Return Home <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
