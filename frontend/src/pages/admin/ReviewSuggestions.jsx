import React , {useState , useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import Button from "../../components/basic/button/Button";
import Header from "../../components/basic/Header";
import {MessageSquare} from "lucide-react";

const ReviewSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const {fetchData , response} = useFetch({endpoint : "/users/admin/leaveApplications"})
    const {token} = useAuth()


    // const fetchSuggestions = async () => {
    //     setLoading(true);
    //     setError(null);
    //     try {
    //
    //     } catch (err) {
    //         setError(`Failed to fetch suggestions: ${err.response?.data?.message || err.message || 'Server error'}`);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    //
    // useEffect(() => {
    //     fetchSuggestions();
    // }, []);

    const updateSuggestionStatus = async (id, newStatus) => {
        setMessage('');
        try {
            await api.put(`/admin/suggestions/${id}/status`, { status: newStatus });
            setMessage(`Suggestion status updated to ${newStatus}!`);
            fetchSuggestions(); // Refresh the list
        } catch (err) {
            setMessage(`Status update failed: ${err.response?.data?.message || err.message || 'Server error'}`);
        }
    };

    const handleDeleteSuggestion = async (id) => {
        if (window.confirm('Are you sure you want to delete this suggestion?')) {
            setMessage('');
            try {
                await api.delete(`/admin/suggestions/${id}`);
                setMessage('Suggestion deleted successfully!');
                // fetchSuggestions(); // Refresh the list
            } catch (err) {
                setMessage(`Deletion failed: ${err.response?.data?.message || err.message || 'Server error'}`);
            }
        }
    };

    // if (loading && !suggestions.length) return <p className="text-center text-gray-700">Loading suggestions...</p>;
    // if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className=" p-8 ">
            <Header title={"Review Suggestions"} Icon={MessageSquare} />
            <p className="text-gray-600 mb-6">Review and manage suggestions submitted by staff members.</p>

            {message && <p className="mb-4 text-center text-sm font-medium text-blue-600">{message}</p>}

            <div className="space-y-4">
                {suggestions.length === 0 ? (
                    <p className="text-gray-500">No new suggestions.</p>
                ) : (
                    suggestions.map((sugg) => (
                        <div key={sugg.id} className="p-5 border border-gray-200 rounded-md bg-white shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-semibold text-gray-800">{sugg.subject} <span className="font-normal text-sm text-gray-500">- by {sugg.staff}</span></h4>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    sugg.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                        'bg-green-100 text-green-800'
                                }`}>
                                    {sugg.status}
                                </span>
                            </div>
                            <p className="text-gray-700 mb-4">{sugg.content}</p>
                            <div className="flex space-x-2">
                                {sugg.status === 'New' && (
                                    <Button onClick={() => updateSuggestionStatus(sugg.id, 'Reviewed')} className="bg-indigo-600 hover:bg-indigo-700 text-sm py-1 px-3">Mark as Reviewed</Button>
                                )}
                                <Button onClick={() => handleDeleteSuggestion(sugg.id)} className="bg-red-500 hover:bg-red-600 text-sm py-1 px-3">Delete</Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ReviewSuggestions;