
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Offer Creator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Create beautiful, customizable offers with real-time preview and multiple templates
        </p>
        <Button 
          size="lg" 
          onClick={() => navigate('/create-offer')}
          className="px-8 py-3 text-lg"
        >
          Create New Offer
        </Button>
      </div>
    </div>
  );
};

export default Index;
