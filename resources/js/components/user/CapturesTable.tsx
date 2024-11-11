import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Capture } from "@/types";
import ImageModal from "./ImageModal";

export function CapturesTable({ captures }: { captures: Capture[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="text-nowrap text-lg capitalize font-bold">
                    <TableHead className="w-[100px] text-[#333]">
                        ID Number
                    </TableHead>
                    <TableHead className="w-20 text-[#333]">Image</TableHead>
                    <TableHead className="text-[#333]">Name</TableHead>
                    <TableHead className="w-20 text-[#333]">Gender</TableHead>
                    <TableHead className="text-right text-[#333]">
                        Time
                    </TableHead>
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
                            {capture.snap_timestamp}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
