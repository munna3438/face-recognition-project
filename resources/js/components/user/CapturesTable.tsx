import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    // TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Capture } from "@/types"
import ImageModal from "./ImageModal"


export function CapturesTable({ captures } : { captures: Capture[]}) {
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID Number</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {captures.map((capture) => (
                    <TableRow key={capture.id + Math.random()}>
                        <TableCell className="font-medium">{capture.id === "N/A" ? (<i className="text-slate-300">N/A</i>) : <b>{capture.id}</b>}</TableCell>
                        {/* <TableCell><img src={"data:image/png;base64," + capture.url} className="w-16 aspect-square" /></TableCell> */}
                        <TableCell><ImageModal image={capture.url} /></TableCell>
                        <TableCell>{capture.name === "Stranger" ? (<i className="text-slate-300">Stranger</i>) : <b>{capture.name}</b>}</TableCell>
                        <TableCell className="text-right">{capture.time}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
