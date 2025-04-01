
import React, { useState } from 'react';
import { Star, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/use-wallet';
import { toast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  timestamp: string;
  verified: boolean;
  transactionHash?: string;
}

interface BlockchainReviewsProps {
  productId: string | number;
}

const BlockchainReviews = ({ productId }: BlockchainReviewsProps) => {
  const { isConnected, address } = useWallet();
  const [userRating, setUserRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // In a real application, these would be fetched from the blockchain
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      user: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      rating: 5,
      comment: 'This product exceeded my expectations. The quality is outstanding and delivery was prompt.',
      timestamp: '2023-05-15T14:22:10Z',
      verified: true,
      transactionHash: '0x8a7d953f45ba71f793820d8c9f6a3c831720a5be752b15dad850fe118f8f1c0c'
    },
    {
      id: '2',
      user: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
      rating: 4,
      comment: 'Very good product, but shipping took a bit longer than expected.',
      timestamp: '2023-05-10T09:45:33Z',
      verified: true,
      transactionHash: '0x793538ca08f082b8858e0b0e7017192639f914beaacb772cf0224bd52ce36849'
    },
    {
      id: '3',
      user: '0x8B3392483BA26D65E331dB86D4F430aE0FE1C89A',
      rating: 3,
      comment: 'Product is okay, but I expected better quality considering the price.',
      timestamp: '2023-05-01T18:12:45Z',
      verified: true,
      transactionHash: '0x1d8d91ea72c85614e1b52efc36526346687c428c3b936895d1aaffbaa063ce3a'
    }
  ]);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  const handleRatingClick = (rating: number) => {
    setUserRating(rating);
  };

  const handleSubmitReview = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a verified review.",
        variant: "destructive",
      });
      return;
    }

    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "Comment required",
        description: "Please enter your review comment.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // In a real application, this would interact with a smart contract
    // to store the review on the blockchain
    setTimeout(() => {
      const newReview: Review = {
        id: Math.random().toString(36).substring(2, 11),
        user: address || '0x',
        rating: userRating,
        comment: comment,
        timestamp: new Date().toISOString(),
        verified: true,
        transactionHash: `0x${Array(64).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)).join('')}`
      };

      setReviews([newReview, ...reviews]);
      setUserRating(0);
      setComment('');
      setIsSubmitting(false);

      toast({
        title: "Review submitted",
        description: "Your blockchain-verified review has been successfully recorded.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-apple-text flex items-center gap-2">
          Verified Reviews <Shield className="h-5 w-5 text-apple-blue" />
        </h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Blockchain Verified
        </Badge>
      </div>

      {/* Review submission form */}
      <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
        <h3 className="font-medium mb-3 text-apple-text">Write a Verified Review</h3>
        
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="text-gray-300 hover:text-yellow-400 focus:outline-none"
              >
                <Star
                  className={`h-6 w-6 ${
                    userRating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          
          <Textarea
            placeholder="Share your experience with this product..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px] mb-3"
          />
          
          <Button 
            onClick={handleSubmitReview} 
            disabled={isSubmitting || !isConnected}
            className="flex items-center gap-2"
          >
            {isSubmitting ? "Submitting..." : "Submit Verified Review"} 
            {!isSubmitting && <Shield className="h-4 w-4" />}
          </Button>
          
          {!isConnected && (
            <p className="text-sm text-amber-600 mt-2">
              You must connect your wallet to submit a verified review.
            </p>
          )}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-100 rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-apple-text">{formatAddress(review.user)}</p>
                  {review.verified && (
                    <div className="flex items-center text-green-600 text-xs font-medium">
                      <Check className="h-3 w-3 mr-1" /> Verified Purchase
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500">{formatDate(review.timestamp)}</span>
            </div>
            
            <p className="text-apple-darkGray">{review.comment}</p>
            
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <Shield className="h-3 w-3 mr-1 text-apple-blue" />
              <span className="mr-1">Blockchain Verified:</span>
              <a 
                href={`https://etherscan.io/tx/${review.transactionHash}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-apple-blue hover:underline truncate max-w-[200px] sm:max-w-[300px]"
              >
                {review.transactionHash}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainReviews;
