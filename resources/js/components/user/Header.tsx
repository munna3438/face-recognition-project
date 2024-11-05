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
                        href="/dashboard"
                        active={route().current('dashboard')}
                    >
                        Home
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
