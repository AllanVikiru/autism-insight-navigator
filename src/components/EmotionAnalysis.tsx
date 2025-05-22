
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface EmotionAnalysisProps {
  videoSource: string;
}

export default function EmotionAnalysis({ videoSource }: EmotionAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [emotions, setEmotions] = useState<EmotionData[]>([]);
  const [tabValue, setTabValue] = useState("overview");

  useEffect(() => {
    if (!videoSource) return;

    // Simulate analysis process
    setIsAnalyzing(true);
    setEmotions([]);

    const timer = setTimeout(() => {
      setEmotions(mockEmotions);
      setIsAnalyzing(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [videoSource]);

  if (!videoSource) {
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
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            {isAnalyzing ? (
              <div className="space-y-4 py-8">
                <div className="text-center">
                  <p className="text-muted-foreground animate-pulse-gentle">Analyzing video emotions...</p>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">
                  The analysis shows the predominant emotions detected throughout the video.
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
          
          <TabsContent value="timeline" className="py-4">
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                {isAnalyzing 
                  ? "Generating timeline data..." 
                  : "Timeline shows how emotions change throughout the video. This is a premium feature."}
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="insights" className="py-4">
            <div className="min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                {isAnalyzing 
                  ? "Developing insights..." 
                  : "Detailed insights about emotional patterns. This is a premium feature."}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
