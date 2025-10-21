import { useState, useId, useEffect } from "react"
import { Button, LoadingButton } from "@components/Button"
import Input from "@components/Input"
import http from "../../api/api"
import { AlertList, AlertInfo } from "@components/Alert";
import { useNavigate } from "react-router";
import Navbar from "@components/Navbar";

export default function CreateGlossary() {
    const navigation = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const termId = useState()
    const definitionId = useState()
    const sourceId = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [showErrorAlert, setShowErrorAlert] = useState(false)
    const [form, setForm] = useState({
        term : "",
        definition : "",
        source : ""
    })

    const handleFormChange = (e) =>{
        const {value, name} = e.target

        setForm({
            ...form,
            [name] : value
        })
     }

     const handleCreateForm = async (e) => {
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = await http.post("/glossary", form)
            setShowAlert(true)
            setShowErrorAlert(false)
        }catch(error){
            setIsLoading(false)
            
            setShowErrorAlert(true)
        }finally{
            setIsLoading(false)
        }
     }
    if(!sessionStorage.getItem("token")){
        navigation("/login", {
            replace:true
        })
    }

  return <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
    {showAlert && <AlertInfo onClose={()=>setShowAlert(false)} alertType="Info" alertContent="New glossary added" color="blue" />}
    {showErrorAlert && <AlertInfo onClose={()=>setShowErrorAlert(false)} alertType="Error! " alertContent="Failed to add data" color="red" /> }
    <Navbar/>
    <form onSubmit={handleCreateForm} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Term</h2>
                <div className="space-y-4">
                    <Input required id={termId} name="term" value={form.term} type="text" onChange={handleFormChange} label="Term"/>
                    <Input required id={definitionId} name="definition" value={form.definition} type="text" onChange={handleFormChange} label="Definition"/>
                    <Input required id={sourceId} name="source" value={form.source} type="text" onChange={handleFormChange} label="Source"/>
                </div>
          
                <div className="mt-8">
                  {isLoading ?  <LoadingButton/> : 
                    <Button type="submit" content="Submit" disabled={!form.term.trim() || !form.definition.trim() || !form.source.trim()}/>
                  }
                </div>
                </form>
        </div>
}
