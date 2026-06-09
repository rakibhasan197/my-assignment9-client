export default function StartupStats() {
  const stats = [
    {
      number: "10K+",
      title: "Ideas Shared",
    },
    {
      number: "5K+",
      title: "Community Members",
    },
    {
      number: "2K+",
      title: "Comments Posted",
    },
    {
      number: "500+",
      title: "Validated Ideas",
    },
  ];

  return (
    <section className="py-16 bg-base-200 rounded-3xl">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Community Impact
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Empowering innovators through collaboration and idea validation.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center border rounded-xl p-8 bg-base-100"
            >
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-500">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}