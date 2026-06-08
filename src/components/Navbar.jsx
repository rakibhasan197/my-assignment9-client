"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX, FiMoreVertical, FiSun, FiMoon } from "react-icons/fi";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/ideas", label: "Ideas" },
  { href: "/add-idea", label: "Add Idea" },
  { href: "/my-ideas", label: "My Ideas" },
  { href: "/my-interactions", label: "My Interactions" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

 
  const [theme, setTheme] = useState("light");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLogOut = async () => {
    await authClient.signOut();
    setMenuOpen(false);
    setMobileOpen(false);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const image = form.image.value;

    await authClient.updateUser({
      name,
      image,
    });

    setModalOpen(false);
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

       
          <button
            onClick={toggleTheme}
            className="text-xl text-white"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>

          {user ? (
            <div className="relative flex items-center gap-2">

              <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" src={user?.image} />
                <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
              </Avatar>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-xl text-white"
              >
                <FiMoreVertical />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-lg border border-slate-700 bg-slate-900 shadow-xl">

                  <div className="border-b border-slate-700 p-3">
                    <p className="text-sm font-medium text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400 break-all">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setMenuOpen(false);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-slate-300 hover:bg-slate-800"
                  >
                    Edit Profile
                  </button>

                  <button
                    onClick={handleLogOut}
                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-slate-800"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <>
              <Link href="/login">
                <Button>Login</Button>
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
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-2xl text-white md:hidden"
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

   
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950">
          <div className="flex flex-col gap-2 px-4 py-5">

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-white hover:bg-slate-800 hover:text-blue-400"
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              className="w-full rounded bg-slate-800 px-3 py-3 text-sm text-white hover:bg-slate-700"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

          </div>
        </div>
      )}

    
      {modalOpen && (
        <div className="fixed inset-0 z-50 mt-30 flex items-center justify-center bg-black/60 p-4">

          <div className="w-full max-w-lg rounded-lg bg-slate-900 p-6 max-h-[90vh] overflow-y-auto">

            <h2 className="mb-4 text-xl font-bold text-white">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">

              <input
                name="name"
                defaultValue={user?.name}
                className="w-full rounded bg-slate-800 p-2 text-white"
                placeholder="Name"
              />

              <input
                name="image"
                defaultValue={user?.image}
                className="w-full rounded bg-slate-800 p-2 text-white"
                placeholder="Image URL"
              />

              <p className="text-xs text-slate-400 break-all">
                {user?.email}
              </p>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </header>
  );
};

export default Navbar;