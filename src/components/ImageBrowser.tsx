
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Upload } from 'lucide-react';

interface ImageBrowserProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ImageBrowser: React.FC<ImageBrowserProps> = ({
  value,
  onChange,
  placeholder = "Select or enter image URL"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Travel and airplane themed images
  const travelImages = [
    { id: 'travel-1', url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop', description: 'Airplane wing over clouds' },
    { id: 'travel-2', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop', description: 'Tropical beach destination' },
    { id: 'travel-3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', description: 'Airplane on runway' },
    { id: 'travel-4', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop', description: 'Mountain landscape travel' },
    { id: 'travel-5', url: 'https://images.unsplash.com/photo-1502780402662-acc01917c4e6?w=400&h=300&fit=crop', description: 'Airport terminal' },
    { id: 'travel-6', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop', description: 'City skyline travel' },
    { id: 'travel-7', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop', description: 'Airplane in sky' },
    { id: 'travel-8', url: 'https://images.unsplash.com/photo-1529963183134-61a90db47edf?w=400&h=300&fit=crop', description: 'Desert travel destination' },
    { id: 'travel-9', url: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?w=400&h=300&fit=crop', description: 'Airport departure board' },
    { id: 'travel-10', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop', description: 'Forest travel destination' }
  ];

  const handleImageSelect = (imageUrl: string) => {
    onChange(imageUrl);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="px-3"
            >
              Browse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Select Travel Image</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {travelImages.map((image) => (
                <div
                  key={image.id}
                  className="cursor-pointer rounded-lg overflow-hidden border hover:border-blue-500 transition-colors"
                  onClick={() => handleImageSelect(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.description}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2 text-sm text-gray-600">
                    {image.description}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Selected image"
            className="w-full h-32 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageBrowser;
