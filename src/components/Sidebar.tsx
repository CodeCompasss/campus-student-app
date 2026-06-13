import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // Ensure Link is imported from Next.js
import { sidebarLinks } from "@/data/sidebarLinks"; // Ensure this file exports the correct structure

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
          aria-hidden="true"
        >
        </div>
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: open ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 h-full w-64 bg-[var(--main)] text-white shadow-lg z-50 p-6 flex flex-col space-y-4"
      >
        {/* Close Button */}
        <button
          className="self-end text-xl font-bold mb-6"
          onClick={onClose}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* Sidebar Links */}
        {sidebarLinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="px-3 py-2 rounded-md hover:bg-black transition-colors"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </motion.div>
    </>
  );
};

export default Sidebar;