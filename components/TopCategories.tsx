export function TopCategories() {
  const categories = [
    "Real Estate",
    "Biotech",
    "Email Marketing",
    "E-commerce",
    "Collaboration",
    "Productivity",
    "Cloud Storage",
    "Payment Processing",
    "Transportation",
    "Project Management",
    "Consulting",
    "Construction",
    "Education",
    "LegalTech",
    "HR Software",
    "Communication",
    "Energy",
    "Healthcare",
    "IT Management",
    "Banking",
    "Business Intelligence",
    "Nonprofit",
    "Inventory Manage",
    "Accounting",
    "Marketing Automation",
    "Cybersecurity",
    "Development Tools",
    "Operations",
    "Finance",
    "Hospitality",
    "CMS Platforms",
    "Manufacturing",
    "Sales",
    "Video Conferencing",
    "Insurance",
    "Data Analytics",
    "Media",
    "Design Tools",
    "Website Builders",
    "CRM",
    "Telecommunications",
    "Automotive",
  ];

  const featuredCategories = [
    { name: "CRM", image: "/placeholder-crm.jpg" },
    { name: "HRMS", image: "/placeholder-hrms.jpg" },
    { name: "AUTOMATION", image: "/placeholder-automation.jpg" },
    { name: "FINANCE", image: "/placeholder-finance.jpg" },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Categories
          </h2>
        </div>

        {/* Scrollable Category List */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex flex-wrap justify-center gap-2 min-w-max">
            {categories.map((category, index) => (
              <button
                key={index}
                className="border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col items-center justify-center min-w-[180px] h-[110px]"
              >
                <div className="w-10 h-10 mb-2 bg-gray-200 rounded" />
                <span className="text-sm text-gray-600">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              className="bg-gray-50 border-2 border-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-40 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">{category.name}</span>
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

