import CamProvider, { fileToBase64 } from "@/components/user/CamProvider";
import AuthLayout from "@/Layouts/AuthLayout";
import { useEffect, useState } from "react";

export default function image() {
    // const [faceImage, setFaceImage] = useState<File | null>(null);
    // const [faceImageUrl, setFaceImageUrl] = useState<string>("");
    // useEffect(() => {
    //     if (faceImage !== null) {
    //         (async () => {
    //             const img64 = (await fileToBase64(faceImage)) as string;
    //             setFaceImageUrl(img64);
    //         })();
    //     } else {
    //         setFaceImageUrl("");
    //     }
    // }, [faceImage]);
    return (
        <AuthLayout>
            <div className="bg-muted dark:bg-[#181A1C] p-10 w-full">
                <CamProvider />
            </div>
        </AuthLayout>
    );
}
