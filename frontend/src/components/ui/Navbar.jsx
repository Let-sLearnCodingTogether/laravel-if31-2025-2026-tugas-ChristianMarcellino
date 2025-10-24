import { NavLink, useNavigate } from "react-router";
import { Button } from "@components/Button";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const storedUser = JSON.parse(sessionStorage.getItem("user"))
  const [showProfile, setShowProfile] = useState(false)

  const handleLogout = () => {
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    navigate("/login", 
      { replace: true }
    )
  };

  return (
    <nav className="top-0 fixed sm:w-[75%] w-full flex justify-between items-center bg-white shadow-md rounded-2xl px-3 sm:px-6 py-2 sm:py-3 left-0 sm:left-1/2 sm:-translate-x-1/2 z-40">
      <h1
        className="text-md sm:text-xl font-bold text-gray-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Glossary
      </h1>

      
      <div className="flex gap-1 sm:gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-xs sm:text-sm font-medium transition ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/create-glossary"
          className={({ isActive }) =>
            `text-xs sm:text-sm font-medium transition ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`
          }
        >
          Create
        </NavLink>

        <NavLink
          to="/glossary"
          className={({ isActive }) =>
            `text-xs sm:text-sm font-medium transition ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`
          }
        >
          Glossary
        </NavLink>
      </div>

      
      <div className="relative">
        {token ? (
          <>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  storedUser.username
                )}&background=random`}
                alt="profile"
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden sm:inline">
                {storedUser.username.split(" ")[0]}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 sm:mt-3 w-48 sm:w-56 bg-white border rounded-xl shadow-lg p-3 sm:p-4 animate-fade-in z-50">
                <p className="font-semibold text-gray-800 text-xs sm:text-sm mb-1">
                  {storedUser.username}
                </p>
                <p className="text-gray-500 text-xs mb-3 sm:mb-4">{storedUser.email}</p>
                <hr className="mb-2 sm:mb-3" />
                <Button
                  content="Logout"
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white hover:bg-red-600"
                />
              </div>
            )}
          </>
        ) : (
          <NavLink to="/login">
            <Button content="Login" />
          </NavLink>
        )}
      </div>
    </nav>
  );
}
