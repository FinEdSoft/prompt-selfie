'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { SignInButton } from '@clerk/nextjs';
import { ArrowRight } from 'lucide-react';




export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-6xl">
            <motion.section 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                className="mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Reimagine Yourself</h1>
                <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto">
                    Transform your portraits with our cutting-edge AI technology. Be anyone, anywhere.
                </p>
            </motion.section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <motion.div 
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={{...fadeIn }}
                    transition={{ delay: 0.2, duration: 0.8 }}>
                    <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        We believe everyone should be able to explore their visual identity without limits.
                        Our AI-powered platform allows you to see yourself in different outfits, settings,
                        and styles - all with just a few portrait photos and a description.
                    </p>
                    <p className="text-lg text-gray-600">
                        Whether you're curious how you'd look in historical attire, want to visualize yourself
                        in exotic locations, or just want to experiment with styles you've never tried,
                        our technology makes it possible.
                    </p>
                </motion.div>

                <motion.div 
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    variants={{...fadeIn}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative h-80 md:h-full overflow-hidden rounded-lg"
                >
                    <Image 
                        src="/16x9_A_futuristic_screen_displaying_A.png" 
                        alt="AI Portrait Transformation" 
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>
            </div>

            <motion.section 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{...fadeIn }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-16"
            >
                <h2 className="text-3xl font-semibold mb-8 text-center">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-black p-6 rounded-lg shadow-md">
                        <div className="text-3xl font-bold text-blue-500 mb-3">01</div>
                        <h3 className="text-xl font-semibold mb-2">Upload Your Portraits</h3>
                        <p className="text-gray-600">
                            Share 10-20 photos of yourself from different angles. Our AI uses these to learn your facial features.
                        </p>
                    </div>
                    <div className="bg-black p-6 rounded-lg shadow-md">
                        <div className="text-3xl font-bold text-blue-500 mb-3">02</div>
                        <h3 className="text-xl font-semibold mb-2">AI Training</h3>
                        <p className="text-gray-600">
                            Our advanced neural networks analyze your photos to create a personalized model that captures your essence.
                        </p>
                    </div>
                    <div className="bg-black p-6 rounded-lg shadow-md">
                        <div className="text-3xl font-bold text-blue-500 mb-3">03</div>
                        <h3 className="text-xl font-semibold mb-2">Generate & Explore</h3>
                        <p className="text-gray-600">
                            Describe any outfit or location in a prompt, and see yourself transformed in seconds.
                        </p>
                    </div>
                </div>
            </motion.section>

            <motion.section 
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{...fadeIn}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-16 "
            >
                <h2 className="text-3xl font-semibold mb-8 text-center">Our Technology</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
                    We've built our platform on state-of-the-art generative AI models, specifically optimized for 
                    portrait transformation while preserving your unique features. Our proprietary training methods 
                    ensure that the generated images maintain your likeness while seamlessly integrating with new 
                    clothing styles and environments.
                </p>
                <div className="bg-dark-50 p-8 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-center">Privacy & Security</h3>
                    <p className="text-gray-600 text-center max-w-3xl mx-auto">
                        Your privacy is paramount. Your photos are used exclusively to train your personal AI model and 
                        are stored securely with enterprise-grade encryption. You retain complete control over your data 
                        and can request deletion at any time.
                    </p>
                </div>
            </motion.section>

            <motion.section
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={{...fadeIn}}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                <h2 className="text-3xl font-semibold mb-8 text-center">Ready to Transform?</h2>
                <div className="flex justify-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition duration-300 cursor-pointer">
                    <SignInButton mode="modal">
                        <span className="flex items-center">
                          Get Started 
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </SignInButton>
                    </button>
                </div>
            </motion.section>
        </div>
    );
}