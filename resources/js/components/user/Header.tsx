import NavLink from "@/Components/NavLink";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="hx-container p-2 md:p-4 flex justify-between items-center gap-8 border-b">
            <h3 className="text-lg font-bold py-1 px-3 rounded hover:bg-gray-900 cursor-default hover:text-white transition-all duration-300 select-none">
                GOFACE
            </h3>
            <div className="block md:hidden">
                <ThemeToggle />
            </div>
            <ul className="hidden md:flex gap-3 md:items-center">
                <li>
                    <NavLink
                        href={route("dashboard")}
                        active={route().current("dashboard")}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route("users.list-attendances")}
                        active={route().current("users.list-attendances")}
                    >
                        Attendances
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route("users.index")}
                        active={route().current("users.index")}
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route("users.add")}
                        active={route().current("users.add")}
                    >
                        Add User
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route("institute.index")}
                        active={route().current("institute.index")}
                    >
                        Institute
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route("institute.add")}
                        active={route().current("institute.add")}
                    >
                        Add Institute
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink
                        href="/rest"
                        active={route().current('rest')}
                    >
                        Face Detections
                    </NavLink>
                </li> */}
                <li>
                    <ThemeToggle />
                </li>
            </ul>
            {/* mobile menu */}
            <div className="relative block md:hidden" ref={menuRef}>
                <button
                    className="flex items-center justify-end flex-col gap-1"
                    onClick={toggleMenu}
                >
                    <span
                        className={`block w-6 h-0.5 bg-black dark:bg-white transition-transform duration-500 rotate ${
                            isOpen ? "w-3" : ""
                        }`}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black dark:bg-white transition-transform duration-500 `}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black dark:bg-white transition-transform duration-500 ${
                            isOpen ? "w-3" : ""
                        }`}
                    ></span>
                </button>

                <nav
                    className={`absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50 ${
                        isOpen ? "block" : "hidden"
                    }`}
                >
                    <ul className="flex flex-col p-2 space-y-2">
                        <li>
                            <NavLink
                                href={route("dashboard")}
                                active={route().current("dashboard")}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded hover:no-underline"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("users.list-attendances")}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded hover:no-underline"
                                active={route().current(
                                    "users.list-attendances"
                                )}
                            >
                                Attendances
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("users.index")}
                                active={route().current("users.index")}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded hover:no-underline"
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                href={route("users.add")}
                                active={route().current("users.add")}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded hover:no-underline"
                            >
                                Add User
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
