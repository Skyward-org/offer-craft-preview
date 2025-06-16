
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
  
  // Sample Unsplash images from the placeholder_images context
  const unsplashImages = [
    { id: 'photo-1649972904349-6e44c42644a7', url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', description: 'Woman with laptop' },
    { id: 'photo-1488590528505-98d2b5aba04b', url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', description: 'Gray laptop computer' },
    { id: 'photo-1518770660439-4636190af475', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', description: 'Circuit board' },
    { id: 'photo-1461749280684-dccba630e2f6', url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', description: 'Java programming' },
    { id: 'photo-1486312338219-ce68d2c6f44d', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', description: 'Person using MacBook' },
    { id: 'photo-1581091226825-a6a2a5aee158', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop', description: 'Woman with laptop' },
    { id: 'photo-1485827404703-89b55fcc595e', url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop', description: 'White robot' },
    { id: 'photo-1526374965328-7f61d4dc18c5', url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop', description: 'Matrix style' },
    { id: 'photo-1531297484001-80022131f5a1', url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop', description: 'Laptop on surface' },
    { id: 'photo-1487058792275-0ad4aaf24ca7', url: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop', description: 'Colorful code' }
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
              <DialogTitle>Select Image</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
              {unsplashImages.map((image) => (
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
