import { BakCapturesTable } from "@/components/user/BakCapturesTable";
import CapturesTable from "@/components/user/CapturesTable";
import AuthLayout from "@/Layouts/AuthLayout";
import {
    Capture,
    CaptureListResponse,
    Institute,
    InstituteListResponse,
} from "@/types";
import { isEqual } from "lodash";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
                .then((data: CaptureListResponse) => {
                    const isDataDifferent = !isEqual(
                        data.data,
                        prevAttendancesRef.current
                    );

                    if (isDataDifferent) {
                        setAttendances(data.data);
                        prevAttendancesRef.current = data.data;
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
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-lg font-bold">Live Face Recognition</h2>
            </div>
            <div className="relative top-14">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin z-20" />
                    </div>
                )}
            </div>
            {/* <CapturesTable captures={attendances} /> */}
            <BakCapturesTable captures={attendances} />
        </AuthLayout>
    );
}
