
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const AppCTA = () => {
  return (
    <div className="bg-nomnom-orange/10 rounded-xl overflow-hidden">
      <div className="container-custom py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Get the NomNom App
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto md:mx-0">
              Download our mobile app for faster ordering, exclusive deals, and real-time order tracking. Available for iOS and Android.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button className="bg-nomnom-dark hover:bg-nomnom-dark/90 flex items-center gap-2">
                <Download className="h-5 w-5" />
                App Store
              </Button>
              <Button className="bg-nomnom-dark hover:bg-nomnom-dark/90 flex items-center gap-2">
                <Download className="h-5 w-5" />
                Google Play
              </Button>
            </div>
          </div>
          
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="NomNom App"
              className="rounded-lg shadow-lg max-w-full h-auto mx-auto md:ml-auto md:mr-0"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppCTA;
