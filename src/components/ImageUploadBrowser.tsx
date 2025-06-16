
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

interface ImageUploadBrowserProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ImageUploadBrowser: React.FC<ImageUploadBrowserProps> = ({
  value,
  onChange,
  placeholder = "Upload or enter image URL"
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
        <Button
          type="button"
          variant="outline"
          onClick={handleBrowseClick}
          className="px-3"
        >
          <Upload className="w-4 h-4" />
        </Button>
        {value && (
          <Button
            type="button"
            variant="outline"
            onClick={handleClear}
            className="px-3"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
      
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="w-full h-32 object-cover rounded border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadBrowser;
