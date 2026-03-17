'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { coffeeProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Plus, Coffee } from 'lucide-react';

export default function TakeawayPage() {
    const { addToCart } = useCart();
    // Keep local states for each product
    const [selections, setSelections] = useState<Record<string, { size: string, customization: string }>>({});

    const handleSizeChange = (id: string, size: string) => {
        setSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], size: size || 'Medium', customization: prev[id]?.customization || '' }
        }));
    };

    const handleCustomizationChange = (id: string, custom: string) => {
        setSelections(prev => ({
            ...prev,
            [id]: { ...prev[id], size: prev[id]?.size || 'Medium', customization: custom }
        }));
    };

    const handleAddToCart = (product: any) => {
        const selection = selections[product.id] || { size: 'Medium', customization: '' };
        
        // Calculate dynamic price based on size
        let finalPrice = product.basePrice;
        if (selection.size === 'Large') finalPrice += 1.5;
        if (selection.size === 'Small') finalPrice -= 0.5;

        // Customization
        if (selection.customization) finalPrice += 0.75; // Flat add-on fee

        addToCart({
            id: `${product.id}-${selection.size}-${selection.customization}`.toLowerCase().replace(/\s+/g, '-'),
            productId: product.id,
            name: product.name,
            price: finalPrice,
            quantity: 1,
            size: selection.size,
            customizations: selection.customization,
            image: product.image
        });

        // Reset product selection visually
        setSelections(prev => ({ ...prev, [product.id]: { size: 'Medium', customization: '' } }));
    };

    return (
        <div className="min-h-screen bg-[#1A0F0A] py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-amber-50 mb-6 flex items-center justify-center gap-4">
                        <Coffee className="w-10 h-10 md:w-16 md:h-16 text-[#D4A574]" />
                        Order Takeaway
                    </h1>
                    <p className="text-xl text-amber-100/70 max-w-2xl mx-auto font-['Inter']">
                        Skip the line. Customize your brew and proceed to secure checkout.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coffeeProducts.map((product, index) => {
                        const selection = selections[product.id] || { size: 'Medium', customization: '' };
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-[#24150D] rounded-3xl overflow-hidden border border-amber-900/30 flex flex-col hover:border-[#D4A574]/50 transition-colors"
                            >
                                <div className="h-64 relative overflow-hidden bg-black">
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80" />
                                </div>
                                
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-amber-50">
                                            {product.name}
                                        </h3>
                                        <span className="text-xl font-bold text-[#D4A574]">
                                            ${product.basePrice.toFixed(2)}
                                        </span>
                                    </div>
                                    <p className="text-sm text-amber-100/70 font-['Inter'] mb-6 flex-1">
                                        {product.description}
                                    </p>

                                    {/* Selectors */}
                                    <div className="space-y-4 mb-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-amber-100/50 uppercase tracking-wider">Size</label>
                                            <select 
                                                value={selection.size}
                                                onChange={(e) => handleSizeChange(product.id, e.target.value)}
                                                className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-3 py-2 text-amber-50 focus:outline-none focus:border-[#D4A574] text-sm"
                                            >
                                                <option value="Small">Small (-$0.50)</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Large">Large (+$1.50)</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-amber-100/50 uppercase tracking-wider">Add-ons (+$0.75)</label>
                                            <select 
                                                value={selection.customization}
                                                onChange={(e) => handleCustomizationChange(product.id, e.target.value)}
                                                className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-3 py-2 text-amber-50 focus:outline-none focus:border-[#D4A574] text-sm"
                                            >
                                                <option value="">None</option>
                                                <option value="Extra Shot">Extra Espresso Shot</option>
                                                <option value="Oat Milk">Oat Milk</option>
                                                <option value="Almond Milk">Almond Milk</option>
                                                <option value="Vanilla Syrup">Vanilla Syrup</option>
                                                <option value="Caramel Syrup">Caramel Syrup</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full py-3 bg-amber-900/20 hover:bg-[#D4A574] text-[#D4A574] hover:text-[#1A0F0A] border border-[#D4A574]/30 hover:border-transparent rounded-xl font-semibold transition-all flex items-center justify-center gap-2 group"
                                    >
                                        <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" /> Add to Order
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
