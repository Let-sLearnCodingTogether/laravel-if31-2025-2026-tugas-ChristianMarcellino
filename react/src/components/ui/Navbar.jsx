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
    <nav className="top-0 fixed w-[75%] flex justify-between items-center bg-white shadow-md rounded-2xl px-6 py-3">
      <h1
        className="text-xl font-bold text-gray-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Glossary
      </h1>

      
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium transition ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/create-glossary"
          className={({ isActive }) =>
            `text-sm font-medium transition ${
              isActive ? "text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`
          }
        >
          Create
        </NavLink>

        <NavLink
          to="/glossary"
          className={({ isActive }) =>
            `text-sm font-medium transition ${
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
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  storedUser.username
                )}&background=random`}
                alt="profile"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">
                {storedUser.username.split(" ")[0]}
              </span>
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-3 w-56 bg-white border rounded-xl shadow-lg p-4 animate-fade-in z-50">
                <p className="font-semibold text-gray-800 text-sm mb-1">
                  {storedUser.username}
                </p>
                <p className="text-gray-500 text-xs mb-4">{storedUser.email}</p>
                <hr className="mb-3" />
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
