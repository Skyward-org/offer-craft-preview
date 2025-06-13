
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TemplateOption {
  id: string;
  name: string;
  description: string;
  preview: string;
  fields: string[];
}

const templates: TemplateOption[] = [
  {
    id: 'basic',
    name: 'Basic Offer',
    description: 'Simple offer with title, description, and CTA button',
    preview: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
    fields: ['Title', 'Description', 'CTA Button']
  },
  {
    id: 'premium',
    name: 'Premium Offer',
    description: 'Enhanced offer with background image and badge',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop',
    fields: ['Title', 'Description', 'CTA Button', 'Background Image', 'Badge']
  },
  {
    id: 'promotional',
    name: 'Promotional Offer',
    description: 'Special promotional offer with pricing and discount',
    preview: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
    fields: ['Title', 'Description', 'CTA Button', 'Subtitle', 'Price', 'Discount']
  }
];

interface OfferTemplateSelectorProps {
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
}

const OfferTemplateSelector: React.FC<OfferTemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateSelect
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTemplateSelect = (templateId: string) => {
    onTemplateSelect(templateId);
    setIsModalOpen(false);
  };

  const selectedTemplateName = templates.find(t => t.id === selectedTemplate)?.name || 'None selected';

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          Selected: <span className="font-medium">{selectedTemplateName}</span>
        </span>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Browse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Choose an Offer Template</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedTemplate === template.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default OfferTemplateSelector;
