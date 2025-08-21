import React , {useState , useEffect} from 'react';
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import Button from "../../components/basic/button/Button";
import Header from "../../components/basic/Header";
import {EyeIcon, MessageSquare , Trash2Icon} from "lucide-react";
import useToast from '../../hooks/useToast';
import { ToastContainer } from '../../Toast';
import usePageTile from "../../hooks/usePageTitle";
import { useNavigate } from 'react-router-dom';

const ReviewSuggestions = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');
    const {fetchData , response} = useFetch({endpoint : "/users/admin/viewSuggestions"})
    const {token} = useAuth()
    usePageTile("Suggestions")
    const navigator = useNavigate()
    // const {toasts, addToast, removeToast} = useToast


    const fetchSuggestions = async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchData({token: token.current})
            if (response.current.ok) {
                const data = await response.current.json()
                console.log(data)
                setSuggestions(data)
                // addToast('Suggestion submitted anonymously!','success');
            }
    
        } catch (err) {
            setError(`Failed to fetch suggestions: ${err.response?.data?.message || err.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };
    //
    useEffect(() => {
        fetchSuggestions();
    }, []);

    const shortenText = (text) =>{
        let mid = 50
        if(text.length > mid){
            return text.substring(0, mid) + "..."
        }
        return text
    }


    return (
        <div className=" p-8 ">
            {/* <ToastContainer toasts={toasts} removeToast={removeToast} /> */}

            <Header title={"Review Suggestions"} Icon={MessageSquare} />
            <p className="text-gray-600 mb-6">Review and manage suggestions submitted by staff members.</p>

            {message && <p className="mb-4 text-center text-sm font-medium text-blue-600">{message}</p>}

            <div className="space-y-4">
                {suggestions.length === 0 ? (
                    <p className="text-gray-500">No new suggestions.</p>
                ) : <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"}>
                    {suggestions.map((sugg, index) => (
                        <div key={index} className="flex justify-between p-5 border border-gray-300  dark:border-blue-300 rounded-md bg-gray-200 dark:bg-blue-900 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="text-lg font-semibold text-gray-800 dark:text-blue-300">{shortenText(sugg.suggestion_box)} </h4>
                            </div>


                            <div className="flex space-x-2">
                                <button onClick={() => navigator(`/portal/review-suggestions/${index+1}`)}
                                        className=" h-fit bg-orange-600 hover:bg-orange-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-sm rounded-md text-white py-1 px-3">
                                    <EyeIcon />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    );
};

export default ReviewSuggestions;