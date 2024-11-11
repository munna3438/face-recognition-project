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
import { FaceUser } from "@/types";
import ImageModal from "./ImageModal";
import { FaSpinner } from "react-icons/fa";

export function UsersTable({ users }: { users: FaceUser[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow className="text-nowrap text-lg capitalize font-bold">
                    <TableHead className="w-[100px] text-[#333]">
                        ID Number
                    </TableHead>
                    <TableHead className="w-20 text-[#333]">Image</TableHead>
                    <TableHead className="text-[#333]">Name</TableHead>
                    <TableHead className="w-20 text-[#333]">gender</TableHead>
                    <TableHead className="text-right text-[#333]">
                        status
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium text-[#555]">
                            <b>{user.UserID}</b>
                        </TableCell>
                        <TableCell>
                            <ImageModal image={user.userImage} />
                        </TableCell>
                        <TableCell className="text-[#555]">
                            <b>{user.userName}</b>
                        </TableCell>
                        <TableCell className="text-[#555]">
                            <b>{["Male", "Female"][user.userGender]}</b>
                        </TableCell>
                        <TableCell className="text-right text-[#555]">
                            {["Pending", "Saved"][user.status]}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
