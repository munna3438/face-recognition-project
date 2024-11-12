import NavLink from "@/Components/NavLink";
import { ThemeToggle } from "../theme-toggle";

export default function Header() {
    return (
        <div className="hx-container p-4 px-5 flex justify-start items-center gap-8 border-b">
            <h3 className="text-lg font-bold py-1 px-3 rounded hover:bg-gray-900 cursor-default select-none">
                TouchFace
            </h3>
            <ul className="flex items-center gap-3">
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
        </div>
    );
}
