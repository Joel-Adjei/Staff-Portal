import React, {useState , useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import Header from "../../components/basic/Header";
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import {FileText, Megaphone} from "lucide-react";
import usePageTile from "../../hooks/usePageTitle";

const ReviewLeave = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const {fetchData , response} = useFetch({endpoint : "/users/admin/leaveApplications"});
    const {token} = useAuth()
    const navigator = useNavigate()
    usePageTile("Leave Applications")

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchData({token: token.current})
             if(response.current.ok){
		const data = await response.current.json()
            	console.log(data)
                 await setApplications(data);
             }
        } catch (err) {
            setError(`Failed to fetch applications: ${err.response?.data?.message || err.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);


    // if (loading && !applications.length) return <p className="text-center text-gray-700">Loading leave applications...</p>;
    // if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className=" p-8">
            <Header title={"Review Leave Applications"} Icon={FileText}/>
            <p className="text-gray-600 mb-6">Review, approve, or reject leave applications submitted by staff members.</p>

            {message && <p className="mb-4 text-center text-3xl font-medium text-blue-600">{message}</p>}

            <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 text-gray-500 dark:bg-blue-300 dark:text-blue-950 dark:border-none">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Staff</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Dates</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-blue-950 divide-y divide-gray-200">
                    {applications.length === 0 ? (
                        <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No leave applications to review.</td></tr>
                    ) : (
                        applications.map((app) => (
                            <tr key={app.id}
                                onClick={()=> navigator(`/portal/review-leave/${app.id}`)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-blue-300"
                                    
                                >
                                    {app.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.start_date} to {app.end_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                </td>
                        
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReviewLeave;

// --- Reusable Button Component ---
const Button = ({ children, onClick, className = '', type = 'button' }) => {

    return (
    <button
        type={type}
        onClick={onClick}
        className={`w-fit dark:text-[#F8F9FF]  dark:bg-blue-900 bg-gradient-to-br from-blue-900 to-blue-800 hover:bg-blue-950 text-md text-white font-semibold py-2 px-12 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
        {children}
    </button>
    )
};