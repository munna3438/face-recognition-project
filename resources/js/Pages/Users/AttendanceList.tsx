import { Button } from "@/components/ui/button";
import { CapturesTable } from "@/components/user/CapturesTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { Capture } from "@/types";

import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function AttendanceList() {
    const [attendances, setAttendances] = useState<Capture[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        setInterval(() => {
            fetch("/api/user-attendance")
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setAttendances(data.reverse());
                })
                .finally(() => {
                    setPending(false);
                });
        }, 1000);
    }, []);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold ">Attendance List</h2>
            </div>
            <div className="relative top-14">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin" />
                    </div>
                )}
            </div>
            <CapturesTable captures={attendances} />
        </AuthLayout>
    );
}
