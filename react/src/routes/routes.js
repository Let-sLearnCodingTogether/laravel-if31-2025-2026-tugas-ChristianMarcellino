import { createBrowserRouter } from "react-router";

const routes = createBrowserRouter([
    {
        path : "/",
        lazy : {
            Component : async()=> {
                const component = await import("@pages/glossary/Home")
                return component.default
            }
        }
    },
    {
        path : "/register",
        lazy : {
            Component : async()=> {
                const component = await import("@pages/glossary/Register")
                return component.default
            }
        }
    },
    {
        path : "/login",
        lazy : {
            Component : async()=> {
                const component = await import("@pages/glossary/Login")
                return component.default
            }
        }
    },
    {
        path : "/create-glossary",
        lazy : {
            Component : async()=> {
                const component = await import("@pages/glossary/CreateGlossary")
                return component.default
            }
        }
    },
    {
        path : "/update-glossary/:id",
        lazy : {
            Component : async()=> {
                const component = await import("@pages/glossary/UpdateGlossary")
                return component.default
            }
        }
    },
    {
        path : "/glossary",
        lazy : {
            Component : async() =>{
                const component = await import("@pages/glossary/Glossary")
                return component.default
            }
        }
    }
])

export default routes;