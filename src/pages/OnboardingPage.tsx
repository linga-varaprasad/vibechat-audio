
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, User, Users, Music } from "lucide-react";

const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onboardingSteps = [
    {
      title: "Welcome to VoiceVibe",
      description: "Join live audio conversations with people around the world.",
      icon: <Mic className="w-16 h-16 text-vibe-purple mb-6" />,
    },
    {
      title: "Discover Rooms",
      description: "Explore trending topics and join conversations that interest you.",
      icon: <Music className="w-16 h-16 text-vibe-purple mb-6" />,
    },
    {
      title: "Connect with Others",
      description: "Engage with speakers or become one yourself in real-time discussions.",
      icon: <Users className="w-16 h-16 text-vibe-purple mb-6" />,
    },
    {
      title: "Create Your Profile",
      description: "Build your presence and follow your favorite speakers.",
      icon: <User className="w-16 h-16 text-vibe-purple mb-6" />,
    },
  ];

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${currentStep * 100}%)`;
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/sign-in");
    }
  };

  const handleSkip = () => {
    navigate("/sign-in");
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-8 px-4 bg-white animate-fade-in">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-vibe-purple to-vibe-purple-dark bg-clip-text text-transparent">
          VoiceVibe
        </h1>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center overflow-hidden">
        <div className="w-full max-w-md overflow-hidden">
          <div 
            ref={slideRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{ width: `${onboardingSteps.length * 100}%` }}
          >
            {onboardingSteps.map((step, index) => (
              <div 
                key={index}
                className="flex flex-col items-center px-4 text-center"
                style={{ width: `${100 / onboardingSteps.length}%` }}
              >
                {step.icon}
                <h2 className="text-2xl font-bold mb-3 text-gray-800">{step.title}</h2>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-10 space-x-2">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentStep === index ? "w-8 bg-vibe-purple" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col space-y-4 mt-8 max-w-md mx-auto w-full">
        <Button 
          onClick={handleNext}
          className="bg-vibe-purple hover:bg-vibe-purple-dark text-white w-full"
        >
          {currentStep < onboardingSteps.length - 1 ? "Next" : "Get Started"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        
        {currentStep < onboardingSteps.length - 1 && (
          <Button 
            variant="ghost" 
            onClick={handleSkip}
            className="text-gray-500"
          >
            Skip
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
