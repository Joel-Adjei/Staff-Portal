import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom'
import { Search, Filter, Users, PlusCircle, Eye, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Header from "../../components/basic/Header";
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import OutlineButton from "../../components/basic/button/OutlineButton";
import useToast from "../../hooks/useToast";
import {ToastContainer} from "../../Toast";
import {usePortal} from "../../context/PortalContext";
import AppModal from "../../components/basic/AppModal";

const ManageStaff = () => {
    const [staffToDelete , setStaffToDelete] = useState(null)
    const {toasts, addToast, removeToast} = useToast()
    const { token , staff , fetchAllStaffs } = useAuth()
    const { loading, setLoading } = usePortal()
    const [displayConfirmDelete , setDisplayConfirmDelete] = useState(false)
    const navigator = useNavigate()

    // user data
    const { fetchData : deleteStaff  , response: deleteResponse} = useFetch({method: "DELETE",endpoint: "/users/admin/delete"})


    const delStaff = async (email)=> {
        setLoading(true)
        const payload={
            "email" : `${email}`
        }
        try{
            await deleteStaff({token: token.current , payload: payload})
            if(deleteResponse.current.ok){
                const data = await deleteResponse.current.json()
                addToast("staff deleted successful" , "success" , 6000)
                console.log(data)
		fetchAllStaffs()
            }

        }catch (e) {
            console.log(e)
            addToast(e.message , "error" , 6000)
            console.log(deleteResponse)
        }finally {
            setLoading(false)
        }
    }
    // Initialize users
    useEffect(() => {
        staff.length === 0 && fetchAllStaffs()
    }, []);



    const StatusBadge = ({ status }) => {
        const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
        let statusClasses;

        switch(status) {
            case 'staff':
                statusClasses = "bg-blue-100 text-blue-800";
                break;
            case 'non teaching staff':
                statusClasses = "bg-green-100 text-green-800";
                break;
            case 'admin':
                statusClasses = "bg-purple-100 text-purple-800";
                break;
            default:
                statusClasses = "bg-gray-100 text-gray-800";
        }

        return (
            <span className={`${baseClasses} ${statusClasses}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
        );
    };

    const TableRow = ({ user }) => {
        // const [confirmDelete , setConfirmDelete] = useState(false)

        return (
            <>
                <tr
                    className={`border-b border-gray-200 dark:bg-blue-950 hover:bg-gray-50 transition-all duration-300 `}
                > {user.email &&
                <>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gray-400"
                                > </div>
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-blue-300">{user.name}</div>
                                <div className="text-sm text-gray-500 dark:text-blue-100">{user.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            {/*<Briefcase className="w-4 h-4 mr-2 text-gray-400" />*/}
                            <span className="text-sm text-gray-900 dark:text-blue-300">{user.classTaught}</span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={user.role} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center dark:bg-blue-50 rounded dark:p-1 justify-end space-x-2">
                            <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors">
                                <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors">
                                <Trash2
                                    className="w-4 h-4"
                                    onClick={()=>{
                                        setStaffToDelete(staff.filter(({email})=>email == user.email))
                                        console.log(staff.filter(({email})=>email == user.email))
                                        setDisplayConfirmDelete (true)
                                    }}
                                />
                            </button>
                        </div>
                    </td>
                </>
                }

                </tr>
            </>
        );
    };

    return (
        <div className="p-4 min-h-screen ">

            {displayConfirmDelete &&
                <AppModal
                    text={`Do you want to delete ${staffToDelete[0].name}`}
                    onYes={() => {
                         delStaff(staffToDelete[0].email)
                        console.log(staffToDelete[0])
                        setDisplayConfirmDelete(false)
                    }}
                    onCancel={()=>setDisplayConfirmDelete(false)}
                />
            }

            <ToastContainer toasts={toasts} removeToast={removeToast} />
            {/* Header */}
            <Header Icon={Users} title={"All Staffs"} />

            <div className="flex items-center space-x-3">
                <OutlineButton
                    onClick={()=> navigator("/portal/addStaff")}
                >
                    <PlusCircle  />
                    Add Staff
                </OutlineButton>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium">
                    {staff.length} users
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}


                {/* Table */}
                {staff &&
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50 dark:bg-blue-200">
                            <tr>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-950 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>User</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-950 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Role</span>
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-blue-950 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>Status</span>
                                    </div>
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-blue-950 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {staff.map((user) => (
                                <>
                                    <TableRow key={user.id} user={user} />
                                </>

                            ))}
                            </tbody>
                        </table>
                    </div>

                    {staff.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>
                }

            </div>
        </div>
    );
};

export default ManageStaff;