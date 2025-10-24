import { useCallback, useEffect, useState, useId } from "react"
import { useParams, useNavigate } from "react-router"
import { AlertInfo } from "@components/Alert"
import Navbar from "@components/Navbar"
import Input from "@components/Input"
import Loader from "@components/Loader"
import { Button, LoadingButton } from "@components/Button"
import http from "@api/api"

export default function UpdateGlossary() {
  const navigation = useNavigate()
  const param = useParams()
  const [isLoading, setIsLoading] = useState(false)  
  const [loader, setLoader] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false)
  const termId = useId()
  const definitionId = useId()
  const sourceId = useId()
  const [form, setForm] = useState({
    term : "",
    definition : "",
    source : ""
  })

  const handleFormChange = (e)=>{
    const {name,value} = e.target

    setForm({
      ...form,
      [name] : value
    })
  }

  const fetchGlossary = useCallback(async()=>{
    try{
      setLoader(true)
      const response = await http.get(`/glossary/${param.id}`)
      setForm(response.data.data[0])
    }catch(error){
      if(error.status === 403){
        setShowUnauthorizedAlert(true)
        setTimeout(()=>{
          navigation("/glossary", {
            replace:true
          })
        }, 2000)
      }else{
        setShowErrorAlert(true)
      }
    }finally{
      setLoader(false)
      setIsLoading(false)
    }
  },[param.id])

  useEffect(()=>{
    fetchGlossary()
  }, [fetchGlossary])

  const handleSubmitForm = async(e)=>{
    e.preventDefault()
    try{
      setIsLoading(true)
      const response = await http.put(`/glossary/${param.id}`, form)
      if(response.status === 200){
        navigation("/glossary", {
          replace:true
        })
      }
      console.log(response);
    }catch(error){
      setShowErrorAlert(true)
    }finally{
      setIsLoading(false)
    }
  }

  if(loader){
    return <Loader/>
  }
  return <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
    {showAlert && <AlertInfo onClose={()=>setShowAlert(false)} alertType="Info" alertContent="Glossary updated" color="blue" />}
    {showErrorAlert && <AlertInfo onClose={()=>setShowErrorAlert(false)} alertType="Error! " alertContent="Failed to update data" color="red" /> }
    {showUnauthorizedAlert && <AlertInfo onClose={()=>setShowErrorAlert(false)} alertType="Unauthorized! " alertContent="You are not the owner of this data" color="red" /> }
    <Navbar/>
    <form onSubmit={handleSubmitForm} className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update a Term</h2>
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
