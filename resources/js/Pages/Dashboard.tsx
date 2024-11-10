
import { Button } from '@/components/ui/button';
import { CapturesTable } from '@/components/user/CapturesTable';
import AuthLayout from '@/Layouts/AuthLayout';
import { Capture } from '@/types';


import React, { useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';

export default function Dashboard() {
    const [attendances, setAttendances] = useState<Capture[]>([]);
    const [pending, setPending] = useState<boolean>(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetch('/api/attendances')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAttendances(data.reverse());
                }).finally(() => {
                    setPending(false);
                });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, []);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold ml-4">Live Face Recognition</h2>
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
    )
}
