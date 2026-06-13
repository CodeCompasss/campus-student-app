"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { bottomTabs } from "@/data/nav";

const BottomNavBar = () => {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  return (
    <nav
      className="
        fixed
        left-3 right-3 sm:left-6 sm:right-6
        bottom-4 sm:bottom-6
        pb-[env(safe-area-inset-bottom)]
        bg-[var(--main)]
        border border-gray-300
        rounded-2xl
        max-w-[800px]
        mx-auto
        z-50
      "
    >
      <ul className="flex items-center justify-around py-1 sm:py-2">
        {bottomTabs.map(({ name, icon: Icon, href, label }) => {
          const isActive =
            pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={name} className="flex flex-col items-center">
              <Link
                href={href}
                onMouseEnter={() => setHoveredTab(name)}
                onMouseLeave={() => setHoveredTab(null)}
                className="focus:outline-none"
              >
                <div
                  className={`
                    flex items-center gap-1 sm:gap-2
                    px-2 sm:px-3
                    py-1
                    rounded-xl
                    font-semibold
                    transition-all duration-300
                    ${
                      isActive
                        ? "bg-black text-blue-400"
                        : "hover:bg-black hover:text-blue-400"
                    }
                  `}
                >
                  <Icon
                    size={24}
                    className="sm:size-7"
                    color={
                      isActive || hoveredTab === name
                        ? "var(--main)"
                        : "var(--text)"
                    }
                  />

                  <span className="hidden xs:inline sm:inline">
                    {isActive && label}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomNavBar;
