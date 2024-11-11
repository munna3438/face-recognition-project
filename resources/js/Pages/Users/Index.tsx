import { CapturesTable } from "@/components/user/CapturesTable";
import { UsersTable } from "@/components/user/UsersTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { FaceUser } from "@/types";

import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Dashboard() {
    const [users, setUsers] = useState<FaceUser[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("/api/users-list")
                .then((res) => res.json())
                .then((data) => {
                    setUsers(data.reverse());
                })
                .finally(() => {
                    setPending(false);
                });
        }, 500);

        return () => {
            clearInterval(intervalId);
        }
    }, []);
    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold ">Users List</h2>
            </div>
            <div className="relative top-14 ">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin" />
                    </div>
                )}
            </div>
            <UsersTable users={users} />
        </AuthLayout>
    );
}
