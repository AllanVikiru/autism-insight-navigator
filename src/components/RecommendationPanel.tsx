
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { generateCopilotPrompt } from "@/utils/copilotPromptGenerator";

interface RecommendationPanelProps {
  imageSource: string;
  predominantEmotion?: string;
}

export default function RecommendationPanel({ imageSource, predominantEmotion }: RecommendationPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [showingCopilotPrompt, setShowingCopilotPrompt] = useState(false);

  useEffect(() => {
    if (!imageSource) return;

    // Reset on new image
    setIsLoading(true);

    // Simulate loading and generate Copilot prompt
    const timer = setTimeout(() => {
      if (predominantEmotion) {
        // Generate Copilot prompt based on the predominant emotion
        const prompt = generateCopilotPrompt([{ emotion: predominantEmotion, percentage: 100 }]);
        setCopilotPrompt(prompt);
      } else {
        setCopilotPrompt("No emotion detected. Please try analyzing the image again.");
      }
      
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [imageSource, predominantEmotion]);

  const handleCopilotPromptToggle = () => {
    setShowingCopilotPrompt(!showingCopilotPrompt);
  };

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
              Generating Microsoft Copilot prompt based on detected emotion...
            </p>
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Microsoft Copilot Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {predominantEmotion ? 
                  `Based on the detected emotion "${predominantEmotion}", get personalized recommendations using Microsoft Copilot.` :
                  "No clear emotion was detected. You can still use the general prompt below for guidance."
                }
              </p>
              
              <Button 
                onClick={handleCopilotPromptToggle} 
                variant="outline" 
                className="mb-4"
              >
                {showingCopilotPrompt ? "Hide Copilot Prompt" : "Show Copilot Prompt"}
              </Button>
              
              {showingCopilotPrompt && (
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200 mt-2">
                  <h4 className="text-sm font-medium mb-2">Generated Microsoft Copilot Prompt:</h4>
                  <pre className="text-xs bg-slate-100 p-3 rounded-md whitespace-pre-wrap overflow-x-auto">
                    {copilotPrompt}
                  </pre>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>To use this prompt:</p>
                    <ol className="list-decimal pl-5 mt-2 space-y-1">
                      <li>Copy the text above</li>
                      <li>Paste it into Microsoft Copilot</li>
                      <li>Review and implement the recommendations provided</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
