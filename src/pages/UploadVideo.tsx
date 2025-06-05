
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoUploader from "@/components/VideoUploader";
import { Button } from "@/components/ui/button";

const UploadVideo = () => {
  const [videoSource, setVideoSource] = useState("");
  const [videoType, setVideoType] = useState<"file" | "url">("file");
  const navigate = useNavigate();

  const handleVideoSelected = (source: string, type: "file" | "url") => {
    setVideoSource(source);
    setVideoType(type);
    // Store video data in sessionStorage to access across pages
    sessionStorage.setItem("videoSource", source);
    sessionStorage.setItem("videoType", type);
    navigate("/analyze");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-teal/10 to-white py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-navy mb-6">
                Understand Emotions, Support Better
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                Upload a video to analyze emotional expressions and get personalized recommendations for supporting individuals with autism.
              </p>
              
              <VideoUploader onVideoSelected={handleVideoSelected} />
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-navy">How It Works</h2>
              <p className="text-gray-600 mb-12">
                Our platform helps bridge the emotional understanding gap for better support of individuals with autism.
              </p>
              
              <div className="grid gap-8 md:grid-cols-3">
                <div className="flex flex-col items-center">
                  <div className="bg-teal/20 text-navy rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-navy">Upload Video</h3>
                  <p className="text-sm text-gray-600">
                    Upload a video or provide a URL to a video showing interactions with the individual.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-orange/20 text-navy rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-navy">Analyze Emotions</h3>
                  <p className="text-sm text-gray-600">
                    Our system analyzes the video to identify emotional patterns and expressions.
                  </p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="bg-red/20 text-navy rounded-full w-12 h-12 flex items-center justify-center mb-4 font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-navy">Get Recommendations</h3>
                  <p className="text-sm text-gray-600">
                    Receive personalized suggestions for better communication and support strategies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UploadVideo;
