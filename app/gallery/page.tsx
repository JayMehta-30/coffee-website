'use client';

import { motion } from 'framer-motion';

const images = [
    { src: '/coffee/cappuccino.jpg', alt: 'Artisan Cappuccino', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-2' },
    { src: '/coffee/latte.jpg', alt: 'Latte Art', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { src: '/coffee/mocha.jpg', alt: 'Rich Mocha', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { src: '/coffee/splash-banner.jpg', alt: 'Coffee Beans Splash', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
    // Reusing images to create a fuller gallery look for demonstration
    { src: '/coffee/latte.jpg', alt: 'Latte Preparation', colSpan: 'col-span-1', rowSpan: 'row-span-1' },
    { src: '/coffee/cappuccino.jpg', alt: 'Fresh Brew', colSpan: 'col-span-1 md:col-span-2', rowSpan: 'row-span-1' },
];

export default function GalleryPage() {
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
                        Our Gallery
                    </h1>
                    <p className="text-xl text-amber-100/70 max-w-2xl mx-auto font-['Inter']">
                        A visual journey through our craft. Every cup has a story to tell.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative overflow-hidden rounded-2xl group ${image.colSpan} ${image.rowSpan}`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0F0A]/90 via-[#1A0F0A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                <h3 className="text-xl font-['Playfair_Display'] font-semibold text-amber-50 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {image.alt}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
