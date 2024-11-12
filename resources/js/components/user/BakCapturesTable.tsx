import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Capture } from "@/types";
import ImageModal from "./ImageModal";
import { format } from "date-fns";

export function BakCapturesTable({ captures }: { captures: Capture[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="text-nowrap ">
                    <TableHead className="w-[100px] ">ID Number</TableHead>
                    <TableHead className="w-20 ">Image</TableHead>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="w-20 ">Gender</TableHead>
                    <TableHead className="text-right ">Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {captures.map((capture) => (
                    <TableRow key={capture.id}>
                        <TableCell className="font-medium">
                            {capture.user_id ? (
                                <b>{capture.user_id}</b>
                            ) : (
                                <i className="text-slate-300">N/A</i>
                            )}
                        </TableCell>
                        <TableCell>
                            <ImageModal image={capture.image} />
                        </TableCell>
                        <TableCell>
                            {capture.name ? (
                                <b>{capture.name}</b>
                            ) : (
                                <i className="text-slate-300">Stranger</i>
                            )}
                        </TableCell>
                        <TableCell>
                            {capture.sex !== null ? (
                                <b>{["Male", "Female"][capture.sex]}</b>
                            ) : (
                                <i className="text-slate-300">unknown</i>
                            )}
                        </TableCell>
                        <TableCell className="text-right">
                            {format(
                                capture.snap_timestamp,
                                "yyyy-MM-dd h:m:s a"
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
