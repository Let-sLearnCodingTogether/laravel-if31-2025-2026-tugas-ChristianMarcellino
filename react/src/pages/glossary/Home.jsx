import Navbar from "@components/Navbar";

export default function Home() {
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <Navbar></Navbar>
      <div className="mt-20 bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {sessionStorage.key("token") ? `Welcome Back ${JSON.parse(sessionStorage.getItem("user")).username} 👋` : "Welcome"}
          </h1>
          </header>

        <section className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Your Profile
            </h2>
            <p className="text-gray-600 text-sm">
              View or edit your personal details and preferences here.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Dashboard Overview
            </h2>
            <p className="text-gray-600 text-sm">
              This is where you can see your recent activity, statistics, or other important information.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Explore Features
            </h2>
            <p className="text-gray-600 text-sm">
              Access more features and tools available in your account.
            </p>
          </div>
        </section>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} My App. All rights reserved.
      </footer>
    </div>
  );
}
