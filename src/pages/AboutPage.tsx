import React from 'react';
import { Truck, ShieldCheck, Clock, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 font-display mb-4">About QuickKart</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to revolutionize grocery shopping by making it simple, convenient, and enjoyable for everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2023, QuickKart started with a simple idea: make grocery shopping hassle-free. We understand that time is precious, and we believe that everyone deserves access to quality groceries without the stress of traditional shopping.
            </p>
            <p className="text-gray-600">
              Today, we serve thousands of happy customers, delivering fresh produce, pantry essentials, and specialty items right to their doorstep. Our commitment to quality, convenience, and customer satisfaction remains at the heart of everything we do.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <ShieldCheck className="text-primary-600 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Quality Assurance</h3>
                  <p className="text-gray-600">We carefully select and verify all our suppliers to ensure only the best products reach your doorstep.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="text-primary-600 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Timely Delivery</h3>
                  <p className="text-gray-600">We respect your time and ensure your groceries arrive when you need them.</p>
                </div>
              </li>
              <li className="flex items-start">
                <Users className="text-primary-600 mt-1 mr-3" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">Customer First</h3>
                  <p className="text-gray-600">Your satisfaction is our top priority. We're here to serve you better every day.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-primary-50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose QuickKart?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered within 2 hours</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">100% satisfaction or money-back guarantee</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary-600" size={32} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Always here to help you with your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;