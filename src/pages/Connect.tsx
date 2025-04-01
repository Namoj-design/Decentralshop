
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { shortenAddress } from "@/lib/wallet";

const Connect = () => {
  const { address, networkName, isConnecting, isConnected, connectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-white pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold text-apple-text mb-6">Connect Your Wallet</h1>
        <p className="text-apple-text/80 mb-10">
          Connect your crypto wallet to access all the features of our decentralized marketplace.
          Buy and sell products using cryptocurrency and take full control of your digital assets.
        </p>
        
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-8 shadow-sm">
          {!isConnected ? (
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Wallet size={36} className="text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-3">No Wallet Connected</h2>
              <p className="text-muted-foreground mb-6">
                You'll need to connect your wallet to access the features of this decentralized marketplace.
              </p>
              <Button 
                size="lg" 
                onClick={connectWallet} 
                disabled={isConnecting}
                className="flex items-center gap-2"
              >
                <Wallet size={18} />
                {isConnecting ? "Connecting..." : "Connect with MetaMask"}
              </Button>
              <p className="text-xs text-muted-foreground mt-4">
                Don't have MetaMask? <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="text-primary underline">Download here</a>
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-12 h-12 rounded-full border-4 border-green-500 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-3">Wallet Connected</h2>
              <div className="bg-gray-100 rounded-md py-3 px-4 inline-block mb-4">
                <span className="font-mono font-medium">{shortenAddress(address!)}</span>
              </div>
              <p className="text-muted-foreground">
                Connected to <span className="font-medium">{networkName}</span>
              </p>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium mb-3">What can you do now?</h3>
                <ul className="text-left text-sm space-y-2">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Browse and purchase products with cryptocurrency</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>List your own products to sell on the marketplace</span>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mr-2 mt-0.5">✓</span>
                    <span>Participate in the governance of the platform</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connect;
