'use client';

import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto pt-18 px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="mb-3">
                        Welcome to PromptSelfie&trade; by FinEdsoft. We respect your privacy and are committed to protecting your personal data. 
                        This privacy policy will inform you about how we look after your personal data when you use our service, 
                        and tell you about your privacy rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
                    <p className="mb-3">
                        We collect and process the following data from you:
                    </p>
                    <ul className="list-disc pl-6 mb-3 space-y-2">
                        <li>Account information (name, email, password)</li>
                        <li>Portrait images you upload</li>
                        <li>Prompts you provide for image generation</li>
                        <li>Generated images</li>
                        <li>Usage data (such as features used and time spent on platform)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
                    <p className="mb-3">
                        The portrait images you upload are used to:
                    </p>
                    <ul className="list-disc pl-6 mb-3 space-y-2">
                        <li>Train a custom AI model specific to your likeness</li>
                        <li>Generate new portrait images based on your prompts</li>
                        <li>Improve our AI technology and service quality</li>
                    </ul>
                    <p className="mb-3">
                        We process your data with the utmost care and in accordance with applicable data protection laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                    <p className="mb-3">
                        Your portrait images and generated content will be stored for as long as you maintain an active account with us. 
                        You can request deletion of your data at any time through your account settings or by contacting us.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">AI Training</h2>
                    <p className="mb-3">
                        By using our service, you consent to your uploaded portrait images being used to train a custom AI model 
                        specific to your likeness. This model is used exclusively to generate images for your use based on 
                        your prompts. We do not share your personal AI model with other users or third parties.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                    <p className="mb-3">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-6 mb-3 space-y-2">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate personal data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to processing of your data</li>
                        <li>Request restriction of processing your data</li>
                        <li>Request transfer of your data</li>
                        <li>Withdraw consent</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p className="mb-3">
                        We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                        used, or accessed in an unauthorized way. We limit access to your personal data to those employees and 
                        third parties who have a business need to know.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
                    <p className="mb-3">
                        We may update our privacy policy from time to time. We will notify you of any changes by posting the new 
                        privacy policy on this page and updating the effective date.
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="mb-3">
                        If you have any questions about this privacy policy or our privacy practices, please contact us at:
                    </p>
                    <p className="mb-3">
                        Email: support@finedsoft.com
                    </p>
                </section>

                <p className="text-sm text-gray-500 mt-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;