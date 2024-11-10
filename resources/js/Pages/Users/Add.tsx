import { Input } from "@/components/ui/input";
import AuthLayout from "@/Layouts/AuthLayout";
import { router } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { AddUserFormData, AddUserFormDataError, AddUserResponse } from "@/types";
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

    const [uploadedfile, setUploadImage] = useState<string>();
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChange(e);
        if (e.target.files && e.target.files.length > 0) {
            setUploadImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setUploadImage(undefined);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | string) {
        if (typeof e === "string") {
            setFormData(values => ({
                ...values,
                gender: e,
            }))
            return;
        }
        const key = e.target.id;
        let value;
        if (key === 'image' && e.target.files !== null) {
            value = e.target.files[0]
        } else {
            value = e.target.value
        }
        setFormData(values => ({
            ...values,
            [key]: value,
        }))
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
        if (formData.institute === "") {
            errors.institute = "Please enter an institute name";
            isValid = false;
        } else {
            errors.institute = "";
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
        dataForm.append("institute", formData.institute);
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
                        title: "User has been saved",
                    })
                    formRef.current?.reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error saving user data",
                    })
                    console.log("error");
                }
            }).catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error saving user data",
                })
                console.log("error");
            }).then(() => {
                setFormLoading(false);
            });
    }

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold mb-4">Add User</h1>
            <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-3"
                encType="multipart/form-data"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user_name">Name</label>
                        <Input
                            type="text"
                            name="user_name"
                            id="user_name"
                            onChange={handleChange}
                        />
                        <div className="text-sm text-red-500">
                            {formDataErrors.user_name}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="institute">Institute Name</label>
                        <Input
                            type="text"
                            name="institute"
                            id="institute"
                            onChange={handleChange}
                        />
                        <div className="text-sm text-red-500">
                            {formDataErrors.institute}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="user_id">User ID</label>
                        <Input
                            type="text"
                            name="user_id"
                            id="user_id"
                            onChange={handleChange}
                        />
                        <div className="text-sm text-red-500">
                            {formDataErrors.user_id}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="gender">Gender</label>
                        <Select onValueChange={handleChange}>
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
                        <Input
                            type="file"
                            name="image"
                            id="image"
                            onChange={handleImageChange}
                        />
                        <div className="text-sm text-red-500">
                            {formDataErrors.image}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <div className="w-[100px] aspect-square border p-1 border-white">
                        {uploadedfile ? (
                            <img
                                className="h-full w-full"
                                src={uploadedfile}
                            />
                        ) : (
                            <img
                                src="/image/userPlaceholder.jpg"
                                className="h-full w-full"
                                alt=""
                            />
                        )}
                    </div>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0 justify-center md:justify-end items-center">
                    {formLoading && (
                        <FaSpinner className="text-lg animate-spin" />
                    )}
                    <button
                        disabled={formLoading}
                        type="submit"
                        className="relative py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:cursor-not-allowed disabled:bg-blue-300 disabled:hover:bg-blue-300"
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
            </form>

        </AuthLayout>
    );
}
