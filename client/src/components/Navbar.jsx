import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const activeClass =
    "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-2">
        <NavLink
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          HireHub
        </NavLink>

        <div className="flex items-center gap-6">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:text-blue-600"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              isActive ? activeClass : "hover:text-blue-600"
            }
          >
            Jobs
          </NavLink>

          {token && role === "jobseeker" && (
            <NavLink
              to="/my-applications"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:text-blue-600"
              }
            >
              My Applications
            </NavLink>
          )}

          {token && role === "employer" && (
            <NavLink
              to="/employer/dashboard"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:text-blue-600"
              }
            >
              Dashboard
            </NavLink>
          )}

          {token && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? activeClass : "hover:text-blue-600"
              }
            >
              Profile
            </NavLink>
          )}

          {!token ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? activeClass : "hover:text-blue-600"
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? activeClass : "hover:text-blue-600"
                }
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}