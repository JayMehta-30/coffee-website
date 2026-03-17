'use client';

import { motion } from 'framer-motion';
import { Coffee, Award, Users, Heart } from 'lucide-react';

const stats = [
    { label: 'Years of Experience', value: '15+', icon: Award },
    { label: 'Artisan Baristas', value: '24', icon: Users },
    { label: 'Signature Blends', value: '12', icon: Coffee },
    { label: 'Happy Customers', value: '50k+', icon: Heart },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#1A0F0A]">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F0A]/50 to-[#1A0F0A] z-10" />
                <img 
                    src="/coffee/splash-banner.jpg" 
                    alt="Coffee Shop Interior" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-20 text-center px-4"
                >
                    <h1 className="text-6xl md:text-8xl font-['Playfair_Display'] font-bold text-amber-50 mb-4">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl text-amber-100/80 max-w-2xl mx-auto font-['Inter']">
                        A decade of passion, precision, and the pursuit of the perfect pour.
                    </p>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-[#D4A574] mb-6">
                            Defying Gravity, One Cup at a Time
                        </h2>
                        <div className="space-y-6 text-amber-100/70 font-['Inter'] leading-relaxed">
                            <p>
                                Founded in 2010, Coffeemania began with a simple yet ambitious goal: to elevate the daily coffee ritual into an extraordinary experience. We believe that great coffee isn't just a beverage; it's a moment of suspension in a busy world.
                            </p>
                            <p>
                                Our master roasters meticulously source the finest beans from sustainable farms across the globe. We treat roasting as both a science and an art, carefully drawing out the unique characteristics of each origin.
                            </p>
                            <p>
                                The "anti-gravity" philosophy isn't just about our signature smooth taste—it's about lifting spirits, fostering community, and pushing the boundaries of what coffee can be.
                            </p>
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] rounded-2xl overflow-hidden"
                    >
                        <img 
                            src="/coffee/cappuccino.jpg" 
                            alt="Barista Crafting Coffee" 
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A] via-transparent to-transparent opacity-80" />
                    </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 rounded-2xl bg-[#1A0F0A]/50 border border-amber-900/30 backdrop-blur-sm"
                            >
                                <Icon className="h-10 w-10 text-[#D4A574] mx-auto mb-4" />
                                <div className="text-4xl font-['Playfair_Display'] font-bold text-amber-50 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm font-['Inter'] text-amber-100/60 uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
