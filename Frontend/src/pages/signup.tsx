import { useState } from "react";
import { Button } from "../assets/ui/Button";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const [Username,setUsername] = useState('');
    const [Passwd,setPasswd] = useState('');
    const [Loading,setLoading] = useState(false);
    const [ErrorMessage,setError] = useState<string|null>(null);
    const navigate = useNavigate();

    const handleSignUp =async ()=>{
        setError(null);
        setLoading(true);

        try {
            await api.post("/signup",{
                username : Username,
                password : Passwd
            });

            alert("Signed up")
        } catch (error:any) {
            if(error.response){
                console.log(error)
                setError(
                    error.response.data.message || 'Signup failed'
                );
            }else{
                setError('Server failed')
            }
        }finally{
            setLoading(false);
            navigate('/signin')
        }
        
    }

    return (
        <>
            <div className="flex justify-center items-center bg-gray-300 min-h-screen">
                <div className="px-8 py-6 rounded-xl flex flex-col bg-white items-center justify-center">
                    <span className="text-2xl font-bold text-[#5046E4] mb-6 ">
                        Sign up
                    </span>
                    <div className=" flex flex-col gap-2 items-center justify-center">
                        <input
                            type="text"
                            className="outline rounded-xl p-2 outline-[#5046E4] text-gray-900"
                            placeholder="Enter your Name"
                            onChange={(e)=>{
                                setUsername(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            className="outline rounded-xl p-2 outline-[#5046E4] text-gray-900"
                            placeholder="Enter your password"
                            onChange={(e)=>{
                                setPasswd(e.target.value);
                            }}
                        />

                        {ErrorMessage && (
                            <p className="text-red-500">{ErrorMessage}</p>
                        )}

                        <span className="w-full py-3">
                            <Button
                                size="fullWidth"
                                intent="primary"
                                text={Loading?"Signing ...":"Sign up"}
                                onClick={handleSignUp}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};
