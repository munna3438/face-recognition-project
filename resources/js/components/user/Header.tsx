import NavLink from "@/Components/NavLink";
import { useEffect, useRef, useState } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    return (
        <div className="hx-container p-2 md:p-4 flex justify-between md:justify-start items-center gap-8 border-b">
            <h3 className="text-lg font-bold py-1 px-3 rounded hover:bg-gray-900 cursor-default select-none">
                GOFACE
            </h3>
            <ul className="hidden md:flex gap-3">
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
                {/* <li>
                    <NavLink
                        href="/rest"
                        active={route().current('rest')}
                    >
                        Face Detections
                    </NavLink>
                </li> */}
            </ul>
            {/* mobile menu */}
            <div className="relative block md:hidden" ref={menuRef}>
                <button
                    className="flex items-center justify-end flex-col gap-1"
                    onClick={toggleMenu}
                >
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-500 rotate ${
                            isOpen ? "w-3" : ""
                        }`}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-500 `}
                    ></span>
                    <span
                        className={`block w-6 h-0.5 bg-black transition-transform duration-500 ${
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
                            <a
                                href="#home"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#about"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#services"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            >
                                Services
                            </a>
                        </li>
                        <li>
                            <a
                                href="#contact"
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
