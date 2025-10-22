import { useState, useId, useEffect } from "react"
import { Button, LoadingButton } from "@components/Button"
import Input from "@components/Input"
import http from "../../api/api"
import { AlertInfo } from "@components/Alert";
import { useNavigate } from "react-router";
import Navbar from "@components/Navbar";
import Loader from "@components/Loader";

export default function CreateGlossary() {
    const [loader, setLoader] = useState(true)
    
    const navigation = useNavigate()
    useEffect(()=>{
        setTimeout(()=>{
            setLoader(false)
            if(!sessionStorage.getItem("token")){
                navigation("/login", {
                    replace:true
                })
            }
            }, 500)
    }, [navigation])
    
    const [isLoading, setIsLoading] = useState(false);
    const termId = useId()
    const definitionId = useId()
    const sourceId = useId()
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

     const handleSubmitForm = async (e) => {
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = await http.post("/glossary", form)
            setShowAlert(true)
            setShowErrorAlert(false)
            setForm(
                {
                    term : "", 
                    definition : "", 
                    source : ""
                }
            )
        }catch(error){
            setIsLoading(false)
            
            setShowErrorAlert(true)
        }finally{
            setIsLoading(false)
        }
     }

     if(loader){
        return <Loader/>
    }
    

  return <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
    {showAlert && <AlertInfo onClose={()=>setShowAlert(false)} alertType="Info" alertContent="New glossary added" color="blue" />}
    {showErrorAlert && <AlertInfo onClose={()=>setShowErrorAlert(false)} alertType="Error! " alertContent="Failed to add data" color="red" /> }
    <Navbar/>
    <form onSubmit={handleSubmitForm} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl mt-12">
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
                <footer className="mt-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Glossary. All rights reserved.
                </footer>
        </div>
}
