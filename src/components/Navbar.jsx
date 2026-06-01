"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        
      
        <Link href="/">
          <h2 className="text-2xl font-black text-white">
            Idea<span className="text-blue-500">Vault</span>
          </h2>
        </Link>

       
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-blue-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

      
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login">
            <Button
              variant="bordered"
              className="border-slate-700 text-white"
            >
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              Register
            </Button>
          </Link>
        </div>

     
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-white md:hidden"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-800 bg-slate-950 md:hidden">
          
          <ul className="container mx-auto flex flex-col gap-5 px-4 py-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm font-medium text-slate-300 transition hover:text-blue-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <div className="flex flex-col gap-3 pt-2">
              <Link href="/login">
                <Button
                  variant="bordered"
                  className="w-full border-slate-700 text-white"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Button>
              </Link>
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;