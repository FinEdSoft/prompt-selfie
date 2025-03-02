"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

// Form schema validation using Zod
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true);
        
        // In a real application, you would send this data to your API
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // console.log("Form data:", data);
            
            setIsSubmitted(true);
            form.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container mx-auto py-16 px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
                
                <p className="text-lg text-gray-600 mb-8 text-center">
                    Have questions about our AI portrait technology? Looking to create your own custom AI model?
                    We're here to help you transform your photos into stunning AI-generated portraits.
                </p>
                
                <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Email</h3>
                            <p className="text-gray-600">support@finedsoft.com</p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
                            <p className="text-gray-600">Monday - Friday: 9am - 5pm</p>
                        </div>
                        
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Headquarters</h3>
                            <p className="text-gray-600">
                                Benachity<br />
                                Durgapur WB 713213<br />
                                India
                            </p>
                        </div>
                    </div>
                    
                    <div className="bg-gray-500 p-6 rounded-lg">
                        {isSubmitted ? (
                            <div className="text-center py-8">
                                <h3 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h3>
                                <p className="text-gray-600">
                                    We've received your message and will get back to you as soon as possible.
                                </p>
                                <Button 
                                    className="mt-6"
                                    onClick={() => setIsSubmitted(false)}
                                >
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        // @ts-ignore
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        // @ts-ignore
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Your email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <FormField
                                        control={form.control}
                                        name="subject"
                                        // @ts-ignore
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subject</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Message subject" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        // @ts-ignore
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea 
                                                        placeholder="How can we help you?" 
                                                        className="min-h-[120px]"
                                                        {...field} 
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <Button 
                                        type="submit" 
                                        className="w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </div>
                </div>
                
                <div className="bg-gradient-to-r from-black-100 to-black-100 p-8 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">How Our AI Portrait Technology Works</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-black p-4 rounded shadow-sm">
                            <div className="font-bold text-xl mb-2">1. Upload Photos</div>
                            <p className="text-gray-600">Upload 10-20 portrait photos of yourself to train your custom AI model.</p>
                        </div>
                        <div className="bg-black p-4 rounded shadow-sm">
                            <div className="font-bold text-xl mb-2">2. Train Model</div>
                            <p className="text-gray-600">Our advanced AI learns your facial features and unique characteristics.</p>
                        </div>
                        <div className="bg-black p-4 rounded shadow-sm">
                            <div className="font-bold text-xl mb-2">3. Generate Images</div>
                            <p className="text-gray-600">Create unlimited portraits with different styles, backgrounds, and clothing.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}