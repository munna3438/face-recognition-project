
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ImageModal({ image }: {image: string}) {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <img src={image} className="w-16 aspect-square cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] p-0">
                    <img src={image} alt="" className="w-full" />
                </DialogContent>
            </Dialog>
        </>
    )
}
