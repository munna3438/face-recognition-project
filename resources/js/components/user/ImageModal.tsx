// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

export default function ImageModal({ image }: {image: string}) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    {/* <Button variant="outline">Register new Student</Button> */}
                    <img src={image} className="w-16 aspect-square cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0">
                    {/* <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader> */}
                    <img src={image} alt="" />
                    {/* <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </>
    )
}
