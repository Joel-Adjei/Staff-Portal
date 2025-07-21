import React, {useState} from "react";
import Button from "../../components/basic/button/Button";
import Input from "../../components/basic/input/Input";
import Header from "../../components/basic/Header";
import {BookText} from "lucide-react";

const SubmitPerformance = ({ userName }) => {
    const [className, setClassName] = useState('');
    const [averageScore, setAverageScore] = useState('');
    const [performanceComments, setPerformanceComments] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!className || averageScore === '' || !userName) {
            setMessage('Please fill all required fields.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                className,
                averageScore: parseFloat(averageScore),
                performanceComments,
                staffName: userName,
            };
            const result = await api.post('/staff/performance', payload);
            setMessage(result.message);
            setClassName('');
            setAverageScore('');
            setPerformanceComments('');
        } catch (error) {
            console.error('Submit performance error:', error);
            setMessage(`Submission failed: ${error.response?.data?.message || error.message || 'Server error'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-md">
            <Header Icon={BookText} title={"Submit Class Performance"} />
            <p className="text-gray-600 mb-6">Enter the performance metrics for your class.</p>


            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="className" className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                    <Input type="text" id="className" placeholder="e.g., Grade 5A Science" value={className} onChange={(e) => setClassName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="averageScore" className="block text-sm font-medium text-gray-700 mb-1">Average Score (%)</label>
                    <Input type="number" id="averageScore" min="0" max="100" placeholder="e.g., 85" value={averageScore} onChange={(e) => setAverageScore(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="performanceComments" className="block text-sm font-medium text-gray-700 mb-1">Comments</label>
                    <textarea id="performanceComments" rows="4" value={performanceComments} onChange={(e) => setPerformanceComments(e.target.value)} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Add any relevant comments on class performance..."></textarea>
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Performance'}
                </Button>
                {message && <p className="text-sm text-blue-600">{message}</p>}
            </form>
        </div>
    );
};

export default SubmitPerformance