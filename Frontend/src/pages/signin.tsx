import { useState } from "react";
import { Button } from "../assets/ui/Button";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
    const [Username, setUsername] = useState("");
    const [Passwd, setPasswd] = useState("");
    const [Loading, setLoading] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState<null | string>(null);
    const navigate = useNavigate();

    const handleSigninRequest = async () => {
        setLoading(true);
        try {
            const response = await api.post("/signin", {
                username: Username,
                password: Passwd,
            });
            const token = response.headers["token"];
            console.log(token);

            localStorage.setItem('token',token)//local storage mei token ko daalo
            
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.response?.data ||
                "Signin failed";
            setErrorMessage(message);
        }finally{
            setLoading(false);
        }
        navigate('/dashboard')
    };
    return (
        <>
            <div className="flex justify-center items-center bg-gray-300 min-h-screen">
                <div className="px-8 py-6 rounded-xl flex flex-col bg-white items-center justify-center">
                    <span className="text-2xl font-bold text-[#5046E4] mb-6 ">
                        Sign in
                    </span>
                    <div className=" flex flex-col gap-2 items-center justify-center">
                        <input
                            type="text"
                            className="outline rounded-xl p-2 outline-[#5046E4] text-gray-900"
                            placeholder="Enter your Name"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="outline rounded-xl p-2 outline-[#5046E4] text-gray-900"
                            placeholder="Enter your password"
                            onChange={(e) => {
                                setPasswd(e.target.value);
                            }}
                        />
                        <span className="w-full py-3">
                            <Button
                                size="fullWidth"
                                intent="primary"
                                text={Loading ? "Signing in..." : "Sign in"}
                                onClick={handleSigninRequest}
                            />
                        </span>
                        {ErrorMessage && <p className="p-1 text-red-500">{ErrorMessage}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};
