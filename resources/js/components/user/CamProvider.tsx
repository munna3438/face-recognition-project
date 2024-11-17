import { Button } from "@/components/ui/button";
import Webcam from "react-webcam";
import { TiTick } from "react-icons/ti";
import { IoTrashBin } from "react-icons/io5";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
import { GoPlus } from "react-icons/go";
import NavLink from "@/Components/NavLink";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";
import "./style.css";
import { router } from "@inertiajs/react";
import useStorage from "@/hooks/useStorage";

export default function CamProvider() {
    const camRef = useRef<null | any>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const faceImageStorage = useStorage<ImageStorageType>("faceImageStorage");

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
            if (newCaptures[index] === selectedImage) {
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

        if (!file) return;

        if (!file || !file.type.startsWith("image/")) {
            Swal.fire({
                icon: "error",
                title: "Please select a valid image file",
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
        if (typeof selectedImage === "string" && selectedImage.length > 0) {
            faceImageStorage.setData({ image: selectedImage });
        } else {
            faceImageStorage.setData({ image: null });
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
        <div>
            <div className="flex flex-col md:flex-row gap-10 w-full mb-10">
                <div className="w-1/2">
                    {/* <div className="w-full h-[420px] bg-[#303538] p-4 video_scan_container">
                        <div className="h-full w-full ">
                            <Webcam
                                ref={camRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "selfie" }}
                                className="h-full w-full"
                            />
                        </div>
                        <div className="video_canner">
                            <span className="scanner-span"></span>
                        </div>
                    </div> */}
                    <div className="w-full h-[420px] bg-transparent p-4 video_scan_container">
                        <span className="top-0 left-0 h-1 w-10 bg_primary absolute"></span>
                        <span className="top-0 right-0 h-1 w-10 bg_primary absolute"></span>
                        <span className="top-0 left-0 h-10 w-1 bg_primary absolute"></span>
                        <span className="top-0 right-0 h-10 w-1 bg_primary absolute"></span>
                        <span className="bottom-0 left-0 h-1 w-10 bg_primary absolute"></span>
                        <span className="bottom-0 right-0 h-1 w-10 bg_primary absolute"></span>
                        <span className="bottom-0 left-0 h-10 w-1 bg_primary absolute"></span>
                        <span className="bottom-0 right-0 h-10 w-1 bg_primary absolute"></span>
                        <div className="h-full w-full ">
                            <Webcam
                                ref={camRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{ facingMode: "selfie" }}
                                className="h-full w-full"
                            />
                        </div>
                        <div className="video_canner">
                            <span className="scanner-span"></span>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 grid grid-cols-2 gap-5 ">
                    <div
                        className={cn(
                            "border border-dashed border-[#262626] dark:border_secondary relative w-full h-[200px] group rounded-sm",
                            {
                                "outline outline-green-500 border-dashed  border-green-500":
                                    captures[0] === selectedImage &&
                                    selectedImage !== undefined,
                            }
                        )}
                    >
                        {captures[0] !== "" ? (
                            <img
                                className="w-full h-full rounded  object-cover"
                                src={captures[0]}
                            />
                        ) : (
                            <div className="h-full w-full flex justify-center items-center">
                                <GoPlus className="text-2xl text-[#262626] dark:text_secondary" />
                            </div>
                        )}
                        {captures[0] !== "" && (
                            <div
                                className="hidden group-hover:block h-full w-full absolute top-0 left-0 text-right"
                                onClick={() => setSelectedImage(captures[0])}
                            >
                                <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCapture(0)}
                                >
                                    <MdClose size={18} />
                                </Button>
                                {/* <Button
                                    className="p-[3px] h-auto rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setSelectedImage(captures[0])
                                    }
                                >
                                    <IoMdCheckmark size={18} />
                                </Button> */}
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            "border border-dashed border-[#262626] dark:border_secondary relative w-full h-[200px] group rounded-sm",
                            {
                                "outline border-green-500 outline-green-500":
                                    captures[1] === selectedImage &&
                                    selectedImage !== undefined,
                            }
                        )}
                    >
                        {captures[1] !== "" ? (
                            <img
                                className="w-full h-full rounded object-cover"
                                src={captures[1]}
                            />
                        ) : (
                            <div className="h-full w-full flex justify-center items-center">
                                <GoPlus className="text-2xl text-[#262626] dark:text_secondary" />
                            </div>
                        )}
                        {captures[1] !== "" && (
                            <div
                                className="hidden group-hover:block h-full w-full absolute top-0 left-0 text-right"
                                onClick={() => setSelectedImage(captures[1])}
                            >
                                <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCapture(1)}
                                >
                                    <MdClose size={18} />
                                </Button>
                                {/* <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setSelectedImage(captures[1])
                                    }
                                >
                                    <IoMdCheckmark size={18} />
                                </Button> */}
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            "border border-dashed border-[#262626] dark:border_secondary relative w-full h-[200px] group rounded-sm",
                            {
                                "outline outline-green-500 border-green-500":
                                    captures[2] === selectedImage &&
                                    selectedImage !== undefined,
                            }
                        )}
                    >
                        {captures[2] !== "" ? (
                            <img
                                className="w-full h-full rounded object-cover"
                                src={captures[2]}
                            />
                        ) : (
                            <div className="h-full w-full flex justify-center items-center">
                                <GoPlus className="text-2xl text-[#262626] dark:text_secondary" />
                            </div>
                        )}
                        {captures[2] !== "" && (
                            <div
                                className="hidden group-hover:block h-full w-full absolute top-0 left-0 text-right"
                                onClick={() => setSelectedImage(captures[2])}
                            >
                                <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCapture(2)}
                                >
                                    <MdClose size={18} />
                                </Button>
                                {/* <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setSelectedImage(captures[2])
                                    }
                                >
                                    <IoMdCheckmark size={18} />
                                </Button> */}
                            </div>
                        )}
                    </div>
                    <div
                        className={cn(
                            "border border-dashed border-[#262626] dark:border_secondary relative w-full h-[200px] group rounded-sm",
                            {
                                "outline outline-green-500 border-green-500":
                                    captures[3] === selectedImage &&
                                    selectedImage !== undefined,
                            }
                        )}
                    >
                        {captures[3] !== "" ? (
                            <img
                                className="w-full h-full rounded object-cover"
                                src={captures[3]}
                            />
                        ) : (
                            <div className="h-full w-full flex justify-center items-center">
                                <GoPlus className="text-2xl text-[#262626] dark:text_secondary" />
                            </div>
                        )}
                        {captures[3] !== "" && (
                            <div
                                className="hidden group-hover:block h-full w-full absolute top-0 left-0 text-right"
                                onClick={() => setSelectedImage(captures[3])}
                            >
                                <Button
                                    className="p-[3px] h-6 w-6 m-3 rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeCapture(3)}
                                >
                                    <MdClose size={18} />
                                </Button>
                                {/* <Button
                                    className="p-[3px] h-auto rounded-[3px] bg-accent"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setSelectedImage(captures[3])
                                    }
                                >
                                    <IoMdCheckmark size={18} />
                                </Button> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex gap-10">
                <div className="w-1/2 flex justify-center">
                    <Button
                        onClick={captureImage}
                        className="primary_button text-md bg-[#3996F6] hover:bg-transparent hover:text-[#3996F6] text-white h-[3rem] px-12"
                    >
                        Take Snap
                    </Button>
                </div>
                <div className="w-1/2 flex items-center justify-end gap-5">
                    <p>You can use your drive</p>
                    <Button
                        type="button"
                        className="primary_button bg-[#3996F6] hover:bg-transparent hover:text-[#3996F6] text-white px-12 text-md h-[3rem] w-[150px]"
                        onClick={uploadImageBtn}
                    >
                        Upload Image
                    </Button>
                    {/* if image selected then next button enable other wish next button will be desable */}
                    {/* <Button
                        type="button"
                        className="primary_button text-md text-white bg-[#3996F6] h-[3rem] px-12"

                    >
                        Next
                    </Button> */}
                    {selectedImage ? (
                        <NavLink
                            href={route("users.add")}
                            active={route().current("users.add")}
                            className="primary_button w-[150px] flex justify-center items-center"
                            disabled={!selectedImage}
                            // data={{ query: "faceImage" }}
                            preserveState
                        >
                            Next
                        </NavLink>
                    ) : (
                        <Button
                            type="button"
                            className="bg-[#25292A] text-white h-11 border border-[#25292A] w-[150px] flex justify-center items-center"
                            disabled
                        >
                            Next
                        </Button>
                    )}
                </div>
            </div>
            <input
                ref={fileRef}
                type="file"
                className="invisible hidden"
                onChange={selectFileHandler}
            />
            {/* <div>
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
            </div> */}
        </div>
    );
}

export type ImageStorageType = {
    image: string | null;
};

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

export function base64ToFile(
    base64Url: string,
    fileName: string = "image.png"
): File {
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
