
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageDisplay from "@/components/ImageDisplay";
import EmotionAnalysis from "@/components/EmotionAnalysis";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AnalyzeImage = () => {
  const [imageSource, setImageSource] = useState("");
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve image data from sessionStorage
    const storedSource = sessionStorage.getItem("imageSource");
    
    if (!storedSource) {
      // If no image data is found, redirect to upload page
      navigate("/");
      return;
    }
    
    setImageSource(storedSource);
  }, [navigate]);

  // This function will be called when emotion analysis is complete
  const handleAnalysisComplete = () => {
    setIsAnalysisComplete(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-white">
        <div className="container py-8">
          <div className="flex justify-between items-center mb-8">
            <Button 
              onClick={() => navigate("/")} 
              variant="ghost" 
              size="sm"
              className="flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Upload
            </Button>
            
            <Button 
              onClick={() => navigate("/recommendations")} 
              disabled={!isAnalysisComplete}
              className="flex items-center bg-brand-600 hover:bg-brand-700"
            >
              View Recommendations
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Emotion Analysis</h1>
            
            {imageSource && (
              <>
                <div className="mb-8">
                  <ImageDisplay imageSource={imageSource} />
                </div>
                
                <div className="mb-8">
                  <EmotionAnalysis 
                    imageSource={imageSource} 
                    onAnalysisComplete={handleAnalysisComplete}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AnalyzeImage;
