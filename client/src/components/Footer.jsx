export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-8 py-10 grid md:grid-cols-3 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-blue-400">
            HireHub
          </h2>

          <p className="mt-3 text-gray-300">
            Helping job seekers connect with employers and
            build better careers.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>Home</li>
            <li>Jobs</li>
            <li>Profile</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-3">
            Contact
          </h3>

          <p>GitHub</p>
          <p>LinkedIn</p>
          <p>Email</p>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-400">
        © 2026 HireHub • Built by Aravind
      </div>
    </footer>
  );
}