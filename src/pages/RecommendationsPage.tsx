
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecommendationPanel from "@/components/RecommendationPanel";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const RecommendationsPage = () => {
  const [imageSource, setImageSource] = useState("");
  const [predominantEmotion, setPredominantEmotion] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve image data and emotion from sessionStorage
    const storedSource = sessionStorage.getItem("imageSource");
    const storedEmotion = sessionStorage.getItem("predominantEmotion");
    
    if (!storedSource) {
      // If no image data is found, redirect to upload page
      navigate("/");
      return;
    }
    
    setImageSource(storedSource);
    setPredominantEmotion(storedEmotion || "");
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              onClick={() => navigate("/analyze")} 
              variant="ghost" 
              size="sm"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Analysis
            </Button>
            
            <Button 
              onClick={() => navigate("/")} 
              variant="outline"
              className="flex items-center"
            >
              Start New Analysis
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Support Recommendations</h1>
            
            <RecommendationPanel 
              imageSource={imageSource} 
              predominantEmotion={predominantEmotion}
            />
            
            <div className="mt-12 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
              <p className="text-gray-600 mb-4">
                Use the recommendations above to support your student with autism. 
                If you encounter any issues with the AI-generated recommendations, 
                you can use the Microsoft Copilot prompt provided.
              </p>
              <p className="text-gray-600 mb-4">
                Consider implementing the strategies provided and taking follow-up 
                photos to track progress over time.
              </p>
              <Button 
                onClick={() => navigate("/")} 
                className="bg-brand-600 hover:bg-brand-700"
              >
                Start a New Analysis
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendationsPage;
