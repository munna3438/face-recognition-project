import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/Layouts/AuthLayout";
import {
    AddInstituteFormData,
    AddInstituteFormDataError,
    AddInstituteResponse,
} from "@/types";
import { router } from "@inertiajs/react";
import React, { useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";
import { PiNetworkLight } from "react-icons/pi";
import { MdOutlineControlCamera } from "react-icons/md";
import { FiUser } from "react-icons/fi";

export default function Add() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formDataErrors, setFormDataErrors] =
        useState<AddInstituteFormDataError>({
            name: "",
            email: "",
            cam_ip: "",
            cam_port: "",
            max_user: "",
        });

    const [formData, setFormData] = useState<AddInstituteFormData>({
        name: "",
        email: "",
        cam_ip: "192.168.0.168",
        cam_port: "0",
        max_user: "5",
    });

    const [formLoading, setFormLoading] = useState<boolean>(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const key = e.target.id;
        let value = e.target.value;
        setFormData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    function validateForm() {
        let isValid = true;
        let errors: AddInstituteFormDataError = {
            name: "",
            email: "",
            cam_ip: "",
            cam_port: "",
            max_user: "",
        };
        if (formData.name === "") {
            errors.name = "Please enter a name";
            isValid = false;
        } else {
            errors.name = "";
        }
        if (formData.email === "") {
            errors.email = "Please enter an email";
            isValid = false;
        } else {
            errors.email = "";
        }
        if (formData.cam_ip === "") {
            errors.cam_ip = "Please enter an ip";
            isValid = false;
        } else {
            errors.cam_ip = "";
        }
        if (formData.cam_port === "") {
            errors.cam_port = "Please select a port";
            isValid = false;
        } else {
            errors.cam_port = "";
        }
        if (!formData.max_user) {
            errors.max_user = "Please specify max user count";
            isValid = false;
        } else {
            errors.max_user = "";
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
        dataForm.append("name", formData.name);
        dataForm.append("email", formData.email);
        dataForm.append("cam_ip", formData.cam_ip);
        dataForm.append("cam_port", formData.cam_port);
        dataForm.append("max_user", formData.max_user);

        fetch("/api/institute/create", {
            method: "POST",
            body: dataForm,
        })
            .then((response: Response) => response.json())
            .then((response: AddInstituteResponse) => {
                if (!response.error) {
                    router.visit("/institute");
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
            .catch((error: AddInstituteResponse) => {
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

    return (
        <AuthLayout>
            <h1 className="text-2xl font-bold mb-6">Add Institute</h1>
            <div className="bg-gray-100 dark:bg-opacity-[0.03] border p-3 md:p-7 rounded-md">
                <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-3"
                    encType="multipart/form-data"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-4 ">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name">Institute Name</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    id="name"
                                    onChange={handleChange}
                                    placeholder="Type your institute name"
                                    className="pl-10 h-11 dark:bg-[#25292A] bg-[#FAFAFA] border border-[#3996F6] rounded-sm"
                                />
                                <MdOutlineDriveFileRenameOutline className="absolute bottom-[11px] left-2 bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Institute Email</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    id="email"
                                    onChange={handleChange}
                                    className="pl-10 h-11 dark:bg-[#25292A] bg-[#FAFAFA] border border-[#3996F6] rounded-sm"
                                    placeholder="Type your institute email"
                                />
                                <TfiEmail className="absolute bottom-[11px] left-2 bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.email}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cam_ip">Camera IP</label>
                            <div className="relative">
                                <Input
                                    type="text"
                                    name="cam_ip"
                                    value={formData.cam_ip}
                                    id="cam_ip"
                                    onChange={handleChange}
                                    className="pl-10 h-11 dark:bg-[#25292A] bg-[#FAFAFA] border border-[#3996F6] rounded-sm"
                                    placeholder="Type your camera ip"
                                />
                                <PiNetworkLight className="absolute bottom-[11px] left-2 bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.cam_ip}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="cam_port">Camera Port</label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    name="cam_port"
                                    value={formData.cam_port}
                                    id="cam_port"
                                    min={0}
                                    onChange={handleChange}
                                    className="pl-10 h-11 dark:bg-[#25292A] bg-[#FAFAFA] border border-[#3996F6] rounded-sm"
                                    placeholder="Type your camera port"
                                />
                                <MdOutlineControlCamera className="absolute bottom-[11px] left-2 bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.cam_port}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="max_user">Max User</label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    name="max_user"
                                    value={formData.max_user}
                                    id="max_user"
                                    min={1}
                                    onChange={handleChange}
                                    className="pl-10 h-11 dark:bg-[#25292A] bg-[#FAFAFA] border border-[#3996F6] rounded-sm"
                                    placeholder="Type your max user"
                                />
                                <FiUser className="absolute bottom-[11px] left-2 bg-gray-100 dark:bg-transparent h-5 w-5 rounded-sm" />
                            </div>
                            <div className="text-sm text-red-500">
                                {formDataErrors.max_user}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end items-center mt-6">
                        <div>
                            <div className="flex gap-3 justify-end items-center">
                                {formLoading && (
                                    <FaSpinner className="text-lg animate-spin" />
                                )}
                                <Button
                                    disabled={formLoading}
                                    type="submit"
                                    className="w-32"
                                    // className="relative py-2 px-7 bg-blue-500 hover:bg-blue-600 text-white rounded disabled:cursor-not-allowed disabled:bg-blue-300 disabled:hover:bg-blue-300"
                                >
                                    Save
                                </Button>
                                {/* <button
                                    disabled={formLoading}
                                    type="reset"
                                    className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
                                >
                                    Cancel
                                </button> */}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
