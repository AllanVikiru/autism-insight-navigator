import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { client } from "@gradio/client";

interface EmotionData {
  emotion: string;
  percentage: number;
  color: string;
}

interface EmotionAnalysisProps {
  imageSource: string;
  onAnalysisComplete?: (predominantEmotion?: string) => void;
}

// API endpoint configuration
const API_ENDPOINT = "ElenaRyumina/Facial_Expression_Recognition";
const FUNCTION_NAME = "/preprocess_image_and_predict";

// Color mapping for emotions
const emotionColorMap: Record<string, string> = {
  "Happy": "bg-green-500",
  "Happiness": "bg-green-500",
  "Joy": "bg-green-500",
  "Neutral": "bg-blue-500",
  "Surprised": "bg-yellow-500",
  "Surprise": "bg-yellow-500",
  "Sad": "bg-gray-500",
  "Sadness": "bg-gray-500",
  "Angry": "bg-red-500",
  "Anger": "bg-red-500",
  "Fear": "bg-purple-500",
  "Fearful": "bg-purple-500",
  "Disgust": "bg-orange-500",
  "Disgusted": "bg-orange-500",
  "Contempt": "bg-indigo-500"
};

// Utility function to round a number to 2 decimal places
function round(value: number, decimals: number = 2): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals);
}

export default function EmotionAnalysis({ imageSource, onAnalysisComplete }: EmotionAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [predominantEmotion, setPredominantEmotion] = useState<string>("");

  const processApiResponse = (apiEmotions: any): { emotions: EmotionData[], predominant: string } => {
    console.log("Processing API emotions:", apiEmotions);
    
    // Check if we have the specific format with label at index 2
    if (Array.isArray(apiEmotions) && apiEmotions.length > 2 && apiEmotions[2]?.label) {
      const predominantEmotion = apiEmotions[2].label;
      const percentage = apiEmotions[2].confidences[0].confidence;
      console.log("Predominant emotion detected:", predominantEmotion);
      
      // Get color for the emotion, default to blue if not found
      const color = emotionColorMap[predominantEmotion] || emotionColorMap[predominantEmotion.toLowerCase()] || "bg-blue-500";
      
      // Return the predominant emotion with 100% confidence
      return {
        emotions: [{
          emotion: `Predominant emotion detected: ${predominantEmotion}`,
          percentage: round(percentage * 100, 2), // Convert to percentage
          color: color
        }],
        predominant: predominantEmotion
      };
    }
    
    // If we can't parse the response, return empty array
    console.warn("Could not parse API response format:", apiEmotions);
    return { emotions: [], predominant: "" };
  };

  const analyzeImage = async (imageBlob: Blob) => {
    try {
      console.log("Starting emotion analysis with API:", API_ENDPOINT);
      console.log("Function name:", FUNCTION_NAME);
      
      // Initialize Gradio client
      const app = await client(API_ENDPOINT);
      console.log("Gradio client initialized successfully");
      
      // Make API call with the uploaded image
      const result = await app.predict(FUNCTION_NAME, [
        imageBlob, // blob in 'Original image' Image component
      ]);
      
      console.log("API response:", result.data);
      
      // Process the API response and convert to our emotion format
      const apiEmotions = result.data;
      const { emotions: processedEmotions, predominant } = processApiResponse(apiEmotions);
      
      // If no emotions were processed, show fallback data with a warning
      if (processedEmotions.length === 0) {
        console.warn("No emotions detected from API response, using fallback data");
        setError("Emotions detected but format may be unexpected. Please check console for details.");
        
        // Fallback data for display
        const fallbackEmotions: EmotionData[] = [
          { emotion: "Analysis Complete", percentage: 100, color: "bg-blue-500" }
        ];
        setEmotions(fallbackEmotions);
        setPredominantEmotion("");
      } else {
        setEmotions(processedEmotions);
        setPredominantEmotion(predominant);
        setError(null);
      }
      
      setIsAnalyzing(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete(predominant);
      }
    } catch (apiError) {
      console.error("API call failed:", apiError);
      setError("Failed to analyze image. Please try again.");
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (!imageSource) return;

    setIsAnalyzing(true);
    setEmotions([]);
    setError(null);
    setPredominantEmotion("");

    // Convert image source to blob for analysis
    fetch(imageSource)
      .then(response => response.blob())
      .then(blob => analyzeImage(blob))
      .catch(err => {
        console.error("Error fetching image:", err);
        setError("Failed to load image. Please try again.");
        setIsAnalyzing(false);
      });
  }, [imageSource, onAnalysisComplete]);

  if (!imageSource) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center md:text-left">Emotion Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        {isAnalyzing ? (
          <div className="space-y-4 py-8">
            <div className="text-center">
              <p className="text-muted-foreground animate-pulse-gentle">
                Analyzing facial expressions using {API_ENDPOINT}...
              </p>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              The analysis shows the emotions detected in the facial expression.
            </p>
            {emotions.map((item) => (
              <div key={item.emotion} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.emotion}</span>
                  <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                </div>
                <Progress value={item.percentage} className={`h-2 ${item.color}`} />
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
