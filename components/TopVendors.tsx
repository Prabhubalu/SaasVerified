export function TopVendors() {
  const vendors = [
    {
      name: "ZOHO",
      description: "CHEW GUM, HAVE ENERGY, RUN THE DAY!",
      image: "/placeholder-zoho.jpg",
      logo: "/logo-zoho.png",
    },
    {
      name: "vtiger",
      description: "PROJECT OF THE MONTH",
      image: "/placeholder-vtiger.jpg",
      logo: "/logo-vtiger.png",
    },
    {
      name: "ClickUp",
      description: "WE MISS YOU?",
      image: "/placeholder-clickup.jpg",
      logo: "/logo-clickup.png",
    },
    {
      name: "Monday.com",
      description: "PRODUCTIVITY REIMAGINED",
      image: "/placeholder-monday.jpg",
      logo: "/logo-monday.png",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Verified Vendors
          </h2>
          <div className="w-48 h-0.5 bg-gray-300 mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-green-100 flex items-center justify-center relative">
                <div className="text-center p-4">
                  <p className="font-bold text-gray-900 mb-2">{vendor.description}</p>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="h-8 mb-2 flex items-center justify-center">
                  <span className="text-gray-600 font-medium">{vendor.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

