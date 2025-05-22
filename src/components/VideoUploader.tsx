
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Video } from "lucide-react";

interface VideoUploaderProps {
  onVideoSelected: (videoSource: string, videoType: "file" | "url") => void;
}

export default function VideoUploader({ onVideoSelected }: VideoUploaderProps) {
  const [videoUrl, setVideoUrl] = useState("");
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
    if (!file.type.startsWith("video/")) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a valid video file.",
      });
      return;
    }

    setIsUploading(true);
    // Create a blob URL for the video file
    const videoSource = URL.createObjectURL(file);
    setTimeout(() => {
      onVideoSelected(videoSource, "file");
      setIsUploading(false);
    }, 1500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      toast({
        variant: "destructive",
        title: "No URL provided",
        description: "Please enter a valid video URL.",
      });
      return;
    }

    setIsUploading(true);
    // For demo purposes, we'll just pass the URL directly
    // In a real app, you'd validate the URL and possibly fetch some metadata
    setTimeout(() => {
      onVideoSelected(videoUrl, "url");
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
      <div className="grid gap-6 md:grid-cols-2">
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
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="mb-4 rounded-full bg-brand-100 p-3">
              <Video className="h-6 w-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload a Video</h3>
            <p className="text-sm text-gray-500 mb-4">
              Drag and drop your video file here or click to browse
            </p>
            <Button 
              onClick={triggerFileInput} 
              disabled={isUploading}
              className="bg-brand-600 hover:bg-brand-700"
            >
              {isUploading ? "Uploading..." : "Select File"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 h-full flex flex-col justify-between min-h-[240px]">
            <div>
              <h3 className="text-lg font-semibold mb-2">Enter Video URL</h3>
              <p className="text-sm text-gray-500 mb-4">
                Paste a link to a YouTube or other video hosting platform
              </p>
            </div>
            <form onSubmit={handleUrlSubmit} className="space-y-4">
              <Input
                type="url"
                placeholder="https://example.com/video.mp4"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full"
              />
              <Button 
                type="submit" 
                disabled={isUploading || !videoUrl.trim()}
                className="w-full bg-brand-600 hover:bg-brand-700"
              >
                {isUploading ? "Processing..." : "Analyze Video"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
