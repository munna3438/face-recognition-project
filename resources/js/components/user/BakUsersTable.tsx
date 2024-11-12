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

export function BakUsersTable({ users }: { users: FaceUser[] }) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID Number</TableHead>
                    <TableHead className="w-20">Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead className="w-20">Gender</TableHead>
                    <TableHead className="w-72">status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium"><b>{user.UserID}</b></TableCell>
                        <TableCell><ImageModal image={user.userImage} /></TableCell>
                        <TableCell><b>{user.userName}</b></TableCell>
                        <TableCell><b>{['Male', 'Female'][user.userGender]}</b></TableCell>
                        <TableCell className="w-72">{['Pending', 'Saved'][user.status]}{user.log !== '' && user.log !== null ? <span className="text-blue-400 text-sm"> ({user.log})</span> : ''}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
