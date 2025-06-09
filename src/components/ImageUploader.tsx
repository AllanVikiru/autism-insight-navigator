
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Image } from "lucide-react";

interface ImageUploaderProps {
  onImageSelected: (imageSource: string) => void;
}

export default function ImageUploader({ onImageSelected }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid image file.",
      });
      return;
    }

    setIsUploading(true);
    // Create a blob URL for the image file
    const imageSource = URL.createObjectURL(file);
    setTimeout(() => {
      onImageSelected(imageSource);
      setIsUploading(false);
    }, 1500);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className={`border-2 ${dragActive ? 'border-brand-400 bg-brand-50' : 'border-dashed'} transition-all duration-200`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center h-full min-h-[240px]">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="mb-4 rounded-full bg-brand-100 p-3">
            <Image className="h-6 w-6 text-brand-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload an Image</h3>
          <p className="text-sm text-gray-500 mb-4">
            Drag and drop your image file here or click to browse
          </p>
          <Button 
            onClick={triggerFileInput} 
            disabled={isUploading}
            className="bg-brand-600 hover:bg-brand-700"
          >
            {isUploading ? "Uploading..." : "Select Image"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
