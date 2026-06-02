"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
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

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleLogOut = async () => {
    await authClient.signOut();
    setOpen(false);
  };

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
                className="text-sm font-medium text-slate-300 hover:text-blue-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
                         <Avatar>
        <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user?.name.charAt(0)}</Avatar.Fallback>
      </Avatar>

              <Button color="danger" onClick={handleLogOut}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="primary">Login</Button>
              </Link>

              <Link href="/register">
                <Button className="bg-blue-600 text-white">
                  Register
                </Button>
              </Link>
            </>
          )}
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
                <Link onClick={() => setOpen(false)} href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}

            {user ? (
              <>
                <li className="flex items-center gap-3">
                  <Avatar>
        <Avatar.Image alt="John Doe" src={user?.image} />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>
                </li>

                <li>
                  <Button
                    color="danger"
                    className="w-full"
                    onClick={handleLogOut}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <Button className="w-full">Login</Button>
                  </Link>
                </li>

                <li>
                  <Link href="/register">
                    <Button className="w-full bg-blue-600 text-white">
                      Register
                    </Button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;