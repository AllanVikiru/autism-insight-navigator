
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { client } from "@gradio/client";

interface EmotionData {
  emotion: string;
  percentage: number;
  color: string;
}

interface EmotionAnalysisProps {
  imageSource: string;
  onAnalysisComplete?: () => void;
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

export default function EmotionAnalysis({ imageSource, onAnalysisComplete }: EmotionAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [tabValue, setTabValue] = useState("overview");
  const [error, setError] = useState<string | null>(null);

  const processApiResponse = (apiEmotions: any): EmotionData[] => {
    console.log("Processing API emotions:", apiEmotions);
    
    // Handle different possible API response formats
    let emotionData = apiEmotions;
    
    // If the response is nested, try to extract the emotion data
    if (Array.isArray(apiEmotions) && apiEmotions.length > 0) {
      emotionData = apiEmotions[0];
    }
    
    // If it's an object with emotion properties
    if (typeof emotionData === 'object' && emotionData !== null) {
      const processedEmotions: EmotionData[] = [];
      
      // Convert object to array format
      Object.entries(emotionData).forEach(([emotion, value]) => {
        let percentage = 0;
        
        // Handle different value formats (number, string, etc.)
        if (typeof value === 'number') {
          percentage = Math.round(value * 100); // Convert decimal to percentage
        } else if (typeof value === 'string') {
          percentage = Math.round(parseFloat(value) * 100);
        }
        
        // Get color for emotion, default to gray if not found
        const color = emotionColorMap[emotion] || emotionColorMap[emotion.toLowerCase()] || "bg-gray-400";
        
        processedEmotions.push({
          emotion: emotion,
          percentage: percentage,
          color: color
        });
      });
      
      // Sort by percentage in descending order
      return processedEmotions.sort((a, b) => b.percentage - a.percentage);
    }
    
    // If we can't parse the response, return empty array
    console.warn("Could not parse API response format:", apiEmotions);
    return [];
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
      const processedEmotions = processApiResponse(apiEmotions);
      
      // If no emotions were processed, show fallback data with a warning
      if (processedEmotions.length === 0) {
        console.warn("No emotions detected from API response, using fallback data");
        setError("Emotions detected but format may be unexpected. Please check console for details.");
        
        // Fallback data for display
        const fallbackEmotions: EmotionData[] = [
          { emotion: "Analysis Complete", percentage: 100, color: "bg-blue-500" }
        ];
        setEmotions(fallbackEmotions);
      } else {
        setEmotions(processedEmotions);
        setError(null);
      }
      
      setIsAnalyzing(false);
      
      if (onAnalysisComplete) {
        onAnalysisComplete();
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
        <Tabs defaultValue="overview" value={tabValue} onValueChange={setTabValue}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
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
          </TabsContent>
          
          <TabsContent value="details" className="py-4">
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                {isAnalyzing 
                  ? "Processing detailed analysis..." 
                  : "Detailed breakdown of facial features and confidence scores."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="py-4">
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                {isAnalyzing 
                  ? "Generating insights..." 
                  : "AI-powered insights about the detected emotions and their implications."}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
