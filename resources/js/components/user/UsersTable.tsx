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
import { FaceUser } from "@/types"
import ImageModal from "./ImageModal"
import { FaSpinner } from "react-icons/fa";

export function UsersTable({ users }: { users: FaceUser[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID Number</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-20">Gender</TableHead>
                    <TableHead className="text-right">status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium"><b>{user.UserID}</b></TableCell>
                        <TableCell><ImageModal image={user.userImage} /></TableCell>
                        <TableCell><b>{user.userName}</b></TableCell>
                        <TableCell><b>{['Male', 'Female'][user.userGender]}</b></TableCell>
                        <TableCell className="text-right">{['Pending', 'Saved'][user.status]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
