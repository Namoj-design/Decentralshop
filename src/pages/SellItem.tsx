import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/hooks/use-wallet';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AIVerificationResults from '@/components/AIVerificationResult';
import { Camera, Package, AlertCircle, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AIVerificationResult, analyzeProductListing } from '@/services/aiVerificationService';

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }).max(100, {
    message: "Title must not exceed 100 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters."
  }).max(1000, {
    message: "Description must not exceed 1000 characters."
  }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number.",
  }),
  currency: z.enum(["ETH", "USDC", "WBTC"]),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  condition: z.enum(["New", "Like New", "Good", "Fair", "Poor"]),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters."
  }).max(100, {
    message: "Location must not exceed 100 characters."
  }),
  shippingOptions: z.string().min(2, {
    message: "Please provide shipping options."
  }),
  contactInfo: z.string().email({
    message: "Please enter a valid email address."
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SellItem = () => {
  const { toast } = useToast();
  const { isConnected } = useWallet();
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [aiVerificationResult, setAiVerificationResult] = useState<AIVerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      currency: "ETH",
      category: "",
      condition: "New",
      location: "",
      shippingOptions: "",
      contactInfo: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to list an item.",
        variant: "destructive",
      });
      return;
    }

    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image of your product.",
        variant: "destructive",
      });
      return;
    }

    console.log("Form data:", data);
    console.log("Product images:", images);
    console.log("AI Verification:", aiVerificationResult);
    
    toast({
      title: "Product listed successfully!",
      description: "Your item has been submitted to the marketplace.",
    });
    
    form.reset();
    setImages([]);
    setAiVerificationResult(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    setTimeout(() => {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageUrl = URL.createObjectURL(file);
        newImages.push(imageUrl);
      }
      
      setImages([...images, ...newImages]);
      setIsUploading(false);
      
      toast({
        title: "Images uploaded",
        description: `${newImages.length} image(s) added successfully.`,
      });

      setAiVerificationResult(null);
    }, 1500);
  };

  const verifyWithAI = async () => {
    const description = form.getValues("description");
    const title = form.getValues("title");
    const category = form.getValues("category");
    
    if (images.length === 0) {
      toast({
        title: "Images required",
        description: "Please upload at least one image before AI verification.",
        variant: "destructive",
      });
      return;
    }
    
    if (!description) {
      toast({
        title: "Description required",
        description: "Please provide a product description before AI verification.",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      const result = await analyzeProductListing(
        images, 
        description,
        title || "",
        category || ""
      );
      
      setAiVerificationResult(result);
      
      toast({
        title: "AI Verification Complete",
        description: `Your product received an eco-rating of ${result.ecoScore}/5`,
      });
    } catch (error) {
      console.error("AI verification failed:", error);
      toast({
        title: "Verification failed",
        description: "Unable to complete AI verification. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const categories = [
    "Electronics", 
    "Fashion", 
    "Home & Kitchen", 
    "Books & Stationery",
    "Groceries", 
    "Computers & Accessories", 
    "Gaming",
    "Sports & Fitness", 
    "Automobiles & Accessories", 
    "Health & Personal Care",
    "Baby & Kids", 
    "Pets", 
    "Events & Tickets",
    "Art & Collectibles", 
    "Services", 
    "Travel & Experiences",
    "Other"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-apple-text mb-4">Sell Your Item</h1>
          <p className="text-lg text-apple-darkGray max-w-2xl mx-auto">
            List your product on the decentralized marketplace and connect directly with buyers around the world.
          </p>
        </div>
        
        {!isConnected && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Wallet not connected</AlertTitle>
            <AlertDescription>
              You need to connect your wallet to list items on the marketplace.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="bg-white rounded-xl p-8 shadow-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Product Images */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-apple-text">
                  <Camera size={20} />
                  Product Images
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img 
                        src={img} 
                        alt={`Product image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                        className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  
                  {/* Image upload button */}
                  <label className="cursor-pointer flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Camera size={24} className="text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Upload Images</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
                    </div>
                    <input 
                      id="product-images" 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                </div>
                
                {isUploading && (
                  <p className="text-sm text-apple-text animate-pulse">Uploading images...</p>
                )}

                {images.length > 0 && (
                  <div className="flex justify-end">
                    <Button 
                      type="button"
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={verifyWithAI}
                      disabled={isVerifying || !form.getValues("description")}
                    >
                      <Sparkles size={16} />
                      {isVerifying ? "Verifying..." : "Verify with AI"}
                    </Button>
                  </div>
                )}

                {(isVerifying || aiVerificationResult) && (
                  <div className="mt-4">
                    <AIVerificationResults 
                      result={aiVerificationResult} 
                      isLoading={isVerifying} 
                    />
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* Product Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-apple-text">
                  <Package size={20} />
                  Product Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the product title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your product in detail" 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Pricing & Condition */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-apple-text">Pricing & Condition</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="0.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDC">USDC</SelectItem>
                            <SelectItem value="WBTC">WBTC</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Condition</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Like New">Like New</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <Separator />
              
              {/* Shipping & Contact */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-apple-text">Shipping & Contact</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="shippingOptions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Shipping Options</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Worldwide, Local Only, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-center pt-6">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full md:w-auto md:px-12"
                >
                  List Product
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellItem;
