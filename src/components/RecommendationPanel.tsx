
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { generateCopilotPrompt, sendToCopilot } from "@/utils/copilotPromptGenerator";

interface EmotionData {
  emotion: string;
  percentage: number;
  color: string;
}

const mockEmotions: EmotionData[] = [
  { emotion: "Happy", percentage: 45, color: "bg-green-500" },
  { emotion: "Neutral", percentage: 30, color: "bg-blue-500" },
  { emotion: "Confused", percentage: 15, color: "bg-amber-500" },
  { emotion: "Anxious", percentage: 10, color: "bg-red-500" },
];

interface Recommendation {
  id: string;
  title: string;
  content: string;
}

const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    title: "Responding to Happiness",
    content: "When the individual shows happiness, this is an opportunity for positive reinforcement. Acknowledge their joy verbally and consider using this moment to build social connections. For example, you might say: \"I see you're happy! That's wonderful. What are you enjoying right now?\""
  },
  {
    id: "rec-2",
    title: "Handling Confusion",
    content: "When signs of confusion appear, simplify your communication. Use clear, direct language without idioms or figures of speech. Consider visual supports to complement verbal information. Allow extra processing time and check for understanding by asking simple yes/no questions."
  },
  {
    id: "rec-3",
    title: "Managing Anxiety",
    content: "When anxiety is detected, first ensure the environment is not overstimulating (reduce noise, bright lights, etc). Offer a quiet space if needed. Use calming, predictable language and consider introducing a familiar comfort item or activity. Deep breathing exercises may help in some cases."
  },
  {
    id: "rec-4",
    title: "Supporting Transitions",
    content: "Transitions between activities can be challenging. Use visual schedules to show what's happening now and what's coming next. Give advance notice before transitions, using timers if helpful. Maintain consistent routines when possible, and acknowledge the difficulty when routines must change."
  }
];

interface RecommendationPanelProps {
  videoSource: string;
}

export default function RecommendationPanel({ videoSource }: RecommendationPanelProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [copilotPrompt, setCopilotPrompt] = useState("");
  const [showingCopilotPrompt, setShowingCopilotPrompt] = useState(false);

  useEffect(() => {
    if (!videoSource) return;

    // Reset on new video
    setIsLoading(true);
    setRecommendations([]);

    // Simulate loading recommendations
    const timer = setTimeout(() => {
      setRecommendations(mockRecommendations);
      
      // Generate Copilot prompt based on emotions
      const prompt = generateCopilotPrompt(mockEmotions);
      setCopilotPrompt(prompt);
      
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, [videoSource]);

  const handleCopilotPromptToggle = () => {
    setShowingCopilotPrompt(!showingCopilotPrompt);
  };

  if (!videoSource) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center md:text-left">Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm animate-pulse-gentle">
              Generating personalized recommendations based on emotional analysis...
            </p>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Based on the emotional patterns observed in the video, here are some suggested approaches:
            </p>
            <Accordion type="single" collapsible className="w-full">
              {recommendations.map((rec) => (
                <AccordionItem key={rec.id} value={rec.id}>
                  <AccordionTrigger className="text-sm font-medium">{rec.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">{rec.content}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="pt-6 border-t mt-6">
              <h3 className="text-md font-medium mb-3">Microsoft Copilot Integration</h3>
              <p className="text-sm text-muted-foreground mb-4">
                These emotions can be analyzed further using Microsoft Copilot for more detailed recommendations.
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
