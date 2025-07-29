'use client';

const plans = [
  {
    name: 'Basic',
    price: '4.99',
    period: 'month',
    features: [
      'HD Available',
      'Watch on 1 screen',
      'Cancel anytime',
      'First month free'
    ],
    popular: false,
    accent: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Standard',
    price: '9.99',
    period: 'month',
    features: [
      'Full HD Available',
      'Watch on 2 screens',
      'Cancel anytime',
      'First month free',
      'Ad-free experience'
    ],
    popular: true,
    accent: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Premium',
    price: '14.99',
    period: 'month',
    features: [
      '4K + HDR',
      'Watch on 4 screens',
      'Cancel anytime',
      'First month free',
      'Ad-free experience',
      'Early access to new releases'
    ],
    popular: false,
    accent: 'from-red-500 to-yellow-500'
  }
];

const Subscription = () => {
  return (
    <section className="py-20 bg-black relative overflow-hidden z-20">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 gap-4">
          <h2 className="text-5xl font-bold text-white mb-4 [text-shadow:_0_0_15px_rgba(255,0,0,0.8)] relative inline-block jacquard-12-regular">
            <span className="relative z-10 px-4  bg-clip-text ">
              CHOOSE YOUR PLAN
            </span>
            <div className="absolute bottom-0  left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Get unlimited access to thousands of anime series and movies with our flexible subscription plans.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-gray-900/80 backdrop-blur-sm rounded-xl p-8 border border-gray-800 transition-all duration-300 hover:border-opacity-50 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-2 border-opacity-100 shadow-lg shadow-pink-900/30 transform -translate-y-2' 
                  : 'border-opacity-30 hover:border-opacity-50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-4xl font-extrabold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full mt-11 py-3 px-6 rounded-md font-bold text-white transition-all duration-300 relative overflow-hidden group ${
                plan.popular 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-pink-900/30' 
                  : 'bg-gray-800 mt-4 hover:bg-gray-700 border border-gray-700 hover:border-red-500/50'
              }`}>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">
                  {plan.popular ? 'GET STARTED' : 'CHOOSE PLAN'}
                </span>
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>All plans include a 30-day money-back guarantee. No hidden fees.</p>
        </div>
      </div>
    </section>
  );
};

export default Subscription;
