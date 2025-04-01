
import { useState, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Coins, Award, Gift, Star } from "lucide-react";

interface SpinWheelProps {
  onSpin: () => boolean;
}

interface WheelSegment {
  text: string;
  color: string;
  icon: React.ReactNode;
  reward: {
    type: string;
    amount: number;
  };
}

const SpinWheel = ({ onSpin }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
  const [result, setResult] = useState<WheelSegment | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const segments: WheelSegment[] = [
    {
      text: "5 Coins",
      color: "#8B5CF6", // purple
      icon: <Coins className="h-4 w-4" />,
      reward: { type: "coins", amount: 5 }
    },
    {
      text: "Try Again",
      color: "#F87171", // red
      icon: <Star className="h-4 w-4" />,
      reward: { type: "none", amount: 0 }
    },
    {
      text: "15 Coins",
      color: "#10B981", // green
      icon: <Coins className="h-4 w-4" />,
      reward: { type: "coins", amount: 15 }
    },
    {
      text: "3 Coins",
      color: "#F59E0B", // amber
      icon: <Coins className="h-4 w-4" />,
      reward: { type: "coins", amount: 3 }
    },
    {
      text: "Gift Card",
      color: "#3B82F6", // blue
      icon: <Gift className="h-4 w-4" />,
      reward: { type: "gift", amount: 20 }
    },
    {
      text: "2x Reward",
      color: "#EC4899", // pink
      icon: <Award className="h-4 w-4" />,
      reward: { type: "multiplier", amount: 2 }
    },
  ];

  useEffect(() => {
    // Generate CSS for wheel segments
    if (wheelRef.current) {
      const segmentCount = segments.length;
      const segmentAngle = 360 / segmentCount;
      
      let css = '';
      segments.forEach((_, index) => {
        const startAngle = index * segmentAngle;
        const endAngle = (index + 1) * segmentAngle;
        
        css += `
          .wheel-segment:nth-child(${index + 1}) {
            transform: rotate(${startAngle}deg);
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            z-index: ${10 - index};
          }
        `;
      });
      
      // Create style element and append to head
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [segments]);

  const handleSpin = () => {
    if (isSpinning) return;
    
    // Check if the user has enough coins
    const canSpin = onSpin();
    if (!canSpin) return;
    
    setIsSpinning(true);
    setResult(null);
    
    // Calculate random spin result
    const segmentAngle = 360 / segments.length;
    const spinAngle = Math.floor(Math.random() * segments.length);
    const extraSpins = 5; // Number of full rotations
    const totalDegree = spinAngle * segmentAngle + 360 * extraSpins;
    
    // Adjust so that the pointer points at the middle of a segment
    const adjustedDegree = totalDegree + segmentAngle / 2;
    
    // Determine which segment was selected
    const selectedIndex = segments.length - 1 - Math.floor(spinAngle % segments.length);
    const selectedSegment = segments[selectedIndex];
    
    setSpinDegree(adjustedDegree);
    
    // After the spin animation completes, show the result
    setTimeout(() => {
      setIsSpinning(false);
      setResult(selectedSegment);
      
      // Handle reward
      if (selectedSegment.reward.type === "coins") {
        // Add coins to user account in a real implementation
        toast({
          title: "You Won!",
          description: `You won ${selectedSegment.reward.amount} Eco Coins!`,
        });
      } else if (selectedSegment.reward.type === "gift") {
        toast({
          title: "You Won!",
          description: `You won a $${selectedSegment.reward.amount} Gift Card!`,
        });
      } else if (selectedSegment.reward.type === "multiplier") {
        toast({
          title: "You Won!",
          description: `You won a ${selectedSegment.reward.amount}x Reward Multiplier!`,
        });
      } else {
        toast({
          title: "Try Again",
          description: "Better luck next time!",
        });
      }
    }, 5000); // Match this with the CSS animation duration
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 mb-4">
        {/* Triangle pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[20px] border-b-gray-700 z-20"></div>
        
        {/* Wheel */}
        <div 
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden border-4 border-gray-300 shadow-lg relative"
          style={{
            transform: `rotate(${spinDegree}deg)`,
            transition: isSpinning ? 'transform 5s cubic-bezier(0.1, 0.25, 0.1, 1)' : 'none',
          }}
        >
          {segments.map((segment, index) => (
            <div 
              key={index} 
              className="wheel-segment absolute w-full h-full origin-center"
              style={{ 
                backgroundColor: segment.color,
              }}
            >
              <div 
                className="absolute w-full h-full flex items-center justify-center text-white font-bold"
                style={{ 
                  transform: `rotate(${(360 / segments.length) / 2}deg)`,
                  width: "50%", 
                  left: "50%",
                  transformOrigin: "left center",
                }}
              >
                <div className="flex flex-col items-center">
                  {segment.icon}
                  <span className="text-xs mt-1">{segment.text}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Center circle */}
          <div className="absolute inset-0 m-auto w-10 h-10 bg-white rounded-full z-10 flex items-center justify-center shadow-inner">
            <div className="w-6 h-6 bg-gray-100 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {result && !isSpinning && (
        <div className="mb-4 p-3 bg-green-50 text-center rounded-md border border-green-200">
          <p className="font-medium">
            {result.reward.type === "none" 
              ? "Better luck next time!" 
              : `You won: ${result.text}`
            }
          </p>
        </div>
      )}
      
      <Button 
        onClick={handleSpin} 
        disabled={isSpinning}
        className="mt-2"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel"}
      </Button>
    </div>
  );
};

export default SpinWheel;
