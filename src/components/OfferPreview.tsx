
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { OfferData } from '@/pages/CreateOffer';

interface OfferPreviewProps {
  offerData: OfferData;
}

const OfferPreview: React.FC<OfferPreviewProps> = ({ offerData }) => {
  const [viewSource, setViewSource] = useState(false);

  const getDropShadowValue = (level: string) => {
    switch (level) {
      case 'light':
        return '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
      case 'medium':
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
      case 'dark':
        return '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
      default:
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  };

  const getOfferStyle = () => {
    const width = offerData.useFullWidth ? '100%' : `${offerData.width || 400}px`;
    const height = `${offerData.height || 420}px`;
    const boxShadow = getDropShadowValue(offerData.dropShadow || 'medium');
    
    return {
      width,
      height,
      boxShadow
    };
  };

  const renderBasicOffer = () => {
    const style = getOfferStyle();
    return (
      <div 
        className="bg-white border rounded-lg p-6 shadow-sm flex flex-col justify-between"
        style={style}
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {offerData.offerTitle || 'Your Offer Title'}
          </h2>
          <p className="text-gray-600 mb-6">
            {offerData.description || 'Your offer description will appear here...'}
          </p>
        </div>
        <Button className="w-full">
          {offerData.ctaButton || 'Get Started'}
        </Button>
      </div>
    );
  };

  const renderPremiumOffer = () => {
    const style = getOfferStyle();
    return (
      <div 
        className="relative bg-white border rounded-lg overflow-hidden shadow-lg flex flex-col justify-between"
        style={{
          ...style,
          backgroundImage: offerData.backgroundImage 
            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${offerData.backgroundImage})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="p-6 text-white relative flex-1 flex flex-col justify-between">
          {offerData.badge && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white">
              {offerData.badge}
            </Badge>
          )}
          <div>
            <h2 className="text-2xl font-bold mb-3">
              {offerData.offerTitle || 'Premium Offer Title'}
            </h2>
            <p className="text-gray-200 mb-6">
              {offerData.description || 'Your premium offer description will appear here...'}
            </p>
          </div>
          <Button variant="secondary" className="w-full">
            {offerData.ctaButton || 'Learn More'}
          </Button>
        </div>
      </div>
    );
  };

  const renderPromotionalOffer = () => {
    const style = getOfferStyle();
    return (
      <div 
        className="bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-lg p-6 shadow-lg flex flex-col justify-between"
        style={style}
      >
        <div className="text-center flex-1 flex flex-col justify-between">
          <div>
            {offerData.discount && (
              <Badge className="bg-yellow-400 text-black text-lg font-bold mb-2">
                {offerData.discount}
              </Badge>
            )}
            <h2 className="text-2xl font-bold mb-2">
              {offerData.offerTitle || 'Special Promotion'}
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
          </div>
          <Button variant="secondary" className="w-full bg-white text-orange-500 hover:bg-gray-100">
            {offerData.ctaButton || 'Claim Offer'}
          </Button>
        </div>
      </div>
    );
  };

  const generateInlineStyles = (element: React.ReactElement): string => {
    const style = getOfferStyle();
    const inlineStyle = `width: ${style.width}; height: ${style.height}; box-shadow: ${style.boxShadow};`;
    
    switch (offerData.templateType) {
      case 'basic':
        return `<div style="${inlineStyle} background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
  <div>
    <h2 style="font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 12px;">
      ${offerData.offerTitle || 'Your Offer Title'}
    </h2>
    <p style="color: #6b7280; margin-bottom: 24px;">
      ${offerData.description || 'Your offer description will appear here...'}
    </p>
  </div>
  <button style="width: 100%; background: #3b82f6; color: white; padding: 8px 16px; border-radius: 6px; border: none; font-weight: 500;">
    ${offerData.ctaButton || 'Get Started'}
  </button>
</div>`;

      case 'premium':
        const bgImage = offerData.backgroundImage 
          ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${offerData.backgroundImage})`
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        return `<div style="${inlineStyle} position: relative; background: white; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background-image: ${bgImage}; background-size: cover; background-position: center; display: flex; flex-direction: column; justify-content: space-between;">
  <div style="padding: 24px; color: white; position: relative; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
    ${offerData.badge ? `<span style="position: absolute; top: 16px; right: 16px; background: #ef4444; color: white; padding: 4px 10px; border-radius: 16px; font-size: 12px; font-weight: 600;">${offerData.badge}</span>` : ''}
    <div>
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 12px;">
        ${offerData.offerTitle || 'Premium Offer Title'}
      </h2>
      <p style="color: #d1d5db; margin-bottom: 24px;">
        ${offerData.description || 'Your premium offer description will appear here...'}
      </p>
    </div>
    <button style="width: 100%; background: #f3f4f6; color: #374151; padding: 8px 16px; border-radius: 6px; border: none; font-weight: 500;">
      ${offerData.ctaButton || 'Learn More'}
    </button>
  </div>
</div>`;

      case 'promotional':
        return `<div style="${inlineStyle} background: linear-gradient(to right, #fb923c, #ef4444); color: white; border-radius: 8px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
  <div style="text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
    <div>
      ${offerData.discount ? `<span style="background: #facc15; color: black; padding: 4px 10px; border-radius: 16px; font-size: 18px; font-weight: bold; margin-bottom: 8px; display: inline-block;">${offerData.discount}</span>` : ''}
      <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">
        ${offerData.offerTitle || 'Special Promotion'}
      </h2>
      ${offerData.subtitle ? `<p style="color: #fed7aa; font-size: 14px; margin-bottom: 12px;">${offerData.subtitle}</p>` : ''}
      <p style="color: #fed7aa; margin-bottom: 16px;">
        ${offerData.description || 'Don\'t miss this amazing promotional offer...'}
      </p>
      ${offerData.price ? `<div style="font-size: 32px; font-weight: bold; margin-bottom: 16px;">${offerData.price}</div>` : ''}
    </div>
    <button style="width: 100%; background: white; color: #fb923c; padding: 8px 16px; border-radius: 6px; border: none; font-weight: 500;">
      ${offerData.ctaButton || 'Claim Offer'}
    </button>
  </div>
</div>`;

      default:
        return '';
    }
  };

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
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Preview</h3>
        {offerData.templateType && (
          <RadioGroup
            value={viewSource ? 'source' : 'preview'}
            onValueChange={(value) => setViewSource(value === 'source')}
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="preview" id="preview" />
              <Label htmlFor="preview" className="text-sm">Preview</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="source" id="source" />
              <Label htmlFor="source" className="text-sm">Source</Label>
            </div>
          </RadioGroup>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        {viewSource ? (
          <div className="bg-gray-100 p-4 rounded border h-full">
            <pre className="text-sm overflow-auto whitespace-pre-wrap">
              {generateInlineStyles(renderPreview())}
            </pre>
          </div>
        ) : (
          <div className="flex justify-center items-start">
            {renderPreview()}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferPreview;
