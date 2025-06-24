import { Link, NavLink } from "react-router-dom";

function Header() {
  const navItems = [
    {
      id: 1,
      path: "/login",
      name: "Login",
    },
    {
      id: 2,
      path: "/sign-up",
      name: "Sign Up",
    },
  ];

  return (
    <header className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <Link to="/">
            <h1 className="flex items-center space-x-1">
              <span className="animate-pulse text-2xl font-black text-slate-900 uppercase">
                Dev Dairy
              </span>
              <span className="text-base">📝</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center space-x-6">
            {navItems.map((navItem) => (
              <li key={navItem.id}>
                <NavLink
                  to={navItem.path}
                  className={({ isActive }) =>
                    `rounded-md px-4 py-2 font-medium text-slate-700 transition-colors duration-200 outline-none hover:bg-slate-200 focus:bg-slate-200 focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 ${isActive ? "bg-slate-200" : ""}`
                  }
                >
                  {navItem.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
