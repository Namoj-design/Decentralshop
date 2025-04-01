
import { Leaf, CheckCircle2, AlertCircle, Scale, Info } from "lucide-react";
import { AIVerificationResult, getEcoScoreColor, getMatchScoreColor } from "@/services/aiVerificationService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AIVerificationResultsProps {
  result: AIVerificationResult | null;
  isLoading: boolean;
}

const AIVerificationResults = ({ result, isLoading }: AIVerificationResultsProps) => {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4 p-4 border rounded-lg">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="flex space-x-2">
          <div className="h-10 w-10 rounded-full bg-gray-200"></div>
          <div className="h-10 flex-1 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { isMatching, matchScore, ecoScore, feedback, recommendations } = result;

  return (
    <div className="space-y-4">
      <Alert variant={isMatching ? "default" : "destructive"}>
        {isMatching ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
        <AlertTitle>AI Verification Result</AlertTitle>
        <AlertDescription>
          {feedback}
        </AlertDescription>
      </Alert>

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <div className="flex-1 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Scale size={18} />
            <h3 className="font-medium">Description Match</h3>
          </div>
          <div className={`text-2xl font-bold ${getMatchScoreColor(matchScore)}`}>
            {matchScore}%
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {matchScore >= 80 
              ? "Excellent match between images and description" 
              : matchScore >= 60 
                ? "Good match between images and description" 
                : "Images may not fully represent the description"}
          </p>
        </div>

        <div className="flex-1 border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Leaf size={18} />
            <h3 className="font-medium">Eco-Friendly Rating</h3>
          </div>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Leaf 
                key={i} 
                size={20} 
                className={i < ecoScore ? getEcoScoreColor(ecoScore) : "text-gray-300"} 
                fill={i < ecoScore ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {ecoScore >= 4 
              ? "Excellent eco-friendly characteristics" 
              : ecoScore >= 3 
                ? "Good eco-friendly attributes" 
                : "Could improve eco-friendliness"}
          </p>
        </div>
      </div>

      {recommendations && recommendations.length > 0 && (
        <div className="border rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={18} />
            <h3 className="font-medium">AI Recommendations</h3>
          </div>
          <ul className="list-disc pl-5 space-y-1">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-gray-600">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIVerificationResults;
