import DatePicker from '@/components/user/DatePicker';
import AuthLayout from '@/Layouts/AuthLayout';
import { Attendances, Institute, InstituteListResponse, UserAttendanceLogResponse } from '@/types';
import { format } from "date-fns"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import AttendanceTable from '@/components/user/AttendanceTable';
import Swal from 'sweetalert2';

export default function AttendanceList() {
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date());

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
        setPending(true);
        setAttendances([]);

        const formattedDate = format(date, "yyyy-MM-dd");

        fetch(`/api/user-attendance?date=${formattedDate}&token=${selectedInstitute}`)
            .then(res => res.json())
            .then((data: UserAttendanceLogResponse) => {
                if(!data.error) {
                    setAttendances(data.data);
                }/*  else {
                    Swal.fire({
                        icon: "error",
                        title: data.message,
                    })
                } */
            })
            .finally(() => {
                setPending(false);
            });

        return () => {
        };
    }, [date, selectedInstitute]);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Attendance List</h2>
                <div className="flex gap-2 items-center">
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
                    <div>
                        <DatePicker date={date} setDate={setDate} />
                    </div>
                </div>
            </div>
            <div className="relative top-14">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin" />
                    </div>
                )}
            </div>
            <AttendanceTable attendances={attendances} />
            {/* <OldAttendanceTable attendances={attendances} /> */}
        </AuthLayout>
    );
}
