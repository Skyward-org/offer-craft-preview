
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OfferData } from '@/pages/CreateOffer';

interface OfferPreviewProps {
  offerData: OfferData;
}

const OfferPreview: React.FC<OfferPreviewProps> = ({ offerData }) => {
  const renderBasicOffer = () => (
    <div className="bg-white border rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        {offerData.title || 'Your Offer Title'}
      </h2>
      <p className="text-gray-600 mb-6">
        {offerData.description || 'Your offer description will appear here...'}
      </p>
      <Button className="w-full">
        {offerData.ctaButton || 'Get Started'}
      </Button>
    </div>
  );

  const renderPremiumOffer = () => (
    <div 
      className="relative bg-white border rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: offerData.backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${offerData.backgroundImage})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="p-6 text-white relative">
        {offerData.badge && (
          <Badge className="absolute top-4 right-4 bg-red-500 text-white">
            {offerData.badge}
          </Badge>
        )}
        <h2 className="text-2xl font-bold mb-3">
          {offerData.title || 'Premium Offer Title'}
        </h2>
        <p className="text-gray-200 mb-6">
          {offerData.description || 'Your premium offer description will appear here...'}
        </p>
        <Button variant="secondary" className="w-full">
          {offerData.ctaButton || 'Learn More'}
        </Button>
      </div>
    </div>
  );

  const renderPromotionalOffer = () => (
    <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg p-6 shadow-lg">
      <div className="text-center">
        {offerData.discount && (
          <Badge className="bg-yellow-400 text-black text-lg font-bold mb-2">
            {offerData.discount}
          </Badge>
        )}
        <h2 className="text-2xl font-bold mb-2">
          {offerData.title || 'Special Promotion'}
        </h2>
        {offerData.subtitle && (
          <p className="text-orange-100 text-sm mb-3">
            {offerData.subtitle}
          </p>
        )}
        <p className="text-orange-100 mb-4">
          {offerData.description || 'Don\'t miss this amazing promotional offer...'}
        </p>
        {offerData.price && (
          <div className="text-3xl font-bold mb-4">
            {offerData.price}
          </div>
        )}
        <Button variant="secondary" className="w-full bg-white text-orange-500 hover:bg-gray-100">
          {offerData.ctaButton || 'Claim Offer'}
        </Button>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (offerData.templateType) {
      case 'basic':
        return renderBasicOffer();
      case 'premium':
        return renderPremiumOffer();
      case 'promotional':
        return renderPromotionalOffer();
      default:
        return (
          <div className="text-center text-gray-500 py-12">
            Select a template to see preview
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderPreview()}
    </div>
  );
};

export default OfferPreview;
