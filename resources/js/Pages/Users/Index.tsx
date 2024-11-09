import AuthLayout from "@/Layouts/AuthLayout";

import React from "react";

export default function Dashboard() {
    return (
        <AuthLayout>
            <div className="hx-container p-5">
                <h1 className="text-2xl font-bold mb-4">User List</h1>
                <table className="min-w-full border border-white">
                    <thead>
                        <tr className="border border-white text-left font-bold text-xl">
                            <th className="p-2">User Name</th>
                            <th className="p-2">User ID</th>
                            <th className="p-2">Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border border-white ">
                            <td className="p-2">John Doe</td>
                            <td className="p-2">123456</td>
                            <td className="p-2">
                                <img src="#" alt="John Doe" />
                            </td>
                        </tr>
                        <tr className="border border-white">
                            <td className="p-2">John Doe</td>
                            <td className="p-2">123456</td>
                            <td className="p-2">
                                <img
                                    className="h-[40px] w-auto"
                                    src="/image/userPlaceholder.jpg"
                                    alt="John Doe"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AuthLayout>
    );
}
