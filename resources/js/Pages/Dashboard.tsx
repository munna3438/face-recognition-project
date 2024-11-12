
import { BakCapturesTable } from '@/components/user/BakCapturesTable';
import CapturesTable from '@/components/user/CapturesTable';
import AuthLayout from '@/Layouts/AuthLayout';
import { Capture, Institute, InstituteListResponse } from '@/types';
import { isEqual } from 'lodash';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useRef, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';

export default function Dashboard() {
    const [attendances, setAttendances] = useState<Capture[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    const prevAttendancesRef = useRef<Capture[]>([]);

    const [institutes, setInstitutes] = useState<Institute[]>([]);
    const [selectedInstitute, setSelectedInstitute] = useState<string | undefined>();

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
        const intervalId = setInterval(() => {
            fetch(`/api/attendances?token=${selectedInstitute}`)
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
    }, [selectedInstitute]);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Live Face Recognition</h2>
                <div>
                    <Select value={selectedInstitute} onValueChange={(e) => handleChange(e)}>
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
