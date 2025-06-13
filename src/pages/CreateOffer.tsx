
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import OfferTemplateSelector from '@/components/OfferTemplateSelector';
import OfferPreview from '@/components/OfferPreview';

export interface OfferData {
  title: string;
  description: string;
  templateType: string;
  // Dynamic fields based on template type
  ctaButton?: string;
  backgroundImage?: string;
  badge?: string;
  subtitle?: string;
  price?: string;
  discount?: string;
}

const CreateOffer = () => {
  const [offerData, setOfferData] = useState<OfferData>({
    title: '',
    description: '',
    templateType: ''
  });

  const updateOfferData = (field: keyof OfferData, value: string) => {
    setOfferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offer Data:', offerData);
  };

  const renderDynamicFields = () => {
    if (!offerData.templateType) return null;

    switch (offerData.templateType) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaButton">CTA Button Text</Label>
              <Input
                id="ctaButton"
                value={offerData.ctaButton || ''}
                onChange={(e) => updateOfferData('ctaButton', e.target.value)}
                placeholder="Get Started"
              />
            </div>
          </div>
        );
      
      case 'premium':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaButton">CTA Button Text</Label>
              <Input
                id="ctaButton"
                value={offerData.ctaButton || ''}
                onChange={(e) => updateOfferData('ctaButton', e.target.value)}
                placeholder="Learn More"
              />
            </div>
            <div>
              <Label htmlFor="backgroundImage">Background Image URL</Label>
              <Input
                id="backgroundImage"
                value={offerData.backgroundImage || ''}
                onChange={(e) => updateOfferData('backgroundImage', e.target.value)}
                placeholder="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              />
            </div>
            <div>
              <Label htmlFor="badge">Badge Text</Label>
              <Input
                id="badge"
                value={offerData.badge || ''}
                onChange={(e) => updateOfferData('badge', e.target.value)}
                placeholder="New"
              />
            </div>
          </div>
        );
      
      case 'promotional':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="ctaButton">CTA Button Text</Label>
              <Input
                id="ctaButton"
                value={offerData.ctaButton || ''}
                onChange={(e) => updateOfferData('ctaButton', e.target.value)}
                placeholder="Claim Offer"
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={offerData.subtitle || ''}
                onChange={(e) => updateOfferData('subtitle', e.target.value)}
                placeholder="Limited Time Only"
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                value={offerData.price || ''}
                onChange={(e) => updateOfferData('price', e.target.value)}
                placeholder="$99"
              />
            </div>
            <div>
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                value={offerData.discount || ''}
                onChange={(e) => updateOfferData('discount', e.target.value)}
                placeholder="50% OFF"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create new offer</h1>
        
        <div className={`grid gap-8 ${offerData.templateType ? 'grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
          {/* Form Section */}
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={offerData.title}
                  onChange={(e) => updateOfferData('title', e.target.value)}
                  placeholder="Enter offer title"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={offerData.description}
                  onChange={(e) => updateOfferData('description', e.target.value)}
                  placeholder="Enter offer description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label>Offer Template</Label>
                <OfferTemplateSelector
                  selectedTemplate={offerData.templateType}
                  onTemplateSelect={(templateType) => updateOfferData('templateType', templateType)}
                />
              </div>

              {renderDynamicFields()}

              <Button type="submit" className="w-full" disabled={!offerData.templateType}>
                Submit Offer
              </Button>
            </form>
          </Card>

          {/* Preview Section */}
          {offerData.templateType && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Preview</h3>
              <OfferPreview offerData={offerData} />
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateOffer;
