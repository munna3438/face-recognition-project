import NavLink from "@/Components/NavLink";
import InstitutesTable from "@/components/user/InstitutesTable";
import UsersTable from "@/components/user/UsersTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { Institute, InstituteListResponse } from "@/types";
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Index() {
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    // const prevUsersRef = useRef<Institute[]>([]);

    useEffect(() => {
        // const intervalId = setInterval(() => {
        fetch("/api/institute/list")
            .then((res) => res.json())
            .then((data: InstituteListResponse) => {
                setInstitutes(data.data);
                // const isDataDifferent = !isEqual(data, prevUsersRef.current);

                // if (isDataDifferent) {
                //     prevUsersRef.current = data;
                // }
            })
            .finally(() => {
                setPending(false);
            });
        // }, 1500);

        return () => {
            // clearInterval(intervalId);
        };
    }, []);

    return (
        <AuthLayout>
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg font-bold">Institutes List</h2>

                <NavLink
                    href={route("institute.add")}
                    active={route().current("institute.add")}
                    className="primary_button"
                >
                    Add Institute
                </NavLink>
            </div>
            <div className="relative top-14 ">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin z-10" />
                    </div>
                )}
            </div>
            <InstitutesTable institutes={institutes} />
        </AuthLayout>
    );
}
