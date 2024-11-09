
import { Button } from '@/components/ui/button';
import { CapturesTable } from '@/components/user/CapturesTable';
import AuthLayout from '@/Layouts/AuthLayout';
import { Capture } from '@/types';


import React, { useEffect, useState } from 'react'

export default function Dashboard() {
    const [attendances, setAttendances] = useState<Capture[]>([]);
    useEffect(() => {
        setInterval(() => {
            fetch('/api/attendances')
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setAttendances(data.reverse());
                });
        }, 1000);
    }, []);

    return (
        <AuthLayout>
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-bold ml-4">Live Attendance List</h2>
                {/* <Button size="sm" >Clear</Button> */}
            </div>
            <CapturesTable captures={attendances} />
        </AuthLayout>
    )
}
