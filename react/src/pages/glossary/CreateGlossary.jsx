import { useState } from "react"
import { Button } from "@components/Button"
import { Input } from "@components/Input"
import http from "../../api/api"

export default function CreateGlossary() {
    const [form, setForm] = useState({
        term : "",
        definition : "",
        source : ""
    })

    const [isLoading, setIsLoading] = useState(false)

    const handleFormChange = (e) =>{
        const {value, name} = e.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleCreateForm = async(e) => {
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = http.post("/glossary", form)
        }catch(error){
            setIsLoading(false)
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }


  return <div>
    <form onSubmit={handleCreateForm} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
                <div className="space-y-4">
                    <Input required id={useId()} name="term" value={form.term} type="email" onChange={handleFormChange} label="Term"/>
                    <Input required id={useId()} name="definition" value={form.definition} type="text" onChange={handleFormChange}label="Definition"/>
                    <Input required id={useId()} name="source" value={form.source} type="text" onChange={handleFormChange}label="Source"/>
                </div>
          
                <div className="mt-8">
                  {isLoading ?  <LoadingButton/> : 
                    <Button type="submit" content="Register" disabled={form.password_confirmation !== form.password || form.password.length < 8 || !form.email.trim() || !form.name.trim()}/>
                  }
                </div>
                </form>
        </div>
}
