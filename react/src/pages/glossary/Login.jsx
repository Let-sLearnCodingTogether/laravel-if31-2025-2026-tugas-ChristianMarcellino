import { Button, LoadingButton } from "@components/Button"
import Input from "@components/Input"
import { useId, useState } from "react";
import http from "@api/api";
import { useNavigate, NavLink } from 'react-router';
import { AlertInfo } from "@components/Alert";

export default function Login(){
    const navigation = useNavigate()
    const [form,setForm] = useState({
        email : "",
        password : "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const handleFormChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleRegister = async (e)=>{
        e.preventDefault()
        try{
            setShowAlert(false)
            setIsLoading(true)
            const response = await http.post("/login", form)
            if(response.status === 200){
                sessionStorage.setItem("token", response.data.token)
                navigation('/', {
                    replace: true
                })
            }
        }catch(error){
            setShowAlert(true)
        }finally{
            setIsLoading(false)
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
        {showAlert && <AlertInfo color="red" onClose={() => setShowAlert(false)} alertType="Error! " alertContent=" These provided credentials are not registered!"></AlertInfo>}
          <form onSubmit={handleRegister}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login Form</h2>
            <div className="space-y-4">
                <Input required id={useId()} name="email" value={form.email} type="email" onChange={handleFormChange} label="Email"/>
                <Input required id={useId()} name="password" value={form.password} type="password" onChange={handleFormChange} label="Password"/>
            </div>
            
      
            <div className="mt-8">
              {
                isLoading ?  <LoadingButton/> : 
                <Button type="submit" content="Register" disabled={!form.password.trim() || !form.email.trim()}/>
              }
            </div>
            <NavLink to="/register" className="block text-center text-sm text-gray-600 mt-4">
                Don’t have an account?{" "}
                <span className="text-indigo-600 font-semibold hover:underline transition-colors">
                    Sign Up
                </span>
            </NavLink>
          </form>
        </div>
}