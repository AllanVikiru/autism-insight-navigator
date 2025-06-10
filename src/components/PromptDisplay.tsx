
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generatePromptText } from "@/utils/promptUtils";

interface PromptDisplayProps {
  predominantEmotion: string;
}

export default function PromptDisplay({ predominantEmotion }: PromptDisplayProps) {
  const { toast } = useToast();
  
  if (!predominantEmotion) {
    return null;
  }

  const promptText = generatePromptText(predominantEmotion);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      toast({
        title: "Copied!",
        description: "Prompt has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy text: ", err);
      toast({
        title: "Copy failed",
        description: "Please manually select and copy the text.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Microsoft Copilot Alternative
          <Button 
            onClick={copyToClipboard}
            variant="outline" 
            size="sm"
            className="flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Prompt
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          In case of any errors in recommendation generation, you can copy and paste this prompt to Microsoft Copilot for assistance:
        </p>
        
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200 max-h-64 overflow-y-auto">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans text-slate-700">
            {promptText}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
