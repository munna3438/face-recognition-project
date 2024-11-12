import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CamProvider, { fileToBase64 } from "@/components/user/CamProvider";
import AuthLayout from "@/Layouts/AuthLayout";
import { useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";

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
import { MdOutlineContactPage } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { router } from "@inertiajs/react";

export default function Add() {
    const [faceImage, setFaceImage] = useState<File | null>(null);
    const [faceImageUrl, setFaceImageUrl] = useState<string>("");
    const formRef = useRef<HTMLFormElement>(null);

    const [formLoading, setFormLoading] = useState<boolean>(false);

    const [formDataErrors, setFormDataErrors] = useState<AddUserFormDataError>({
        user_name: "",
        user_id: "",
        gender: "",
        image: "",
        institute: "",
    });

    const [formData, setFormData] = useState<AddUserFormData>({
        user_name: "",
        user_id: "",
        gender: "",
        image: new File([], ""),
        institute: "",
    });

    const [institutes, setInstitutes] = useState<Institute[]>([]);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement> | string,
        input?: string
    ) {
        if (typeof e === "string") {
            if (input === "institute") {
                setFormData((values) => ({
                    ...values,
                    // gender: e,
                    institute: e,
                }));
            } else if (input === "gender") {
                setFormData((values) => ({
                    ...values,
                    gender: e,
                    // institute: e
                }));
            }
            return;
        }

        const key = e.target.id;
        const value = e.target.value;
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
            institute: "",
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
            Swal.fire({
                icon: "error",
                title: "Please select an image.",
            });
            isValid = false;
        } else if(formData.image.size > 52000) {
            Swal.fire({
                icon: "error",
                title: "Image size must be less than 52KB",
            });
            isValid = false;
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
        if(formData.image !== null) {
            dataForm.append("image", formData.image);
        }

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
                        title: response.message,
                    });
                    console.log("error");
                }
            })
            .catch((error: AddUserResponse) => {
                Swal.fire({
                    icon: "error",
                    title: error.message,
                });
                console.log("error");
            })
            .then(() => {
                setFormLoading(false);
            });
    }

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
    }, []);

    useEffect(() => {
        if(faceImage !== null) {
            (async () => {
                const img64 = await fileToBase64(faceImage) as string;
                setFaceImageUrl(img64);
            })();
        } else {
            setFaceImageUrl("");
        }
        setFormData((values) => ({
            ...values,
            'image': faceImage,
        }));
    }, [faceImage]);

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold mb-6">Add User</h1>
            <div className="bg-gray-100 dark:bg-opacity-[0.03] border p-3 md:p-7 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <CamProvider setFaceImage={setFaceImage} />
                    </div>
                    <div className="">
                        {/* Form */}
                        <form
                            ref={formRef}
                            onSubmit={handleFormSubmit}
                            className="flex flex-col gap-3"
                            encType="multipart/form-data"
                        >
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
                                <Select
                                    name="institute"
                                    onValueChange={(e) =>
                                        handleChange(e, "institute")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select an institute" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {institutes.map((institute) => {
                                            return (
                                                <SelectItem
                                                    key={institute.id}
                                                    value={institute.token}
                                                >
                                                    {institute.name}
                                                </SelectItem>
                                            );
                                        })}
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
                                <Select
                                    onValueChange={(e) =>
                                        handleChange(e, "gender")
                                    }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="0">Male</SelectItem>
                                        <SelectItem value="1">
                                            Female
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <div className="text-sm text-red-500">
                                    {formDataErrors.gender}
                                </div>
                            </div>
                            <div className="w-full flex justify-center items-center">
                                {faceImageUrl !== "" && <img src={faceImageUrl} className="h-52" />}
                            </div>
                            <div className="flex justify-center items-center">
                                {formLoading && (
                                    <FaSpinner className="text-lg animate-spin" />
                                )}
                                <Button className="w-36" disabled={formLoading}>Submit</Button>
                            </div>
                        </form>
                        {/* Form */}
                    </div>
                </div>
            </div>
        </AuthLayout>
    );
}
