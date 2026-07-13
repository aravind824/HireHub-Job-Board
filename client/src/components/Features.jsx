export default function Features() {
  return (
    <section className="py-20">

      <div className="max-w-6xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose HireHub?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              💼 Jobs
            </h3>

            <p>
              Browse thousands of verified job openings.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              🚀 Fast Apply
            </h3>

            <p>
              Apply with just one click.
            </p>
          </div>

          <div className="shadow-lg rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">
              🏢 Companies
            </h3>

            <p>
              Connect with top recruiters.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}