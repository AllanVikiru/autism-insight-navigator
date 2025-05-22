
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  videoSource: string;
  videoType: "file" | "url";
}

export default function VideoPlayer({ videoSource, videoType }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoading(true);
    
    // Reset the loading state once the video is ready
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [videoSource]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!videoSource) {
    return null;
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0 relative">
        {isLoading && (
          <div className="aspect-video w-full flex items-center justify-center bg-gray-100">
            <Skeleton className="w-full h-full" />
          </div>
        )}
        
        <video
          ref={videoRef}
          src={videoSource}
          className={`w-full aspect-video ${isLoading ? 'hidden' : 'block'}`}
          controls={false}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />

        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <Button 
            onClick={togglePlayPause}
            variant="outline"
            size="sm"
            className={`bg-white/80 hover:bg-white backdrop-blur-sm ${isLoading ? 'hidden' : 'block'}`}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <rect width="4" height="16" x="6" y="4" />
                <rect width="4" height="16" x="14" y="4" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
            )}
            <span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
