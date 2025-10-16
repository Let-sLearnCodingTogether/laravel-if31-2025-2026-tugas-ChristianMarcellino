import { Button, LoadingButton } from "@components/Button"
import Input from "@components/Input"
import { useId, useState } from "react";
import http from "../../api/api";
import { useNavigate } from 'react-router';
import { AlertList } from "@components/Alert";

export default function Register(){
    const navigation = useNavigate()
    const [form,setForm] = useState({
        email : "",
        name : "",
        password : "",
        password_confirmation : "",
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errorItems, setErrorItems] = useState()
    const [showAlert, setShowAlert] = useState(false)

    const handleFormChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        try{
            setShowAlert(false)
            setIsLoading(true)
            const response = await http.post("/register", form)
            if(response.status === 201){
                navigation('/login', {
                    replace: true
                })
            }
        }catch(error){
            setShowAlert(true)
            setErrorItems([
                "Email already in use", 
                "Password must be at least 8 characters", 
                "Password and password confirmation do not match"
            ])
        }finally{
            setIsLoading(false)
        }
    }

    return <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
          <form onSubmit={handleLogin}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
            <div className="space-y-4">
                <Input required id={useId()} name="email" value={form.email} type="email" onChange={handleFormChange} label="Email"/>
                <Input required id={useId()} name="name" value={form.name} type="text" onChange={handleFormChange}label="Name"/>
                <div>
                    <Input required id={useId()} name="password" value={form.password} type="password" onChange={handleFormChange} label="Password"/>
                    {form.password && <p className={`text-sm font-medium ${ form.password.length < 8 ? "text-red-500" : "text-green-500" }`}>
                    {form.password.length < 8 ? "Password too short" : "Strong password"}
                    </p>}
                </div>
                <div>
                    <Input required id={useId()} name="password_confirmation" value={form.password_confirmation} type="password" onChange={handleFormChange} label="Confirm Password"/>
                    {form.password_confirmation && <p className={`text-sm font-medium ${ form.password.length < 8 ? "text-red-500" : "text-green-500" }`}>
                    {form.password_confirmation === form.password ? "Password match" : "Password do not match"}
                    </p>}
                </div>        
            </div>
      
            <div className="mt-8">
              {
                isLoading ?  <LoadingButton/> : 
                <Button type="submit" content="Register" className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition-all duration-200"/>
              }
            </div>
          </form>
        </div>
}