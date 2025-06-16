
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import OfferTemplateSelector from '@/components/OfferTemplateSelector';
import OfferPreview from '@/components/OfferPreview';
import ImageBrowser from '@/components/ImageBrowser';

export interface OfferData {
  // Offer Metadata
  title: string;
  description: string;
  templateType: string;
  startDate?: Date;
  endDate?: Date;
  
  // Offer-specific fields (dynamic based on template type)
  offerTitle?: string;
  ctaButton?: string;
  backgroundImage?: string;
  badge?: string;
  subtitle?: string;
  price?: string;
  discount?: string;
  
  // Dimensions and styling
  width?: number;
  height?: number;
  useFullWidth?: boolean;
  dropShadow?: string;
}

const CreateOffer = () => {
  const [offerData, setOfferData] = useState<OfferData>({
    title: '',
    description: '',
    templateType: '',
    width: 400,
    height: 420,
    useFullWidth: false,
    dropShadow: 'medium'
  });

  const updateOfferData = (field: keyof OfferData, value: string | Date | number | boolean | undefined) => {
    setOfferData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Offer Data:', offerData);
  };

  const renderOfferContentFields = () => {
    if (!offerData.templateType) return null;

    switch (offerData.templateType) {
      case 'basic':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="offerTitle">Offer Title</Label>
              <Input
                id="offerTitle"
                value={offerData.offerTitle || ''}
                onChange={(e) => updateOfferData('offerTitle', e.target.value)}
                placeholder="Enter offer title"
              />
            </div>
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
              <Label htmlFor="offerTitle">Offer Title</Label>
              <Input
                id="offerTitle"
                value={offerData.offerTitle || ''}
                onChange={(e) => updateOfferData('offerTitle', e.target.value)}
                placeholder="Enter offer title"
              />
            </div>
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
              <Label htmlFor="backgroundImage">Background Image</Label>
              <ImageBrowser
                value={offerData.backgroundImage || ''}
                onChange={(value) => updateOfferData('backgroundImage', value)}
                placeholder="Select or enter background image URL"
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
              <Label htmlFor="offerTitle">Offer Title</Label>
              <Input
                id="offerTitle"
                value={offerData.offerTitle || ''}
                onChange={(e) => updateOfferData('offerTitle', e.target.value)}
                placeholder="Enter offer title"
              />
            </div>
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

  const renderDimensionFields = () => (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Label htmlFor="width">Width (px)</Label>
          <Input
            id="width"
            type="number"
            value={offerData.width || 400}
            onChange={(e) => updateOfferData('width', parseInt(e.target.value))}
            disabled={offerData.useFullWidth}
          />
        </div>
        <div className="flex items-center space-x-2 mt-6">
          <Checkbox
            id="fullWidth"
            checked={offerData.useFullWidth}
            onCheckedChange={(checked) => updateOfferData('useFullWidth', checked)}
          />
          <Label htmlFor="fullWidth">Full width</Label>
        </div>
      </div>
      
      <div>
        <Label htmlFor="height">Height (px)</Label>
        <Input
          id="height"
          type="number"
          value={offerData.height || 420}
          onChange={(e) => updateOfferData('height', parseInt(e.target.value))}
        />
      </div>
      
      <div>
        <Label>Drop Shadow</Label>
        <RadioGroup
          value={offerData.dropShadow || 'medium'}
          onValueChange={(value) => updateOfferData('dropShadow', value)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create new offer</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className={`grid gap-8 ${offerData.templateType ? 'grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
            {/* Left Column - Form */}
            <div className="space-y-6">
              {/* Offer Metadata Section */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Offer Metadata</h3>
                  
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Start Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !offerData.startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {offerData.startDate ? format(offerData.startDate, "PPP") : <span>Pick start date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={offerData.startDate}
                            onSelect={(date) => updateOfferData('startDate', date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !offerData.endDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {offerData.endDate ? format(offerData.endDate, "PPP") : <span>Pick end date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={offerData.endDate}
                            onSelect={(date) => updateOfferData('endDate', date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Offer Information Section with Tabs */}
              {offerData.templateType && (
                <Card className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Offer Information</h3>
                    
                    <Tabs defaultValue="content" className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="content">Content</TabsTrigger>
                        <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="space-y-4">
                        {renderOfferContentFields()}
                      </TabsContent>
                      
                      <TabsContent value="dimensions" className="space-y-4">
                        {renderDimensionFields()}
                      </TabsContent>
                    </Tabs>
                  </div>
                </Card>
              )}

              <Button type="submit" className="w-full" disabled={!offerData.templateType}>
                Submit Offer
              </Button>
            </div>

            {/* Right Column - Preview */}
            {offerData.templateType && (
              <div className="h-screen sticky top-6">
                <Card className="p-6 h-full flex flex-col">
                  <OfferPreview offerData={offerData} />
                </Card>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOffer;
