import Header from "@/components/user/Header";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function AuthLayout({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <>
            <Header />
            <main className="h-[100dvh] hx-container p-5">{children}</main>
        </>
    );
}
