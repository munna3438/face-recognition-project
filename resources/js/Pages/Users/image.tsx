import CamProvider, { fileToBase64 } from "@/components/user/CamProvider";
import AuthLayout from "@/Layouts/AuthLayout";
import { useEffect, useState } from "react";

export default function image() {
    const [faceImage, setFaceImage] = useState<File | null>(null);
    const [faceImageUrl, setFaceImageUrl] = useState<string>("");
    useEffect(() => {
        if (faceImage !== null) {
            (async () => {
                const img64 = (await fileToBase64(faceImage)) as string;
                setFaceImageUrl(img64);
            })();
        } else {
            setFaceImageUrl("");
        }
    }, [faceImage]);
    return (
        <AuthLayout>
            {/* <div>
                <CamProvider setFaceImage={setFaceImage} />
            </div>
            <div className="w-full flex justify-center items-center">
                {faceImageUrl !== "" && (
                    <img src={faceImageUrl} className="h-52" />
                )}
            </div> */}
            <div className="bg-muted dark:bg-[#181A1C] p-10 w-full">
                <CamProvider setFaceImage={setFaceImage} />
                {/* <div className="w-3/6">
                    <div className="w-full h-auto bg-[#303538] p-4">
                        <CamProvider setFaceImage={setFaceImage} />
                    </div>
                </div> */}
                {/* <div className="w-3/6 grid grid-cols-2 gap-2">
                    <div className="w-full aspect-square border  border-white ">
                        img
                    </div>
                    <div className="w-full aspect-square border border-dashed">
                        img
                    </div>
                    <div className="w-full aspect-square border border-dashed">
                        img
                    </div>
                    <div className="w-full aspect-square border border-dashed">
                        img
                    </div>
                </div> */}
            </div>
        </AuthLayout>
    );
}
