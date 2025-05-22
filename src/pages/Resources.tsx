
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Resources = () => {
  const resources = [
    {
      title: "Autism Society",
      description: "Provides information, support, and advocacy for individuals with autism and their families.",
      url: "https://www.autism-society.org/",
      category: "Support Organizations"
    },
    {
      title: "Autism Speaks",
      description: "Dedicated to promoting solutions for the needs of individuals with autism and their families.",
      url: "https://www.autismspeaks.org/",
      category: "Support Organizations"
    },
    {
      title: "Social Stories",
      description: "Learn about creating social stories to help individuals with autism understand social situations.",
      url: "https://carolgraysocialstories.com/",
      category: "Communication Tools"
    },
    {
      title: "PECS (Picture Exchange Communication System)",
      description: "A visual communication system that helps individuals with autism communicate effectively.",
      url: "https://pecsusa.com/",
      category: "Communication Tools"
    },
    {
      title: "Sensory Integration Techniques",
      description: "Strategies for addressing sensory sensitivities and processing differences.",
      url: "#",
      category: "Sensory Support"
    },
    {
      title: "Visual Schedules",
      description: "Resources for creating visual schedules to support routine and transitions.",
      url: "#",
      category: "Visual Supports"
    }
  ];

  const categories = [...new Set(resources.map(r => r.category))];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50">
        <section className="py-12 md:py-16 container">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Autism Support Resources</h1>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Explore these valuable resources to enhance your understanding and support strategies for individuals with autism.
            </p>

            {categories.map(category => (
              <div key={category} className="mb-10">
                <h2 className="text-xl font-semibold mb-4 text-brand-800">{category}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {resources
                    .filter(resource => resource.category === category)
                    .map((resource, index) => (
                      <Card key={index}>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                          <p className="text-gray-600 mb-4 text-sm">{resource.description}</p>
                          <Button asChild variant="outline" size="sm">
                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                              Learn More
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}

            <div className="mt-16 text-center">
              <h2 className="text-xl font-semibold mb-4">Need more personalized help?</h2>
              <p className="text-gray-600 mb-6">
                Use our emotion analysis tool to get customized recommendations based on video analysis.
              </p>
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <Link to="/">Try Video Analysis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
