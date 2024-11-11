import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Attendances } from "@/types";
import { format } from "date-fns";

export function AttendanceTable({
    attendances,
}: {
    attendances: Attendances[];
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="text-nowrap text-lg capitalize font-bold">
                    <TableHead className="w-[100px] text-[#333]">
                        ID Number
                    </TableHead>
                    <TableHead className="text-[#333]">Name</TableHead>
                    <TableHead className="text-[#333]">In Time</TableHead>
                    <TableHead className="text-[#333]">Exit Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {attendances.map((attendance) => (
                    <TableRow key={attendance.id}>
                        <TableCell className="font-medium">
                            <b>{attendance.user_id}</b>
                        </TableCell>
                        <TableCell>
                            <b>{attendance.name}</b>
                        </TableCell>
                        <TableCell>
                            <b>
                                {format(
                                    attendance.in_time,
                                    "yyyy-MM-dd h-m-s a"
                                )}
                            </b>
                        </TableCell>
                        <TableCell>
                            {attendance.exit_time ? (
                                format(
                                    attendance.exit_time,
                                    "yyyy-MM-dd h:m:s a"
                                )
                            ) : (
                                <i>N/A</i>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
