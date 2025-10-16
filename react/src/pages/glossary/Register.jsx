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

    return <form onSubmit={handleLogin} className="mt-10 max-w-md mx-auto">
        {showAlert && (
            <AlertList title="Failed to register, one or more of these are happened" items={errorItems} onClick={()=>setShowAlert(false)}></AlertList>
        )}
      <Input required id={useId()} name="email" value={form.email} type="email" onChange={handleFormChange} label="Email" ></Input>
      <Input required id={useId()} name="name" value={form.name} type="text" onChange={handleFormChange} label="Name" ></Input>
      <Input required id={useId()} name="password" value={form.password} type="password" onChange={handleFormChange} label="Password" ></Input>
      <Input required id={useId()} name="password_confirmation" value={form.password_confirmation} type="password" onChange={handleFormChange} label="Password Confirmation" ></Input>
      {isLoading ? <LoadingButton></LoadingButton> : <Button type="submit" content="Submit"></Button>}
    </form>
    
}