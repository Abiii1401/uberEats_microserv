
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-nomnom-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-nomnom-orange flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl">NomNom</span>
            </div>
            <p className="text-nomnom-light/70 mb-6">
              Delicious food delivered to your doorstep. Fast, reliable, and always tasty!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-nomnom-orange transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-nomnom-orange transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-nomnom-orange transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/restaurants" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  All Restaurants
                </Link>
              </li>
              <li>
                <Link to="/cuisines" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Cuisines
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Info</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-nomnom-light/70 hover:text-nomnom-orange transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-nomnom-light/70 text-sm">
            &copy; {new Date().getFullYear()} NomNom Cloud Eatery. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/amex.png" alt="Amex" className="h-6" />
            <img src="https://img.icons8.com/color/48/000000/paypal.png" alt="PayPal" className="h-6" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
