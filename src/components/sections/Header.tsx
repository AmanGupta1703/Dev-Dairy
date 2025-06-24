import { Link } from "react-router-dom";

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
              <span className="text-2xl font-black text-slate-900 uppercase">
                Dev Dairy
              </span>
              <span className="text-base">📝</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="flex items-center">
            {navItems.map((navItem) => (
              <li key={navItem.id}>
                <Link
                  to={navItem.path}
                  className="rounded-md px-4 py-2 font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200"
                >
                  {navItem.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
