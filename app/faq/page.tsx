'use client';

import React from 'react';
import Link from 'next/link';

export default function FAQPage() {
    return (
        <div className="max-w-4xl mx-auto pt-20 px-4 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Frequently Asked Questions</h1>
            
            <div className="space-y-8">
                <FAQItem 
                    question="What is PromptSelfie&trade;?" 
                    answer="PromptSelfie is an AI-powered platform that creates personalized portrait images. By uploading a few photos of yourself, our technology trains a custom AI model that can generate new portrait images of you in different settings, outfits, and styles based on your text prompts." 
                />
                
                <FAQItem 
                    question="How many photos do I need to upload?" 
                    answer="We recommend uploading 10-20 diverse photos of yourself for best results. These should include different angles, expressions, and lighting conditions to help our AI learn your facial features accurately." 
                />
                
                <FAQItem 
                    question="How long does it take to train my custom model?" 
                    answer="Training typically takes 20-40 minutes, depending on our current processing queue. You'll receive an email notification when your custom model is ready to use." 
                />
                
                <FAQItem 
                    question="What can I do with the generated images?" 
                    answer="You can use the generated images for personal use, social media profiles, creative projects, and more. However, please review our terms of service regarding commercial usage." 
                />
                
                <FAQItem 
                    question="Are my photos secure and private?" 
                    answer="Yes, we take your privacy seriously. Your uploaded photos and generated images are securely stored and are only used to train your personal AI model. We do not share your data with third parties and you can request deletion of your data at any time." 
                />
                
                <FAQItem 
                    question="What kinds of prompts work best?" 
                    answer="Descriptive prompts work best, such as 'me as an astronaut on the moon' or 'professional headshot of me in a blue suit against a city skyline'. You can specify clothing, backgrounds, lighting, style, and more." 
                />
                
                <FAQItem 
                    question="Can I generate images of myself with other people?" 
                    answer="Currently, our system works best with solo portraits. Adding other specific people may result in lower quality images or may not work as expected." 
                />
                
                {/* <FAQItem 
                    question="Is there a limit to how many images I can generate?" 
                    answer="The number of generations depends on your subscription plan. Free users can generate a limited number of images, while premium subscribers have higher or unlimited generation quotas." 
                /> */}
                
                <FAQItem 
                    question="How realistic are the generated images?" 
                    answer="Our AI creates highly realistic images, though results vary based on the quality and variety of your uploaded photos. Some prompts may produce more photorealistic results than others." 
                />
                
                <FAQItem 
                    question="Can I cancel my subscription?" 
                    answer="Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period." 
                />
                
                {/* <FAQItem 
                    question="What if I'm not satisfied with the results?" 
                    answer="We offer a 7-day satisfaction guarantee for new subscribers. If you're not happy with the quality of your generated images, please contact our support team for assistance or a refund." 
                /> */}
                
                <FAQItem 
                    question="How do I get help if I have more questions?" 
                    answer={<>If you have any additional questions, please visit our <Link href="/contact" className="text-blue-600 hover:underline">contact page</Link> or contact us at <a href="mailto:support@finedsoft.com" className="text-blue-600 hover:underline">support@finedsoft.com</a>.</>}
                />
            </div>
        </div>
    );
}

function FAQItem({ question, answer }: { question: string; answer: React.ReactNode }) {
    return (
        <div className="border-b pb-6">
            <h3 className="text-xl font-semibold mb-2">{question}</h3>
            <div className="text-gray-600">{answer}</div>
        </div>
    );
}