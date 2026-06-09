export default function StartupMistakes() {
  const mistakes = [
    {
      title: "No Market Research",
      description:
        "Many startups build products without validating whether customers actually need them.",
    },
    {
      title: "Poor Financial Planning",
      description:
        "Running out of budget is one of the most common reasons startups fail.",
    },
    {
      title: "Weak Team Structure",
      description:
        "A lack of skilled and committed team members can slow growth significantly.",
    },
    {
      title: "Ignoring User Feedback",
      description:
        "Successful ideas evolve through constant customer feedback and iteration.",
    },
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Startup Ideas Fail
        </h2>

        <p className="text-center text-gray-500 mb-10">
          Learn from common mistakes and build stronger startup ideas.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mistakes.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}