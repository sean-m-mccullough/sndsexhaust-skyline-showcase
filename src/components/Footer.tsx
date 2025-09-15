import React from 'react';

interface FooterData {
  companyInfo: {
    name: string;
    description: string;
  };
  services: string[];
  contactInfo: {
    address: string[];
    phone: string;
    email: string;
  };
  copyright: string;
}

interface FooterProps {
  footerData?: FooterData;
}

export const Footer: React.FC<FooterProps> = ({ footerData }) => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-oswald font-bold mb-4">
              {footerData?.companyInfo?.name || 'S&S Stainless Exhaust'}
            </h3>
            <p className="text-primary-foreground/80">
              {footerData?.companyInfo?.description || 'Professional automotive services with a focus on exhaust systems, custom fabrication, and complete auto care.'}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              {footerData?.services?.map((service: string, index: number) => (
                <li key={index}>{service}</li>
              )) || (
                <>
                  <li>Exhaust Repair</li>
                  <li>Custom Fabrication</li>
                  <li>Auto Care</li>
                  <li>Performance Upgrades</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-primary-foreground/80">
              {footerData?.contactInfo?.address?.map((line: string, index: number) => (
                <p key={index}>{line}</p>
              )) || (
                <>
                  <p>2615 Blackwell St unit 112</p>
                  <p>Ottawa, ON K1B4E4</p>
                </>
              )}
              <p>{footerData?.contactInfo?.phone || '(613) 400-7589'}</p>
              <p>{footerData?.contactInfo?.email || 'onlyauthentic@ymail.com'}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>{footerData?.copyright || '© 2025 S&S Stainless Exhaust. All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};
