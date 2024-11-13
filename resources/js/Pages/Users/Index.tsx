import NavLink from "@/Components/NavLink";
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
                    const isDataDifferent = !isEqual(
                        data,
                        prevUsersRef.current
                    );

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
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold text_primary">
                    Add User
                </h1>
                <NavLink
                    href={route("users.image")}
                    active={route().current("dashboard")}
                    className="primary_button"
                >
                    Add User
                </NavLink>
            </div>
            <div className="relative top-14 ">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin z-20" />
                    </div>
                )}
            </div>
            <UsersTable users={users} />
        </AuthLayout>
    );
}
