import AuthLayout from "@/Layouts/AuthLayout";
import React, { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
export default function Dashboard() {
    const [uploadedfile, setUploadImage] = useState();
    function handleImageChange(e) {
        setUploadImage(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <AuthLayout>
            <div className="hx-container p-5">
                <h1 className="text-2xl font-bold mb-4">Add User</h1>
                <form action="#" method="POST" className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="userName">Name</label>
                            <input
                                type="text"
                                name="userName"
                                id="userName"
                                className="p-2 border focus:ring-0 border-gray-300 rounded text-[#333]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="UserID">User ID</label>
                            <input
                                type="text"
                                name="UserID"
                                id="UserID"
                                className="p-2 border focus:ring-0 border-gray-300 rounded text-[#333]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="userGender">Gender</label>
                            {/* <input
                                type="text"
                                name="userGender"
                                id="userGender"
                                className="p-2 border focus:ring-0 border-gray-300 rounded text-[#333]"
                            /> */}
                            <select
                                name="userGender"
                                id="userGender"
                                className="p-2 border focus:ring-0 border-gray-300 rounded text-[#333]"
                            >
                                <option value="0" selected>Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="userImage">Image</label>
                            <input
                                type="file"
                                name="userImage"
                                id="userImage"
                                className="p-2 border border-white rounded"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-6">
                        <div className="w-[100px] aspect-square border p-1 border-white">
                            {/* <img className="h-full w-full" src={uploadedfile} /> */}
                            {uploadedfile ? (
                                <img
                                    className="h-full w-full"
                                    src={uploadedfile}
                                />
                            ) : (
                                <IoPersonCircleOutline className="h-full w-full" />
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 justify-end">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded"
                        >
                            Save
                        </button>
                        <button
                            type="reset"
                            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
