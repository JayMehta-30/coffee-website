'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Coffee, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Takeaway', href: '/takeaway' },
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Book a Table', href: '/book' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { totalItems, setIsCartOpen } = useCart();

    return (
        <nav className="fixed w-full z-50 bg-[#1A0F0A]/80 backdrop-blur-md border-b border-amber-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-3 group">
                            <Coffee className="h-8 w-8 text-[#D4A574] group-hover:text-white transition-colors" />
                            <span className="text-2xl font-['Playfair_Display'] font-bold text-amber-50 tracking-wider">
                                Coffeemania
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`transition-colors text-sm font-medium tracking-wide ${
                                            link.name === 'Takeaway' 
                                                ? 'bg-[#D4A574]/10 text-[#D4A574] hover:bg-[#D4A574]/20 px-3 py-1.5 rounded-full border border-[#D4A574]/30' 
                                                : isActive ? 'text-[#D4A574]' : 'text-amber-100/70 hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            
                            {/* Cart Icon */}
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="relative p-2 text-amber-100/70 hover:text-white transition-colors group"
                            >
                                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {totalItems > 0 && (
                                    <span className="absolute top-0 right-0 bg-[#D4A574] text-[#1A0F0A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button & Cart */}
                    <div className="md:hidden flex items-center gap-4">
                        <button 
                            onClick={() => setIsCartOpen(true)}
                            className="relative p-2 text-amber-100/70 hover:text-white transition-colors"
                        >
                            <ShoppingBag className="w-6 h-6" />
                            {totalItems > 0 && (
                                <span className="absolute top-0 right-0 bg-[#D4A574] text-[#1A0F0A] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-amber-100/70 hover:text-white hover:bg-amber-900/30 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#1A0F0A]/95 border-b border-amber-900/30 overflow-hidden"
                    >
                        <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 flex flex-col items-center">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block w-full text-center px-3 py-4 rounded-md text-lg font-medium tracking-wide transition-colors ${
                                            link.name === 'Takeaway'
                                                ? 'bg-[#D4A574]/20 border border-[#D4A574]/50 text-[#D4A574]'
                                                : isActive ? 'text-[#D4A574] bg-amber-900/20' : 'text-amber-100/70 hover:text-white hover:bg-amber-900/30'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
