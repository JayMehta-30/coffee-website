'use client';

import { motion } from 'framer-motion';
import { coffeeProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function MenuPage() {
    return (
        <div className="min-h-screen bg-[#1A0F0A] py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-amber-50 mb-6">
                        Our Full Menu
                    </h1>
                    <p className="text-xl text-amber-100/70 max-w-2xl mx-auto font-['Inter']">
                        Explore our complete selection of artisanal coffees, crafted with precision to elevate your daily ritual.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coffeeProducts.map((product, index) => (
                        <ProductCard key={product.id} product={product} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}
