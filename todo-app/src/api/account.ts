import axios from 'axios'

const accountAPI = {
    createAccount: async (username: string, password: string) => {
        try {
            const res = await axios({
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            url: "/account/create-account",
            data: {
                username,
                password
            }
        })
        window.alert(res?.data?.message)
        window.location.href = "/login"
        } catch (error:any) {
            window.alert(error?.response?.data?.message)
        }
    },
    loginAccount: async (username: string, password: string) => {
        try {
            const res = await axios({
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                url: "/account/login-account",
                data: {
                    username,
                    password
                }
            })
            localStorage.setItem("token", res?.data?.token)
            window.alert(res?.data?.message)
            window.location.href = "/"
        } catch (error:any) {
            window.alert(error?.response?.data?.message)
        }
    }
}

export default accountAPI