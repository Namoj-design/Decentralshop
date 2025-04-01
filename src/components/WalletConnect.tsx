
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, LogOut } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { shortenAddress, switchToConfluxTestnet } from "@/lib/wallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WalletConnect = () => {
  const { address, networkName, isConnecting, isConnected, connectWallet, disconnectWallet, chainId } = useWallet();
  
  const isConfluxNetwork = chainId === '0x47';

  const handleSwitchToConflux = async () => {
    await switchToConfluxTestnet();
  };

  return (
    <>
      {!isConnected ? (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className="flex items-center gap-2"
        >
          <Wallet size={18} />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isConfluxNetwork ? 'bg-purple-500' : 'bg-green-500'} mr-1`}></div>
              <span className="font-medium">{shortenAddress(address!)}</span>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-default">
              <div className="flex flex-col space-y-1">
                <span className="text-xs text-muted-foreground">Connected to</span>
                <span className="font-medium">{networkName}</span>
              </div>
            </DropdownMenuItem>
            {!isConfluxNetwork && (
              <DropdownMenuItem onClick={handleSwitchToConflux}>
                Switch to Conflux Testnet
              </DropdownMenuItem>
            )}
            <DropdownMenuItem onClick={disconnectWallet} className="text-red-500">
              <LogOut size={16} className="mr-2" />
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default WalletConnect;
