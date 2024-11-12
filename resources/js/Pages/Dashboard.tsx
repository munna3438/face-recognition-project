import { BakCapturesTable } from "@/components/user/BakCapturesTable";
import CapturesTable from "@/components/user/CapturesTable";
import AuthLayout from "@/Layouts/AuthLayout";
import { Capture } from "@/types";
import { isEqual } from "lodash";

import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function Dashboard() {
    const [attendances, setAttendances] = useState<Capture[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const prevAttendancesRef = useRef<Capture[]>([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch("/api/attendances")
                .then((res) => res.json())
                .then((data: Capture[]) => {
                    const isDataDifferent = !isEqual(
                        data,
                        prevAttendancesRef.current
                    );

                    if (isDataDifferent) {
                        setAttendances(data.reverse());
                        prevAttendancesRef.current = data;
                    }
                })
                .finally(() => {
                    setPending(false);
                });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Live Face Recognition</h2>
            </div>
            <div className="relative top-14">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin" />
                    </div>
                )}
            </div>
            {/* <CapturesTable captures={attendances} /> */}
            <BakCapturesTable captures={attendances} />
        </AuthLayout>
    );
}
