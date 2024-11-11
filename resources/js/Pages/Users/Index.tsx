import UsersTable from "@/components/user/UsersTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { FaceUser } from "@/types";
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Dashboard() {
    const [users, setUsers] = useState<FaceUser[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const prevUsersRef = useRef<FaceUser[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("/api/users-list")
                .then((res) => res.json())
                .then((data: FaceUser[]) => {
                    const isDataDifferent = !isEqual(data, prevUsersRef.current);

                    if (isDataDifferent) {
                        setUsers(data.reverse());
                        prevUsersRef.current = data;
                    }
                })
                .finally(() => {
                    setPending(false);
                });
        }, 1500);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Users List</h2>
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
