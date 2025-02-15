import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { login } from "@/store/authSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function Auth() {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    })

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/v1/users/login", {
                identifier,
                password
            }, {
                withCredentials: true,
            });
            
            dispatch(login({userData: response.data}))
            alert('Login Successful!')
            navigate("/chat")
                console.log("Response Data: ", response.data);
            } catch (error) {
                console.error("Login Error: ", error);
                alert("Something went wrong, please try again,");
            }
        }
        
    const handleSignUp = async(e) => {
        try {
            e.preventDefault();
            const response = await axios.post("/api/v1/users/register",
                formData,
                {
                    withCredentials: true,
                }
            );
            setMessage(response.data.message || "User registered successfully!");
            dispatch(login({userData: response.data}))
            navigate("/")
            console.log("Response Data: ", response.data);
        alert("Please Login to Enter")
    } catch (error) {
        setMessage(
            error.response?.data?.message || "An Error Occured during registration"
        )
    }}

    return (
        <div className="h-screen w-full md:h-[100vh] md:w-[100vw] flex items-center justify-center bg-[#E5E5E5]">
            <div className="m-5 w-full md:h-[90vh] md:w-[60vw] bg-[#DFB681] rounded-2xl flex flex-col items-center justify-center shadow-2xl border border-red-100 py-5">
            <h1 className="font-bold text-center text-2xl md:text-7xl p-2 pt-4"><span className="text-3xl md:text-9xl font-extrabold text-red-900">C</span>ONVO<span className="md:text-9xl text-3xl text-red-900">N</span>EST</h1>
                <div className="flex items-center justify-center w-full">
                <Tabs className="w-3/4">
                    <TabsList className="bg-transparent rounded-none w-full">
                        <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300">login</TabsTrigger>
                        <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:font-semibold data-[state=active]:border-b-black p-3 transition-all duration-300">signup</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="flex flex-col gap-5">
                        <Input type="text" placeholder="Enter your Email or username" className="bg-gray-200" value={identifier} onChange={(e) => setIdentifier(e.target.value)}/>
                        <Input type="password" placeholder="Enter your Password" value={password} className="bg-gray-200" onChange={(e) => setPassword(e.target.value)}/>
                        <Button onClick={handleLogin} className="rounded-full p-6">Login</Button>
                    </TabsContent>
                    <TabsContent value="signup" className="flex flex-col gap-5">
                    <Input type="text" name="fullName" placeholder="Enter your Fullname" value={formData.fullName} className="bg-gray-200" onChange={handleChange}/>
                    <Input type="email" name="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange} className="bg-gray-200"/>
                    <Input type="text" className="bg-gray-200" name="username" placeholder="Enter your Username" value={formData.username} onChange={handleChange}/>
                    <Input type="password" name="password" className="bg-gray-200" placeholder="Enter your Password" value={formData.password} onChange={handleChange}/>
                        <Button onClick={handleSignUp} className="rounded-full p-6">Sign Up</Button>
                    </TabsContent>
                </Tabs>
                </div>
            </div>
        </div>        
    )
}

export default Auth
