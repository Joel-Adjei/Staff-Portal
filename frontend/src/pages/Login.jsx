import React ,{useState} from "react";
import { api } from '../services/api'
import { usePortal } from "../context/PortalContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { colors } from "../assets/assets";

// --- Login/Signup Page Component ---
const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true); // true for Login, false for Signup
    const [isStaff, setIsStaff] = useState(true); // true for Staff, false for Admin
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For signup
    const [message, setMessage] = useState('');
    const [error , setError] = useState(null)
    const [loading, setLoading] = useState(false);

    const {handleLoginSuccess : onLoginSuccess } = usePortal()

    const handleAuth = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        const role = isStaff ? 'staff' : 'admin';
        const payload = isLogin
            ? { username, password, role }
            : { username, password, role, name };

        try {
            const result = await api.post(endpoint, payload);
            setMessage(result.message);
            onLoginSuccess(result.user.role, result.user.name, result.user.id); // Pass user ID
        } catch (error) {
            console.error('Authentication error:', error);
            setError(error.message)
            // Axios errors often have a `response.data` property for server messages
            setMessage(`Authentication failed: ${error.response?.data?.message || error.message || 'Server error'}`);
        } finally {
            setLoading(false);
            setPassword("")
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col gap-6 items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 p-4">
            {/* bg desgins */}
            <div className={`bg-gradient-to-br from-blue-700/60  to-blue-50  absolute bottom-0 left-8 rounded-t-full h-[220px] w-[130px]`}></div>
            <div className={`bg-gradient-to-tl from-orange-700/80 to-orange-400 absolute block -top-20 rounded-b-full right-8 h-60 w-[130px]`}></div>

            <div className="absolute top-0 left-0 flex justify-center ml-3 pb-4">
                    <button
                        className={`px-6 py-2 rounded-b-lg text-lg font-medium transition-colors duration-200 ${isLogin ? `${colors.orange_gradient} text-white` : ' text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`px-6 py-2 rounded-b-lg text-lg font-medium transition-colors duration-200 ${!isLogin ? `${colors.orange_gradient} text-white` : ' text-gray-700 hover:bg-gray-300'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Signup
                    </button>
                </div>
            
            <div>
                <h2 className="text-xl uppercase text-gray-600 font-medium">School Name Staff Portal</h2>
            </div>


            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-3xl leading-none font-bold text-center text-blue-700 mb-3">
                        {isLogin ? 'Login' : 'Signup'}
                    </h2>
                    <div className="h-[3px] w-[70px] rounded-full bg-orange-300"></div>
                </div>
                

                

                <div className="flex justify-center mb-6">
                    <button
                        className={`px-4 py-2 rounded-l-md text-sm transition-colors duration-200 ${isStaff ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setIsStaff(true)}
                    >
                        Staff
                    </button>
                    <button
                        className={`px-4 py-2 rounded-r-md text-sm transition-colors duration-200 ${!isStaff ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setIsStaff(false)}
                    >
                        Admin
                    </button>
                </div>

                <form onSubmit={()=> navigator("/dashboard")} className="space-y-4">
                    {!isLogin && (
                        <Input
                            type="text"
                            placeholder="Full Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="signupName"
                        />
                    )}
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        required
                        className={`${error ? "border-red-500" : " "}`}
                        onChange={(e) => setUsername(e.target.value)}
                        id="authUsername"
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        className={`${error ? "border-red-500" : " "}`}
                        onChange={(e) => setPassword(e.target.value)}
                        id="authPassword"
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Processing...' : (isLogin ? 'Login' : 'Signup')}
                    </Button>
                </form>

                {message && (
                    <p className={`mt-4 text-center text-sm font-medium ${error ? "text-red-500" : "text-blue-500"}`}>{message}</p>
                )}
            </div>
        </div>
    );
};

export default AuthPage;