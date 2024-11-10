
import { AttendanceTable } from '@/components/user/AttendanceTable';
import DatePicker from '@/components/user/DatePicker';
import AuthLayout from '@/Layouts/AuthLayout';
import { Attendances } from '@/types';
import { format } from "date-fns"


import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';

export default function AttendanceList() {
    const [attendances, setAttendances] = useState<Attendances[]>([]);
    const [pending, setPending] = useState<boolean>(true);
    const [date, setDate] = useState<Date>(new Date())

    useEffect(() => {
        setPending(true);
        setAttendances([]);

        const intervalId = setInterval(() => {
            const formattedDate = format(date, 'yyyy-MM-dd');

            fetch(`/api/user-attendance?date=${formattedDate}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setAttendances(data.data.reverse());
                })
                .finally(() => {
                    setPending(false);
                });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [date]);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold ml-4">Attendance List</h2>
                <DatePicker date={date} setDate={setDate} />
            </div>
            <div className="relative top-14">
                {pending && (
                    <div className="w-full h-14 absolute flex justify-center items-center">
                        <FaSpinner className="text-2xl animate-spin" />
                    </div>
                )}
            </div>
            <AttendanceTable attendances={attendances} />
        </AuthLayout>
    )
}
