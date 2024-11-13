import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import { TiTick } from "react-icons/ti";
import { IoTrashBin } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

export default function CamProvider({ setFaceImage }: { setFaceImage: any }) {
    const camRef = useRef<null | any>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [selectedImage, setSelectedImage] = useState<string>();
    const [tempCapture, setTempCapture] = useState<string>();
    const [captures, setCaptures] = useState<string[]>(["", "", "", ""]);

    const captureImage = useCallback(() => {
        if (camRef.current) {
            const captureSrc = camRef.current.getScreenshot();
            setTempCapture(captureSrc);
        }
    }, [camRef]);

    const removeCapture = (index: number) => {
        setCaptures((old: string[]) => {
            if (index < 0 || index >= old.length) {
                return old;
            }

            const newCaptures = [...old];
            if(newCaptures[index] === selectedImage) {
                setSelectedImage(undefined);
            }
            newCaptures[index] = "";

            return newCaptures;
        });
    };

    const uploadImageBtn = () => {
        fileRef.current?.click();
    };

    const selectFileHandler = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if(!file)
            return;

        if (!file || !file.type.startsWith("image/")) {
            Swal.fire({
                icon: "error",
                title: "Please select a valid image file"
            });
            return;
        }

        const imageUrl = await fileToBase64(file as File);
        if (typeof imageUrl == "string" && imageUrl !== "") {
            setCaptureIn(imageUrl, 0);
            setSelectedImage(imageUrl);
        }
    };

    const setCaptureIn = (capture: string, index: number) => {
        setCaptures((old: string[]) => {
            if (index < 0 || index >= 4) {
                console.warn(`Index ${index} is out of bounds`);
                return old;
            }

            const newCaptures = [...old];
            newCaptures[index] = capture;

            return newCaptures;
        });
    };

    useEffect(() => {
        if(typeof selectedImage === "string" && selectedImage.length > 0) {
            setFaceImage(base64ToFile(selectedImage))
        } else {
            setFaceImage(null);
        }
    }, [selectedImage]);

    useEffect(() => {
        setCaptures((old: string[]) => {
            if (!tempCapture) return old;

            if (old.length === 4 && !old.includes("")) {
                return old;
            }

            const emptyIndex = old.findIndex((item) => item === "");

            if (emptyIndex !== -1) {
                const newCaptures = [...old];
                newCaptures[emptyIndex] = tempCapture;
                return newCaptures;
            }

            if (old.length < 4) {
                return [...old, tempCapture];
            }

            return old;
        });
    }, [tempCapture]);
    return (
        <div className="flex flex-col justify-center items-start gap-2">
            <Webcam
                ref={camRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: "selfie" }}
            />
            <div className="flex justify-center items-center w-full gap-2">
                <div
                    className={cn(
                        "border  relative w-full h-20 group rounded",
                        {
                            "outline outline-green-500 border-green-500":
                                captures[0] === selectedImage && selectedImage !== undefined,
                        }
                    )}
                >
                    {captures[0] !== "" && (
                        <img
                            className="w-full h-full rounded"
                            src={captures[0]}
                        />
                    )}
                    {captures[0] !== "" && (
                        <div className="w-full h-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCapture(0)}
                            >
                                <IoTrashBin size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedImage(captures[0])}
                            >
                                <TiTick size={14} />
                            </Button>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        "border  relative w-full h-20 group rounded",
                        {
                            "outline outline-green-500 border-green-500":
                                captures[1] === selectedImage && selectedImage !== undefined,
                        }
                    )}
                >
                    {captures[1] !== "" && (
                        <img
                            className="w-full h-full rounded"
                            src={captures[1]}
                        />
                    )}
                    {captures[1] !== "" && (
                        <div className="w-full h-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCapture(1)}
                            >
                                <IoTrashBin size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedImage(captures[1])}
                            >
                                <TiTick size={14} />
                            </Button>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        "border  relative w-full h-20 group rounded",
                        {
                            "outline outline-green-500 border-green-500":
                                captures[2] === selectedImage && selectedImage !== undefined,
                        }
                    )}
                >
                    {captures[2] !== "" && (
                        <img
                            className="w-full h-full rounded"
                            src={captures[2]}
                        />
                    )}
                    {captures[2] !== "" && (
                        <div className="w-full h-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCapture(2)}
                            >
                                <IoTrashBin size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedImage(captures[2])}
                            >
                                <TiTick size={14} />
                            </Button>
                        </div>
                    )}
                </div>
                <div
                    className={cn(
                        "border  relative w-full h-20 group rounded",
                        {
                            "outline outline-green-500 border-green-500":
                                captures[3] === selectedImage && selectedImage !== undefined,
                        }
                    )}
                >
                    {captures[3] !== "" && (
                        <img
                            className="w-full h-full rounded"
                            src={captures[3]}
                        />
                    )}
                    {captures[3] !== "" && (
                        <div className="w-full h-full p-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCapture(3)}
                            >
                                <IoTrashBin size={14} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedImage(captures[3])}
                            >
                                <TiTick size={14} />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-2 w-full">
                <Button onClick={captureImage} className="w-full">
                    Capture
                </Button>
                <span>or</span>
                <Button className="w-full" onClick={uploadImageBtn}>
                    Upload Image
                </Button>
            </div>
            <input
                ref={fileRef}
                type="file"
                className="invisible"
                onChange={selectFileHandler}
            />
        </div>
    );
}

export function fileToBase64(file: File) {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject(new Error("No file selected"));
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            resolve(reader.result);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}

export function base64ToFile(base64Url: string, fileName: string = "image.png"): File {
    const [mimeInfo, base64Data] = base64Url.split(",");
    const mimeTypeMatch = mimeInfo.match(/:(.*?);/);

    if (!mimeTypeMatch) {
        throw new Error("Invalid base64 string format");
    }

    const mimeType = mimeTypeMatch[1];

    const byteString = atob(base64Data);
    const byteNumbers = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
        byteNumbers[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteNumbers], { type: mimeType });
    return new File([blob], fileName, { type: mimeType });
}
