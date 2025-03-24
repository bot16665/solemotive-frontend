import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [showSearch, setShowSearch] = useState(false); 
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set("search", searchTerm.toLowerCase());

      const currentPath = location.pathname;
      const searchPath = currentPath.includes("/women") ? "/women" : "/men";

      navigate(`${searchPath}?${searchParams.toString()}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-[#dfd86b]">
      <nav className="text-black p-4 font-bold">
        <div className="container mx-auto flex justify-between items-center">

          {/* LEFT SIDE: Brand Name */}
          <Link to="/home" className="font-bold text-2xl md:text-4xl">SoleMotive</Link>

          {/* MOBILE VIEW: Search Icon + User & Cart Icons + Menu */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Search Icon */}
            <button onClick={toggleSearch}>
              <img src="/image/search.png" alt="Search" className="h-6 w-6" />
            </button>

            {/* User & Cart Icons (Only shown on mobile) */}
            <div className="flex space-x-4 md:hidden relative">
              <button onClick={toggleUserMenu}>
                <img src="/image/person.png" alt="User Icon" className="h-6 w-6" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-8 w-48 bg-[#dfd86b] rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-black/10">
                        <p className="font-medium">{user.displayName || user.email || user.phoneNumber}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-black/10"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-black/10"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
              <Link to="/cart">
                <img src="/image/Bag.png" alt="Cart" className="h-6 w-6" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button onClick={toggleMenu}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/home" className="hover:text-white">New Collection</Link>
            <Link to="/men" className="hover:text-white">Men</Link>
            <Link to="/women" className="hover:text-white">Women</Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-gray-200 rounded-r-lg border-2 border-l-0 border-gray-300 hover:bg-gray-300">
                <img src="/image/search.png" alt="Search Icon" className="h-5 w-5" />
              </button>
            </form>

            {/* User & Cart Icons (Only for Desktop) */}
            <div className="hidden md:flex space-x-4 relative">
              <button onClick={toggleUserMenu}>
                <img src="/image/person.png" alt="User Icon" className="h-6 w-6" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-8 w-48 bg-[#dfd86b] rounded-lg shadow-lg py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-black/10">
                        <p className="font-medium">{user.displayName || user.email || user.phoneNumber}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-black/10"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="block px-4 py-2 hover:bg-black/10"
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
              <Link to="/cart">
                <img src="/image/Bag.png" alt="Cart" className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH BAR: Expands when clicking search icon */}
        {showSearch && (
          <div className="md:hidden mt-2 px-4">
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-gray-500 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="px-4 py-2 bg-gray-200 rounded-r-lg border-2 border-l-0 border-gray-300 hover:bg-gray-300">
                <img src="/image/search.png" alt="Search Icon" className="h-5 w-5" />
              </button>
            </form>
          </div>
        )}

        {/* MOBILE NAVIGATION MENU (Opens from Left Side) */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-0 right-0 h-full w-3/4 bg-[#dfd86b] shadow-lg p-6 transition-transform transform">
            <button className="absolute top-4 right-4" onClick={toggleMenu}>
              ✖
            </button>
            <div className="flex flex-col space-y-4 mt-10">
              <Link to="/home" className="hover:text-white" onClick={toggleMenu}>New Collection</Link>
              <Link to="/men" className="hover:text-white" onClick={toggleMenu}>Men</Link>
              <Link to="/women" className="hover:text-white" onClick={toggleMenu}>Women</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
