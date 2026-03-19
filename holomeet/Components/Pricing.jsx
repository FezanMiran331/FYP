export default function Pricing() {
  const pricingPlans = [
    {
      name: "Starter",
      description: "Best option for personal use & for your next project.",
      price: "$29",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 1 developer",
        "Premium support: 6 months",
        "Free updates: 6 months"
      ]
    },
    {
      name: "Company",
      description: "Relevant for multiple users, extended & premium support.",
      price: "$99",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 10 developers",
        "Premium support: 24 months",
        "Free updates: 24 months"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      description: "Best for large scale uses and extended redistribution rights.",
      price: "$499",
      features: [
        "Individual configuration",
        "No setup, or hidden fees",
        "Team size: 100+ developers",
        "Premium support: 36 months",
        "Free updates: 36 months"
      ]
    }
  ];

  return (
    <section 
      className="py-20 px-4"
      style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
      }}
    >
      <div className="w-[95%] max-w-screen-xl mx-auto">
        <div className="max-w-screen-md text-center mx-auto mb-8 lg:mb-12">
          <span className="inline-block px-12 py-2 bg-blue-700/30 text-blue-300 rounded-full text-xl font-semibold mb-6 border border-blue-600/40 backdrop-blur-sm">
            Pricing
          </span>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-white">
            Designed for business teams like yours
          </h2>
          <p className="mb-5 font-light text-gray-300 sm:text-xl">
            Here at HoloMeet we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 xl:gap-10 items-stretch">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`flex flex-col p-6 text-center bg-white/5 rounded-lg border backdrop-blur-sm xl:p-8 ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-white/10'
              }`}
            >
              {plan.popular && (
                <span className="bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 self-center">
                  Most Popular
                </span>
              )}
              <h3 className="mb-4 text-2xl font-semibold text-white">
                {plan.name}
              </h3>
              <p className="font-light text-gray-300 sm:text-lg mb-8">
                {plan.description}
              </p>
              <div className="flex justify-center items-baseline mb-8">
                <span className="mr-2 text-5xl font-extrabold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400">/month</span>
              </div>

              {/* Features List */}
              <ul role="list" className="mb-8 space-y-4 text-left flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-500/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 mt-auto"
              >
                Get started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}