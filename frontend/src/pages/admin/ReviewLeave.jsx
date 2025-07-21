import React, {useState , useEffect} from "react";
import Button from "../../components/basic/button/Button";
import Header from "../../components/basic/Header";
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import {FileText, Megaphone} from "lucide-react";

const ReviewLeave = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const {fetchData , response} = useFetch({endpoint : "/users/admin/leaveApplications"})
    const {token} = useAuth()

    const fetchApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchData({token: token.current})
            // if(response.current.ok){
            //     await setApplications(response.current.json());
            // }
            console.log(response.current)
        } catch (err) {
            setError(`Failed to fetch applications: ${err.response?.data?.message || err.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const updateApplicationStatus = async (id, newStatus) => {
        setMessage('');
        try {
            await api.put(`/admin/leave-applications/${id}/status`, { status: newStatus });
            setMessage(`Application status updated to ${newStatus}!`);
            // fetchApplications(); // Refresh the list
        } catch (err) {
            setMessage(`Status update failed: ${err.response?.data?.message || err.message || 'Server error'}`);
        }
    };

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
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Dates</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Reason</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Status</th>
                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">Actions</span></th>
                    </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-blue-950 divide-y divide-gray-200">
                    {applications.length === 0 ? (
                        <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">No leave applications to review.</td></tr>
                    ) : (
                        applications.map((app) => (
                            <tr key={app.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.staff}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.type}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.startDate} to {app.endDate}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{app.reason} <a href={app.letterUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">(Letter)</a></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            app.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                                app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {app.status}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {app.status === 'Pending' && (
                                        <>
                                            <Button onClick={() => updateApplicationStatus(app.id, 'Approved')} className="bg-green-600 hover:bg-green-700 text-sm py-1 px-3 mr-2">Approve</Button>
                                            <Button onClick={() => updateApplicationStatus(app.id, 'Rejected')} className="bg-red-600 hover:bg-red-700 text-sm py-1 px-3">Reject</Button>
                                        </>
                                    )}
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