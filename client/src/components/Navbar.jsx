import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          HireHub
        </Link>

        <div className="space-x-6">

          <Link
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/jobs"
            className="hover:text-blue-600"
          >
            Jobs
          </Link>

          <Link
            to="/login"
            className="hover:text-blue-600"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-blue-600"
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}