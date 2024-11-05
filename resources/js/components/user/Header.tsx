import NavLink from '@/Components/NavLink';

export default function Header() {
    return (
        <div className="hx-container p-4 flex justify-start items-center gap-8">
            <h3 className="text-lg font-bold py-1 px-3 rounded hover:bg-gray-900 cursor-default select-none">
                GOFACE
            </h3>
            <ul className="flex gap-3">
                <li>
                    <NavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route('users.index')}
                        active={route().current('users.index')}
                    >
                        Users
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        href={route('users.add')}
                        active={route().current('users.add')}
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
        </div>
    );
}
