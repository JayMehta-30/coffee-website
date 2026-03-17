'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');
        
        try {
            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
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
                    <h1 className="text-5xl md:text-7xl font-['Playfair_Display'] font-bold text-amber-50 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-amber-100/70 max-w-2xl mx-auto font-['Inter']">
                        Have a question about our beans, or just want to say hello? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#24150D] p-8 md:p-12 rounded-3xl border border-amber-900/30 shadow-2xl"
                    >
                        <h2 className="text-3xl font-['Playfair_Display'] font-semibold text-[#D4A574] mb-8">
                            Send a Message
                        </h2>
                        
                        {status === 'success' ? (
                            <div className="p-6 bg-green-900/20 border border-green-500/30 rounded-xl text-center">
                                <h3 className="text-xl font-medium text-green-400 mb-2">Message Sent Successfully!</h3>
                                <p className="text-amber-100/70">Thank you for reaching out. We will get back to you shortly.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-6 px-6 py-2 bg-transparent border border-green-500/50 text-green-400 rounded-lg hover:bg-green-900/30 transition-colors"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6 form-control">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-medium text-amber-100/80">First Name</label>
                                        <input required type="text" name="firstName" id="firstName" className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-4 py-3 text-amber-50 focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574] transition-colors" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-medium text-amber-100/80">Last Name</label>
                                        <input required type="text" name="lastName" id="lastName" className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-4 py-3 text-amber-50 focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574] transition-colors" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-amber-100/80">Email Address</label>
                                    <input required type="email" name="email" id="email" className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-4 py-3 text-amber-50 focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574] transition-colors" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-amber-100/80">Message</label>
                                    <textarea required name="message" id="message" rows={5} className="w-full bg-[#1A0F0A] border border-amber-900/50 rounded-lg px-4 py-3 text-amber-50 focus:outline-none focus:border-[#D4A574] focus:ring-1 focus:ring-[#D4A574] transition-colors resize-none"></textarea>
                                </div>
                                
                                {status === 'error' && (
                                    <p className="text-red-400 text-sm">There was an error sending your message. Please try again later.</p>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="w-full py-4 bg-gradient-to-r from-[#D4A574] to-[#C08A56] hover:from-[#E5B584] hover:to-[#D4A574] text-[#1A0F0A] rounded-lg text-lg font-semibold shadow-lg transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-12 flex flex-col justify-center"
                    >
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#24150D] rounded-2xl border border-amber-900/30">
                                <MapPin className="h-8 w-8 text-[#D4A574]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-amber-50 mb-2">Visit Us</h3>
                                <p className="text-amber-100/70 leading-relaxed font-['Inter']">
                                    123 Brew Lane, Coffeeville<br />
                                    Coffee State 12345
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#24150D] rounded-2xl border border-amber-900/30">
                                <Phone className="h-8 w-8 text-[#D4A574]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-amber-50 mb-2">Call Us</h3>
                                <p className="text-amber-100/70 leading-relaxed font-['Inter']">
                                    +1 (555) 123-4567<br />
                                    Mon-Fri, 7am to 8pm
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-[#24150D] rounded-2xl border border-amber-900/30">
                                <Mail className="h-8 w-8 text-[#D4A574]" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-['Playfair_Display'] font-semibold text-amber-50 mb-2">Email Us</h3>
                                <p className="text-amber-100/70 leading-relaxed font-['Inter']">
                                    hello@coffeemania.com<br />
                                    support@coffeemania.com
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
