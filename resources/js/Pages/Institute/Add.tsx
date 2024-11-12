import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import AuthLayout from '@/Layouts/AuthLayout'
import { AddInstituteFormData, AddInstituteFormDataError, AddInstituteResponse } from '@/types';
import { router } from '@inertiajs/react';
import React, { useRef, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function Add() {
    const formRef = useRef<HTMLFormElement>(null);
    const [formDataErrors, setFormDataErrors] = useState<AddInstituteFormDataError>({
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
                        title: "Institute has been saved",
                    });
                    formRef.current?.reset();
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error saving institute",
                    });
                    console.log("error");
                }
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error saving institute",
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
            <div className="bg-gray-100 dark:bg-opacity-10 p-7 rounded-md">
                <form
                    ref={formRef}
                    onSubmit={handleFormSubmit}
                    className="flex flex-col gap-3"
                    encType="multipart/form-data"
                >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-6 ">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Institute Name</label>
                            <Input
                                type="text"
                                name="name"
                                value={formData.name}
                                id="name"
                                onChange={handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formDataErrors.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Institute Email</label>
                            <Input
                                type="text"
                                name="email"
                                value={formData.email}
                                id="email"
                                onChange={handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formDataErrors.email}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="cam_ip">Camera IP</label>
                            <Input
                                type="text"
                                name="cam_ip"
                                value={formData.cam_ip}
                                id="cam_ip"
                                onChange={handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formDataErrors.cam_ip}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="cam_port">Camera Port</label>
                            <Input
                                type="number"
                                name="cam_port"
                                value={formData.cam_port}
                                id="cam_port"
                                min={0}
                                onChange={handleChange}
                            />
                            <div className="text-sm text-red-500">
                                {formDataErrors.cam_port}
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="max_user">Max User</label>
                            <Input
                                type="number"
                                name="max_user"
                                value={formData.max_user}
                                id="max_user"
                                min={1}
                                onChange={handleChange}
                            />
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
                                    className='w-32'
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
    )
}
