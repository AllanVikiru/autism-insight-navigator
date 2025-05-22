
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <section className="py-12 md:py-16 container">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">About EmotionInsight</h1>
            
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  EmotionInsight was created with a simple but powerful mission: to bridge the gap in emotional understanding that often exists between individuals with autism and their caregivers, teachers, and loved ones.
                </p>
                <p className="text-gray-700">
                  We believe that by providing objective analysis of emotional expressions and practical, personalized recommendations, we can help foster more effective communication and deeper connections.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <p className="text-gray-700 mb-4">
                  Our platform uses advanced emotion recognition technology to analyze videos and identify emotional patterns. The system then generates tailored recommendations based on evidence-based approaches to autism support.
                </p>
                <p className="text-gray-700">
                  This tool is intended as a supportive resource for families, educators, and therapists - not as a replacement for professional care or personalized intervention strategies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Our Team</h2>
                <p className="text-gray-700 mb-4">
                  EmotionInsight was developed by a multidisciplinary team of experts in autism support, child development, machine learning, and user experience design.
                </p>
                <p className="text-gray-700">
                  Every feature of our platform has been carefully crafted with input from autism specialists, educators, and families of individuals with autism to ensure it addresses real needs in practical ways.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Privacy & Ethics</h2>
                <p className="text-gray-700 mb-4">
                  We take privacy extremely seriously. All uploaded videos are analyzed securely and are not stored or shared unless you explicitly choose to save them to your account. Analysis is performed using privacy-respecting algorithms.
                </p>
                <p className="text-gray-700">
                  Our ethical guidelines prioritize respect for individuals with autism, avoiding deficit-based language, and recognizing neurodiversity as a natural part of human variation.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
