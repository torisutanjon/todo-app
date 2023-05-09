import axios from 'axios'

const Comment  = {
    getComment: async (todoID:string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                url: "/comment/get-comment",
                data: {
                    todoID
                }
            })

            return res?.data?.comments
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    },
    addComment: async (todoID:string, body:string, creatorID:string, creatorName:string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json"
                },
                method:"POST",
                url: "/comment/add-comment",
                data: {
                    todoID,
                    comment: body,
                    creatorID,
                    creatorName,
                }
            })

            window.location.href = "/"
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    },
    updateComment:  async (commentid:string, value:string) => {
        try {
           const res = await axios({
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            url: "/comment/update-comment",
            data: {
                commentid,
                value
            }
           })

           window.alert(res?.data?.message)
           window.location.href = "/"
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    },
    deleteComment: async (commentid:string, todoid:String) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json"
                },
                method:"POST",
                url: "/comment/delete-comment",
                data: {
                    todoid,
                    commentid
                }
            })

            window.alert(res?.data?.message)
            window.location.href = "/"
        } catch (error:any) {
            console.log(error)
            window.alert(error?.response?.data?.message)
        }
    }
}

export default Comment