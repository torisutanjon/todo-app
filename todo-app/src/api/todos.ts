import axios from 'axios'

const todoAPI = {
    createTodo : async (title:string, body:string, userid:string) => {
       try {
         const res = await axios({
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            url: "/todo/create-todo",
            data:{
                title,
                body,
                userid
            }
        })

        window.alert(res?.data?.message)
        window.location.href = "/"
       } catch (error:any) {
        console.log(error)
        window.alert(error?.response?.data?.message)
       }
    },
    getTodo: async (userID:String) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type":"application/json"
                },
                method: "POST",
                url: "/todo/get-todos",
                data: {
                    userID
                }
            })
            return res?.data?.todos
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    },
    getTodoDetails: async (id:string, creator:string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type":"application/json"
                },
                method: "POST",
                url: "/todo/get-todos-details",
                data: {
                    id,
                    creator
                }
            })

            return res?.data?.todo
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    }
}

export default todoAPI