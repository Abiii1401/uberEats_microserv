
import React from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactPage = () => {
  const { toast } = useToast();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon."
    });
    form.reset();
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="text-nomnom-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-muted-foreground mb-2">For general inquiries:</p>
            <a href="mailto:info@nomnom.com" className="text-nomnom-orange hover:underline">
              info@nomnom.com
            </a>
            <p className="text-muted-foreground mt-2 mb-1">For support:</p>
            <a href="mailto:support@nomnom.com" className="text-nomnom-orange hover:underline">
              support@nomnom.com
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
              <Phone className="text-nomnom-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-muted-foreground mb-2">Customer Service:</p>
            <a href="tel:+18001234567" className="text-nomnom-orange hover:underline">
              1-800-123-4567
            </a>
            <p className="text-muted-foreground mt-2 mb-1">Restaurant Partners:</p>
            <a href="tel:+18009876543" className="text-nomnom-orange hover:underline">
              1-800-987-6543
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col items-center md:items-start text-center md:text-left">
            <div className="w-12 h-12 bg-nomnom-orange/10 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-nomnom-orange h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-muted-foreground">
              123 Food Street<br />
              Suite 456<br />
              San Francisco, CA 94105<br />
              United States
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden h-[400px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1656543200000!5m2!1sen!2sus" 
              style={{border: 0, width: "100%", height: "100%"}} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="NomNom location map"
            ></iframe>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
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
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this regarding?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
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
                
                <Button type="submit" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
