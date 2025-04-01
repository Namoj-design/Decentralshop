
import { useState } from 'react';
import { Leaf, Award, TrendingUp, TrendingDown, Earth, ShoppingBag } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

// Mock data for leaderboard
const topSellers = [
  { id: 1, name: "EcoLife Solutions", points: 5280, products: 42, carbonSaved: 2450 },
  { id: 2, name: "Green Home Goods", points: 4790, products: 38, carbonSaved: 2120 },
  { id: 3, name: "Sustainable Living Co.", points: 4350, products: 35, carbonSaved: 1980 },
  { id: 4, name: "EarthFirst Products", points: 3890, products: 31, carbonSaved: 1750 },
  { id: 5, name: "Eco Warrior Shop", points: 3650, products: 29, carbonSaved: 1680 }
];

const topBuyers = [
  { id: 1, name: "Alex Johnson", points: 3250, purchases: 28, carbonSaved: 1420 },
  { id: 2, name: "Sam Patel", points: 2980, purchases: 24, carbonSaved: 1320 },
  { id: 3, name: "Jamie Rodriguez", points: 2740, purchases: 22, carbonSaved: 1180 },
  { id: 4, name: "Taylor Kim", points: 2510, purchases: 20, carbonSaved: 1050 },
  { id: 5, name: "Jordan Smith", points: 2350, purchases: 19, carbonSaved: 980 }
];

// Mock data for carbon impact chart
const carbonImpactData = [
  { month: 'Jan', saved: 450, avoided: 320 },
  { month: 'Feb', saved: 590, avoided: 380 },
  { month: 'Mar', saved: 740, avoided: 450 },
  { month: 'Apr', saved: 890, avoided: 510 },
  { month: 'May', saved: 1020, avoided: 580 },
  { month: 'Jun', saved: 1150, avoided: 650 },
];

const SustainabilityLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'sellers' | 'buyers'>('sellers');
  const chartConfig = {
    saved: { label: "Carbon Saved (kg)", theme: { light: "#10b981", dark: "#10b981" } },
    avoided: { label: "Carbon Avoided (kg)", theme: { light: "#60a5fa", dark: "#60a5fa" } },
  };

  return (
    <section className="py-16 px-6 md:px-12 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sustainability Leaders</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Recognizing those making the biggest positive environmental impact through eco-friendly products
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 text-green-600" />
                    Sustainability Leaderboard
                  </CardTitle>
                  <CardDescription>
                    Top contributors to our eco-friendly marketplace
                  </CardDescription>
                </div>
                <div className="flex bg-slate-100 rounded-lg">
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg ${activeTab === 'sellers' ? 'bg-green-500 text-white' : ''}`}
                    onClick={() => setActiveTab('sellers')}
                  >
                    <div className="flex items-center gap-1">
                      <ShoppingBag size={16} />
                      Sellers
                    </div>
                  </button>
                  <button 
                    className={`px-4 py-2 text-sm rounded-lg ${activeTab === 'buyers' ? 'bg-green-500 text-white' : ''}`}
                    onClick={() => setActiveTab('buyers')}
                  >
                    <div className="flex items-center gap-1">
                      <ShoppingBag size={16} />
                      Buyers
                    </div>
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">Rank</TableHead>
                      <TableHead>{activeTab === 'sellers' ? 'Seller' : 'Buyer'}</TableHead>
                      <TableHead className="text-right">Eco Points</TableHead>
                      <TableHead className="text-right">
                        {activeTab === 'sellers' ? 'Products' : 'Purchases'}
                      </TableHead>
                      <TableHead className="text-right">Carbon Saved (kg)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(activeTab === 'sellers' ? topSellers : topBuyers).map((entry, index) => (
                      <TableRow key={entry.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-800">
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell>{entry.name}</TableCell>
                        <TableCell className="text-right font-semibold">{entry.points.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                          {activeTab === 'sellers' ? entry.products : entry.purchases}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 text-green-600">
                            <Leaf size={16} />
                            {entry.carbonSaved.toLocaleString()}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Earth className="mr-2 text-blue-600" />
                Carbon Impact Tracker
              </CardTitle>
              <CardDescription>
                Track the positive environmental impact of our community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-[4/3]">
                <BarChart data={carbonImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="saved" name="Carbon Saved (kg)" fill="var(--color-saved)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="avoided" name="Carbon Avoided (kg)" fill="var(--color-avoided)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Total Carbon Saved</div>
                    <TrendingUp className="text-green-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-green-800">4,840 kg</div>
                  <div className="text-sm text-green-600">+12.4% from last month</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-600">Carbon Footprint Reduced</div>
                    <TrendingDown className="text-blue-600" size={20} />
                  </div>
                  <div className="text-2xl font-bold text-blue-800">2,890 kg</div>
                  <div className="text-sm text-blue-600">+8.7% from last month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm mb-6">
            <Leaf className="mr-1" size={16} />
            Together, our community has saved over 7,730 kg of carbon emissions
          </div>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Every eco-friendly purchase and sale contributes to your sustainability score.
            Move up the leaderboard by buying or selling more sustainable products!
          </p>
        </div>
      </div>
    </section>
  );
};

export default SustainabilityLeaderboard;
