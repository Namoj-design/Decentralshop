
import React, { useState } from 'react';
import { Shield, Truck, Box, PackageCheck, Factory, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { toast } from '@/hooks/use-toast';

// Define the shape of a supply chain event
interface SupplyChainEvent {
  id: string;
  stage: string;
  location: string;
  timestamp: string;
  verifiedBy: string;
  transactionHash: string;
  details?: string;
}

interface BlockchainSupplyChainProps {
  productId: string | number;
}

const BlockchainSupplyChain = ({ productId }: BlockchainSupplyChainProps) => {
  const { isConnected } = useWallet();
  const [expanded, setExpanded] = useState<boolean>(false);
  
  // Mock supply chain data - in a real application, these would be fetched from the blockchain
  const [supplyChainData, setSupplyChainData] = useState<SupplyChainEvent[]>([
    {
      id: '1',
      stage: 'Raw Material Sourcing',
      location: 'Helsinki, Finland',
      timestamp: '2023-01-15T08:30:00Z',
      verifiedBy: '0x3F4a084bFf26e7c69229271599c259C83B21B35B',
      transactionHash: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F12345abcde67890123456789'
    },
    {
      id: '2',
      stage: 'Manufacturing',
      location: 'Stockholm, Sweden',
      timestamp: '2023-02-10T14:45:00Z',
      verifiedBy: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
      transactionHash: '0x8a7d953f45ba71f793820d8c9f6a3c831720a5be752b15dad850fe118f8f1c0c'
    },
    {
      id: '3',
      stage: 'Quality Control',
      location: 'Stockholm, Sweden',
      timestamp: '2023-02-12T09:15:00Z',
      verifiedBy: '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
      transactionHash: '0x793538ca08f082b8858e0b0e7017192639f914beaacb772cf0224bd52ce36849'
    },
    {
      id: '4',
      stage: 'Distribution',
      location: 'Hamburg, Germany',
      timestamp: '2023-02-20T13:22:10Z',
      verifiedBy: '0x8B3392483BA26D65E331dB86D4F430aE0FE1C89A',
      transactionHash: '0x1d8d91ea72c85614e1b52efc36526346687c428c3b936895d1aaffbaa063ce3a'
    },
    {
      id: '5',
      stage: 'Retailer',
      location: 'Berlin, Germany',
      timestamp: '2023-03-01T10:40:15Z',
      verifiedBy: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      transactionHash: '0x8B3392483BA26D65E331dB86D4F430aE0FE1C89A12345abcde67890123456789'
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStageIcon = (stage: string) => {
    switch(stage) {
      case 'Raw Material Sourcing':
        return <Factory className="h-5 w-5" />;
      case 'Manufacturing':
        return <Box className="h-5 w-5" />;
      case 'Quality Control':
        return <Check className="h-5 w-5" />;
      case 'Distribution':
        return <Truck className="h-5 w-5" />;
      case 'Retailer':
        return <PackageCheck className="h-5 w-5" />;
      default:
        return <Shield className="h-5 w-5" />;
    }
  };

  const verifyEntireChain = () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to verify the supply chain.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would trigger blockchain verification
    toast({
      title: "Supply chain verified",
      description: "All stages of the supply chain have been verified on the blockchain.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-apple-text flex items-center gap-2">
          Supply Chain <Shield className="h-5 w-5 text-apple-blue" />
        </h2>
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Blockchain Verified
        </Badge>
      </div>

      <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h3 className="font-medium text-apple-text">Product Journey</h3>
            <p className="text-sm text-gray-600">
              Every step is verified and recorded on the blockchain
            </p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            className="mt-2 sm:mt-0"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Show Less" : "Show Details"}
          </Button>
        </div>

        {/* Supply chain timeline - always visible summary */}
        <div className="relative pb-3">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          
          <div className="flex items-center mb-3 relative">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center z-10 border border-green-200">
              {getStageIcon('Raw Material Sourcing')}
            </div>
            <div className="ml-4">
              <p className="font-medium text-apple-text">Raw Materials</p>
              <p className="text-xs text-gray-500">{formatDate(supplyChainData[0].timestamp)}</p>
            </div>
          </div>
          
          {!expanded && (
            <>
              <div className="absolute left-4 top-8 bottom-8 flex items-center">
                <div className="text-gray-400 text-center h-full" style={{ writingMode: 'vertical-rl' }}>
                  ⋮
                </div>
              </div>
              
              <div className="flex items-center relative">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center z-10 border border-green-200">
                  {getStageIcon('Retailer')}
                </div>
                <div className="ml-4">
                  <p className="font-medium text-apple-text">Retailer</p>
                  <p className="text-xs text-gray-500">{formatDate(supplyChainData[4].timestamp)}</p>
                </div>
              </div>
            </>
          )}
          
          {expanded && (
            <>
              {supplyChainData.slice(1).map((event, index) => (
                <div key={event.id} className="flex items-center mb-3 relative">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center z-10 border border-green-200">
                    {getStageIcon(event.stage)}
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-apple-text">{event.stage}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                      <p className="text-xs text-gray-600">{event.location}</p>
                      <p className="text-xs text-gray-500">{formatDate(event.timestamp)}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Shield className="h-3 w-3 mr-1 text-apple-blue" />
                      <span className="mr-1">Verified by:</span>
                      <a 
                        href={`https://etherscan.io/address/${event.verifiedBy}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-apple-blue hover:underline"
                      >
                        {formatAddress(event.verifiedBy)}
                      </a>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      <a 
                        href={`https://etherscan.io/tx/${event.transactionHash}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-apple-blue hover:underline truncate block max-w-xs"
                      >
                        TX: {formatAddress(event.transactionHash)}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Button onClick={verifyEntireChain} className="w-full sm:w-auto">
              <Shield className="mr-2 h-4 w-4" /> Verify Entire Supply Chain
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainSupplyChain;
