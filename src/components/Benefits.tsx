
import { Shield, Zap, Percent, Globe } from 'lucide-react';

const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-10 w-10 text-apple-blue" />,
      title: "Trustless Transactions",
      description: "Smart contracts ensure that your transactions are secured and automatically executed without intermediaries."
    },
    {
      icon: <Percent className="h-10 w-10 text-apple-blue" />,
      title: "Lower Fees",
      description: "By removing middlemen, we can offer significantly lower transaction fees compared to traditional e-commerce."
    },
    {
      icon: <Zap className="h-10 w-10 text-apple-blue" />,
      title: "Instant Settlements",
      description: "Get paid instantly when sales are complete, with no waiting periods or payment holds."
    },
    {
      icon: <Globe className="h-10 w-10 text-apple-blue" />,
      title: "Global Marketplace",
      description: "Access a worldwide market without currency conversion issues or cross-border restrictions."
    }
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-apple-gray">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title fade-in">Why Choose Decentralized Commerce</h2>
          <p className="section-subtitle mx-auto fade-in animation-delay-200">
            Experience the benefits of blockchain-powered e-commerce
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 fade-up ${
                index === 0 ? 'animation-delay-200' : 
                index === 1 ? 'animation-delay-400' : 
                index === 2 ? 'animation-delay-600' :
                'animation-delay-800'
              }`}
            >
              <div className="p-3 bg-apple-blue/10 rounded-xl inline-block mb-5">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-apple-text mb-3">
                {benefit.title}
              </h3>
              <p className="text-apple-darkGray">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
