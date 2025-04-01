
import { toast } from "sonner";

// Types for the AI verification response
export interface AIVerificationResult {
  isMatching: boolean;
  matchScore: number; // 0-100
  ecoScore: number; // 1-5
  feedback: string;
  recommendations?: string[];
}

/**
 * Simulated AI service that verifies product images match descriptions
 * and rates eco-friendliness.
 * 
 * In a real implementation, this would call an actual AI model API
 * (like OpenAI, Perplexity, or a custom Hugging Face model)
 */
export const analyzeProductListing = async (
  imageUrls: string[],
  description: string,
  title: string,
  category: string
): Promise<AIVerificationResult> => {
  // This is a simulation - in a real app, you would make an API call to an AI service
  console.log('AI analyzing images and description:', { imageUrls, description, title, category });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo purposes, generate a simulated response
  // In production, this would be the response from an actual AI model
  
  // Randomly determine if the images match the description (for demo only)
  const mockMatchScore = Math.random() * 100;
  const isMatching = mockMatchScore > 40;
  
  // Randomly assign an eco-score (for demo only)
  const ecoScore = Math.floor(Math.random() * 5) + 1; 
  
  // Generate feedback based on the scores
  let feedback = "";
  const recommendations: string[] = [];
  
  if (isMatching) {
    feedback = "The images appear to match your product description.";
  } else {
    feedback = "There may be some inconsistency between your images and description.";
    recommendations.push("Consider adding more detailed images that clearly show the product features mentioned in your description.");
  }
  
  // Add eco-friendly feedback based on the random score
  if (ecoScore >= 4) {
    feedback += " Your product appears to have excellent eco-friendly characteristics.";
  } else if (ecoScore >= 3) {
    feedback += " Your product shows good eco-friendly attributes.";
    recommendations.push("Consider highlighting sustainable materials or packaging in your description.");
  } else {
    feedback += " Your product could benefit from more eco-friendly features.";
    recommendations.push("Consider mentioning any sustainable aspects of your product in the description.");
    recommendations.push("Adding information about recyclable packaging or materials would improve your eco-rating.");
  }
  
  return {
    isMatching,
    matchScore: Math.round(mockMatchScore),
    ecoScore,
    feedback,
    recommendations: recommendations.length > 0 ? recommendations : undefined
  };
};

/**
 * Helper to get a color based on eco score
 */
export const getEcoScoreColor = (score: number): string => {
  if (score >= 4) return "text-green-600";
  if (score >= 3) return "text-lime-600";
  if (score >= 2) return "text-amber-600";
  return "text-red-600";
};

/**
 * Helper to get a color based on match score
 */
export const getMatchScoreColor = (score: number): string => {
  if (score >= 80) return "text-green-600";
  if (score >= 60) return "text-lime-600";
  if (score >= 40) return "text-amber-600";
  return "text-red-600";
};
