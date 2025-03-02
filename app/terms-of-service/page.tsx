"use client";

import React from "react";
import Link from "next/link";




export default function TermsOfService() {
    return (
        <div className="max-w-4xl mx-auto pt-18 py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
            
            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                    <p className="text-white">
                        These Terms of Service (&quot;Terms&quot;) govern your access to and use of our portrait AI generation 
                        services, including our website, mobile application, and all related services (collectively, 
                        the "Service"). By using our Service, you agree to be bound by these Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">2. Definitions</h2>
                    <p className="text-white">
                        &quot;User Content&quot; refers to images, photos, portraits, prompts, and other content you upload to our Service.<br />
                        &quot;Generated Content&quot; refers to AI-generated images created by our Service based on your User Content and prompts.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">3. AI Training and Data Usage</h2>
                    <p className="text-white">
                        <strong>3.1.</strong> By uploading portrait images to our Service, you grant us permission to use these images to train 
                        custom AI models specific to your account.<br />
                        <strong>3.2.</strong> Your images will be used solely for the purpose of training models that can generate 
                        portraits featuring you in different settings, backgrounds, and attire.<br />
                        <strong>3.3.</strong> We will not use your images to train generalized AI models that serve other users without your explicit consent.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">4. User Rights and Responsibilities</h2>
                    <p className="text-white">
                        <strong>4.1.</strong> You retain all rights to your original User Content.<br />
                        <strong>4.2.</strong> You are responsible for ensuring you have the necessary rights to upload 
                        any images to our Service.<br />
                        <strong>4.3.</strong> You must not upload images of other individuals without their consent.<br />
                        <strong>4.4.</strong> You agree not to use our Service to generate content that is illegal, harmful, 
                        abusive, racially or ethnically offensive, vulgar, sexually explicit, defamatory, or otherwise objectionable.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">5. Generated Content</h2>
                    <p className="text-white">
                        <strong>5.1.</strong> You own the Generated Content created based on your prompts and your likeness.<br />
                        <strong>5.2.</strong> We maintain the right to use Generated Content for Service improvement and marketing purposes, 
                        unless you opt out in your account settings.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">6. Privacy and Data Protection</h2>
                    <p className="text-white">
                        <strong>6.1.</strong> We are committed to protecting your privacy. Please refer to our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> for details on how we collect, use, and protect your data.<br />
                        <strong>6.2.</strong> You can request deletion of your User Content and trained models at any time through your account settings.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">7. Service Limitations</h2>
                    <p className="text-white">
                        <strong>7.1.</strong> Our Service is provided &quot;as is&quot; without warranties of any kind.<br />
                        <strong>7.2.</strong> We reserve the right to limit or terminate access to our Service for violations of these Terms.<br />
                        <strong>7.3.</strong> We may experience downtime for maintenance or due to technical issues.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
                    <p className="text-white">
                        We may modify these Terms at any time. We will notify you of significant changes. 
                        Continued use of our Service following any changes constitutes your acceptance of the modified Terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-3">9. Contact Information</h2>
                    <p className="text-white">
                        If you have any questions about these Terms, please contact us at support@finedsoft.com.
                    </p>
                </section>
            </div>
            
            <div className="mt-12 text-gray-600 text-sm">
                Last updated: {new Date().toLocaleDateString()}
            </div>
        </div>
    );
}