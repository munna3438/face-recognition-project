import { Input } from "@/components/ui/input";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { MdOutlineContactPage } from "react-icons/md";
import { TbCapture } from "react-icons/tb";

import "./style.css";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AddUserFormData,
    AddUserFormDataError,
    AddUserResponse,
    Institute,
    InstituteListResponse,
} from "@/types";
import Swal from "sweetalert2";

export default function Dashboard() {
    const formRef = useRef<HTMLFormElement>(null);

    const [formLoading, setFormLoading] = useState<boolean>(false);

    const [formDataErrors, setFormDataErrors] = useState<AddUserFormDataError>({
        user_name: "",
        user_id: "",
        gender: "",
        image: "",
        institute: ""
    });

    const [formData, setFormData] = useState<AddUserFormData>({
        user_name: "",
        user_id: "",
        gender: "",
        image: new File([], ""),
        institute: ""
    });

    const [institutes, setInstitutes] = useState<Institute[]>([]);

    // const [uploadedfile, setUploadImage] = useState<string>();
    // function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    //     handleChange(e);
    //     if (e.target.files && e.target.files.length > 0) {
    //         setUploadImage(URL.createObjectURL(e.target.files[0]));
    //     } else {
    //         setUploadImage(undefined);
    //     }
    // }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | string, input?: string) {
        if (typeof e === "string") {
            if(input === 'institute') {
                setFormData((values) => ({
                    ...values,
                    // gender: e,
                    institute: e
                }));
            } else if(input === 'gender') {
                setFormData((values) => ({
                    ...values,
                    gender: e,
                    // institute: e
                }));
            }
            return;
        }
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setCapturedImage(reader.result as string);
            reader.readAsDataURL(file);
        }
        const key = e.target.id;
        let value;
        if (key === "image" && e.target.files !== null) {
            value = e.target.files[0];
        } else {
            value = e.target.value;
        }
        setFormData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function validateForm() {
        let isValid = true;
        let errors: AddUserFormDataError = {
            user_name: "",
            user_id: "",
            gender: "",
            image: "",
            institute: ""
        };
        if (formData.user_name === "") {
            errors.user_name = "Please enter a name";
            isValid = false;
        } else {
            errors.user_name = "";
        }
        if (formData.user_id === "") {
            errors.user_id = "Please enter a user id";
            isValid = false;
        } else {
            errors.user_id = "";
        }
        if (formData.gender === "") {
            errors.gender = "Please select a gender";
            isValid = false;
        } else {
            errors.gender = "";
        }
        if (!formData.image) {
            errors.image = "Please select an image";
            isValid = false;
        } else {
            errors.image = "";
        }
        setFormDataErrors(errors);
        return isValid;
    }

    function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setFormLoading(true);

        const dataForm = new FormData();
        dataForm.append("user_name", formData.user_name);
        dataForm.append("user_id", formData.user_id);
        dataForm.append("gender", formData.gender);
        dataForm.append("token", formData.institute);
        dataForm.append("image", formData.image);

        fetch("/api/add_user", {
            method: "POST",
            body: dataForm,
        })
            .then((response: Response) => response.json())
            .then((response: AddUserResponse) => {
                if (!response.error) {
                    router.visit("/users");
                    Swal.fire({
                        icon: "success",
                        title: response.message,
                    });
                    formRef.current?.reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error saving user data",
                    });
                    console.log("error");
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error saving user data",
                });
                console.log("error");
            })
            .then(() => {
                setFormLoading(false);
            });
    }

    //camera

    // const videoRef = useRef(null);
    // const canvasRef = useRef(null);
    // const [capturedImage, setCapturedImage] = useState(null);
    // const [isCameraOpen, setIsCameraOpen] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [capturedImage, setCapturedImage] = useState<string>("");
    const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);

    // Function to start the camera
    const startCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            if(videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
        } catch (error) {
            console.error("Camera access denied:", error);
            setIsCameraOpen(false);
        }
    };

    // Function to capture the image from the video feed
    // const capturePhoto = () => {
    //     const canvas = canvasRef.current;
    //     const context = canvas.getContext("2d");
    //     context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    //     const imageData = canvas.toDataURL("image/png");
    //     setCapturedImage(imageData);
    //     stopCamera();
    // };

    const capturePhoto = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context && videoRef.current) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL("image/png");
                setCapturedImage(imageData);
                stopCamera();
            }
        }
    };

    // Function to stop the camera after capturing
    // const stopCamera = () => {
    //     const stream = videoRef.current.srcObject;
    //     const tracks = stream.getTracks();
    //     tracks.forEach((track) => track.stop());
    //     videoRef.current.srcObject = null;
    //     setIsCameraOpen(false);
    // };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop());
            videoRef.current.srcObject = null;
            setIsCameraOpen(false);
        }
    };

    useEffect(() => {
        setFormLoading(true);
        fetch("/api/institute/list")
            .then((res) => res.json())
            .then((data: InstituteListResponse) => {
                setInstitutes(data.data);
            })
            .finally(() => {
                setFormLoading(false);
            });
    }, [])

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold mb-6">Add User</h1>
            <div className="bg-gray-100 dark:bg-opacity-[0.03] border p-3 md:p-7 rounded-md">
                <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-3"
                    encType="multipart/form-data"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 ">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="user_name">Name</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    onChange={handleChange}
                                    className="pl-10 "
                                />
                                <CiUser className="absolute bottom-[10px] left-2  bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.user_name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="institute">Institute</label>
                            {/* <Input
                                type="text"
                                name="institute"
                                id="institute"
                                onChange={handleChange}
                            /> */}
                            <Select onValueChange={(e) => handleChange(e, 'institute')}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select an institute" />
                                </SelectTrigger>
                                <SelectContent>
                                    {institutes.map((institute) => {
                                        return (
                                            <SelectItem key={institute.id} value={institute.token}>
                                                {institute.name}
                                            </SelectItem>
                                        );
                                    })}
                                    {/* <SelectItem value="0">Male</SelectItem>
                                    <SelectItem value="1">Female</SelectItem> */}
                                </SelectContent>
                            </Select>
                            <div className="text-sm text-red-500">
                                {formDataErrors.institute}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="user_id">User ID</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="user_id"
                                    id="user_id"
                                    onChange={handleChange}
                                    className="pl-10"
                                />
                                <MdOutlineContactPage className="absolute bottom-[10px] left-2  bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>

                            <div className="text-sm text-red-500">
                                {formDataErrors.user_id}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="gender">Gender</label>
                            <Select onValueChange={(e) => handleChange(e, 'gender')}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Male</SelectItem>
                                    <SelectItem value="1">Female</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="text-sm text-red-500">
                                {formDataErrors.gender}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="image">Image</label>
                            <div className="w-full bg-white dark:bg-transparent rounded-sm h-10 flex justify-between items-center gap-2 md:gap-4 p-2">
                                {/* Button to open the camera */}
                                <button
                                    type="button"
                                    onClick={startCamera}
                                    className="bg-gray-100 hover:bg-gray-200 dark:text-[#333] py-[3px] px-2 md:px-3 rounded-sm w-1/2"
                                    disabled={isCameraOpen}
                                >
                                    Take Image
                                </button>

                                {/* Button to browse for an image file */}
                                <button
                                    type="button"
                                    onClick={(e) =>
                                        document.getElementById("image")?.click()
                                    }
                                    className="bg-gray-100 hover:bg-gray-200 dark:text-[#333] py-[3px] px-2 md:px-3 rounded-sm w-1/2"
                                >
                                    Browse
                                </button>
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.image}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:flex-row justify-between items-center mt-6">
                        <div>
                            <div className="h-[100px] aspect-square border rounded-sm border-gray-300 relative bg-white">
                                {capturedImage ? (
                                    <img
                                        src={capturedImage}
                                        alt="Selected"
                                        className="h-full w-full rounded-sm"
                                    />
                                ) : (
                                    <img
                                        src="/image/userPlaceholder.jpg"
                                        alt="Placeholder"
                                        className="h-full w-full rounded-sm"
                                    />
                                )}

                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <div>
                                {/* Video element to display the camera feed */}
                                {isCameraOpen && (
                                    <div className="flex gap-3 items-center">
                                        <button
                                            onClick={capturePhoto}
                                            className="bg-white text-[#333] h-[50px] w-[50px] rounded-md flex justify-center items-center "
                                        >
                                            <TbCapture
                                                onClick={capturePhoto}
                                                className="h-[25px] w-auto"
                                            />
                                        </button>
                                        <video
                                            className="h-[100px] aspect-video"
                                            ref={videoRef}
                                            autoPlay
                                        ></video>
                                    </div>
                                )}

                                {/* Canvas element for capturing the photo */}
                                <canvas
                                    ref={canvasRef}
                                    width="320"
                                    height="240"
                                    style={{ display: "none" }}
                                ></canvas>
                            </div>
                        </div>
                        <div>
                            <div className="flex gap-3 justify-end items-center">
                                {formLoading && (
                                    <FaSpinner className="text-lg animate-spin" />
                                )}
                                <button
                                    disabled={formLoading}
                                    type="submit"
                                    className="relative py-2 px-7 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:cursor-not-allowed disabled:bg-blue-300 disabled:hover:bg-blue-300"
                                >
                                    Save
                                </button>
                                <button
                                    disabled={formLoading}
                                    type="reset"
                                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
