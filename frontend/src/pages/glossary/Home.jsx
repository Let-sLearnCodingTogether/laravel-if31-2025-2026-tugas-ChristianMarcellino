import Navbar from "@components/Navbar";
import Loader from "@components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Home() {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  if (loader) return <Loader />;

  const token = sessionStorage.getItem("token");
  const user = token ? JSON.parse(sessionStorage.getItem("user")) : null;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Navbar />
      <div className="mt-20 bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {user ? `Welcome Back, ${user.username} 👋` : "Welcome to Glossary!"}
          </h1>
          <p className="text-gray-600 mt-2">
            {user ? "Manage and explore your personal glossaries below." : "Create your account or sign in to start managing your glossaries."}
          </p>
        </header>

        <section>
          {user ? (
            <div className="space-y-6">
              <div onClick={() => navigate("/glossary")} className="cursor-pointer bg-indigo-50 rounded-xl p-6 shadow-sm hover:shadow-md transition" >
                <h2 className="text-lg font-semibold text-indigo-700 mb-2">
                  📚 View Your Glossaries
                </h2>
                <p className="text-gray-600 text-sm">
                  See all the glossary terms you’ve created and manage them easily.
                </p>
              </div>

              <div onClick={() => navigate("/create-glossary")}
                className="cursor-pointer bg-green-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-green-700 mb-2">
                  ✏️ Create New Glossary
                </h2>
                <p className="text-gray-600 text-sm">
                  Add a new term to your personal glossary collection.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                onClick={() => navigate("/login")}
                className="cursor-pointer bg-blue-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-blue-700 mb-2">
                  🔐 Login
                </h2>
                <p className="text-gray-600 text-sm">
                  Already have an account? Sign in to access your glossaries.
                </p>
              </div>

              <div
                onClick={() => navigate("/register")}
                className="cursor-pointer bg-purple-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
              >
                <h2 className="text-lg font-semibold text-purple-700 mb-2">
                  ✨ Create an Account
                </h2>
                <p className="text-gray-600 text-sm">
                  New here? Register now to start managing your personal glossaries.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Glossary App. All rights reserved.
      </footer>
    </div>
  );
}
