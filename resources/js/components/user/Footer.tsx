import React from "react";

export default function Footer() {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#25292A] py-2 z-10">
            <div className="hx-container flex flex-col md:flex-row justify-center gap-1 items-center text-white">
                <span>
                    &copy; <b>TouchFace</b> |
                </span>
                <small>
                    A product of{" "}
                    <a
                        href="https://touchandsolve.com"
                        className="inline-block mx-[2px] text-blue-500 font-bold"
                    >
                        Touch And Solve
                    </a>{" "}
                    2024
                </small>
            </div>
        </div>
    );
}
