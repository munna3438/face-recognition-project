import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UsersTable from "@/components/user/UsersTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { FaceUser, FaceUserListResponse, Institute, InstituteListResponse } from "@/types";
import { isEqual } from "lodash";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Index() {
    const [users, setUsers] = useState<FaceUser[]>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [selectedInstitute, setSelectedInstitute] = useState<string | undefined>();

    const prevUsersRef = useRef<FaceUser[]>([]);

    function handleChange(e: string) {
        setSelectedInstitute(e);
    }

    useEffect(() => {
        setPending(true);
        fetch("/api/institute/list")
            .then((res) => res.json())
            .then((data: InstituteListResponse) => {
                setInstitutes(data.data);
                setSelectedInstitute(data.data[0].token);
            })
            .finally(() => {
                // setPending(false);
            });
    }, []);

    useEffect(() => {
        setPending(true);
        setUsers([]);
        const intervalId = setInterval(() => {
            fetch("/api/users-list?token=" + selectedInstitute)
                .then((res) => res.json())
                .then((data: FaceUserListResponse) => {
                    const isDataDifferent = !isEqual(data.data, prevUsersRef.current);

                    if (isDataDifferent) {
                        setUsers(data.data);
                        prevUsersRef.current = data.data;
                    }
                })
                .finally(() => {
                    setPending(false);
                });
        }, 1500);

        return () => {
            clearInterval(intervalId);
        };
    }, [selectedInstitute]);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Users List</h2>
                <div>
                    <Select defaultValue={selectedInstitute} onValueChange={(e) => handleChange(e)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select an institute" />
                        </SelectTrigger>
                        <SelectContent>
                            {institutes.map((institute, i) => {
                                return (
                                    <SelectItem key={institute.id} value={institute.token}>
                                        {institute.name}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                </div>
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
