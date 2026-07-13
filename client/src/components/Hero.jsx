import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-28">

      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-6xl font-bold mb-6">
          Find Your Dream Job 🚀
        </h1>

        <p className="text-xl mb-8">
          Thousands of jobs from trusted companies.
        </p>

        <div className="space-x-4">

          <Link
            to="/jobs"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Find Jobs
          </Link>

          <Link
            to="/register"
            className="border border-white px-6 py-3 rounded-lg"
          >
            Get Started
          </Link>

        </div>

      </div>

    </section>
  );
}