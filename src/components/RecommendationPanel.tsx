
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { generateRecommendations, isOpenAIConfigured } from "@/services/openaiService";

interface RecommendationPanelProps {
  imageSource: string;
  predominantEmotion?: string;
}

export default function RecommendationPanel({ imageSource, predominantEmotion }: RecommendationPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!imageSource) return;

    // Reset state on new image
    setIsLoading(true);
    setRecommendations("");
    setError(null);

    const generateAIRecommendations = async () => {
      if (!isOpenAIConfigured()) {
        setError("OpenAI API key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.");
        setIsLoading(false);
        return;
      }

      if (!predominantEmotion) {
        setError("No emotion detected. Please try analyzing the image again.");
        setIsLoading(false);
        return;
      }

      try {
        const result = await generateRecommendations({ predominantEmotion });
        
        if (result.success) {
          setRecommendations(result.recommendations);
        } else {
          setError(result.error || "Failed to generate recommendations");
        }
      } catch (err) {
        console.error("Error generating recommendations:", err);
        setError("An unexpected error occurred while generating recommendations");
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate a brief delay to show loading state
    const timer = setTimeout(() => {
      generateAIRecommendations();
    }, 1000);

    return () => clearTimeout(timer);
  }, [imageSource, predominantEmotion]);

  if (!imageSource) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center md:text-left">AI-Powered Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm animate-pulse-gentle">
              Generating personalized recommendations using OpenAI...
            </p>
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-16 w-3/4" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Personalized Support Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Based on the detected emotion "{predominantEmotion}", here are AI-generated recommendations for supporting your student with autism:
              </p>
              
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                    {recommendations}
                  </pre>
                </div>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="font-medium">How to use these recommendations:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Review each strategy carefully before implementing</li>
                  <li>Adapt the suggestions to your specific classroom environment</li>
                  <li>Monitor the student's response and adjust approaches as needed</li>
                  <li>Consider consulting with other support staff for comprehensive care</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
