import { useNavigate, NavLink } from "react-router";
import { Button } from "@components/Button";
import http from "@api/api";
export default function Glossaries() {
  const navigation = useNavigate();

  const handleLogout = async(e)=>{
    e.preventDefault()
    try{
        const response = await http.post("/logout")
        console.log(response)
        if(response.status === 200){
            navigation('/login',{
                replace : true
            })
        }
    }catch(error){
        console.log(error)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      {/* Main content card */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>
            <Button content="Logout" onClick={()=> handleLogout()}></Button>
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
