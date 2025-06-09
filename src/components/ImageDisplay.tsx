
import { Card, CardContent } from "@/components/ui/card";

interface ImageDisplayProps {
  imageSource: string;
}

export default function ImageDisplay({ imageSource }: ImageDisplayProps) {
  if (!imageSource) {
    return null;
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center">
          <img 
            src={imageSource} 
            alt="Uploaded image for emotion analysis" 
            className="max-w-full max-h-96 object-contain rounded-lg shadow-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
