import axios from 'axios'

const todoAPI = {
    createTodo : async (title:string, body:string, userid:string, username:string) => {
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
                userid,
                username
            }
        })

        window.alert(res?.data?.message)
        window.location.href = "/"
       } catch (error:any) {
        console.log(error)
        window.alert(error?.response?.data?.message)
       }
    },
    getTodo: async () => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type":"application/json"
                },
                method: "POST",
                url: "/todo/get-todos",
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
    },
    updateTodo: async (todoId:string, title:string, body:string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                url:"/todo/update-todo",
                data: {
                    todoId,
                    title,
                    body
                }
            })

            window.alert(res?.data?.message)
            window.location.href = "/"
        } catch (error:any) {
            console.log(error)
            return window.alert(error?.response?.data?.message)
        }
    },
    deleteTodo: async (todoID:string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                url:"/todo/delete-todo",
                data: {
                    todoID
                }
            })

            window.alert(res?.data?.message)
            window.location.href = "/"
        } catch (error:any) {
            console.log(error)
            return window.alert(error?.response?.data?.message)
        }
    }
}

export default todoAPI