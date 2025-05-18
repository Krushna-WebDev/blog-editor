import { Link, useNavigate } from "react-router-dom";

function getUserFromToken(token) {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const user = getUserFromToken(token);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow mb-6">
      <Link to="/" className="text-2xl font-bold text-blue-700">Blog Editor</Link>
      <div className="flex items-center gap-4">
        {token && user && (
          <span className="text-gray-700 font-medium">
            Welcome, {user.name}
          </span>
        )}
        {!token ? (
          <>
            <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
            <Link to="/signup" className="text-blue-600 font-semibold">Signup</Link>
          </>
        ) : (
          <>
            <Link to="/edit" className="text-green-600 font-semibold">New Blog</Link>
            <button onClick={handleLogout} className="text-red-600 font-semibold">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;