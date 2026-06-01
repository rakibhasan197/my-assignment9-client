import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      
      <div className="container mx-auto grid gap-10 px-4 py-12 md:grid-cols-3">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-black text-white">
            Idea<span className="text-blue-500">Vault</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-400">
            A creative startup idea sharing platform where innovators
            can explore, discuss, and validate business ideas together.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Platform Links
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link
                href="/ideas"
                className="transition hover:text-blue-400"
              >
                Ideas
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                className="transition hover:text-blue-400"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/add-idea"
                className="transition hover:text-blue-400"
              >
                Add Idea
              </Link>
            </li>

            <li>
              <Link
                href="/my-ideas"
                className="transition hover:text-blue-400"
              >
                My Ideas
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="mb-4 text-lg font-semibold text-white">
            Contact Info
          </h3>

          <div className="space-y-3 text-sm text-slate-400">
            <p>Email: mdrakibalhasanmdrakibalhasan0@gmail.com</p>
            <p>Phone: +8801937134184</p>
            <p>Location: Dhaka, Bangladesh</p>
          </div>

          {/* Social Links */}
          <div className="mt-6 flex items-center gap-4">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="rounded-full border border-slate-700 p-3 transition hover:border-blue-500 hover:text-blue-400"
            >
              <FaFacebookF />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="rounded-full border border-slate-700 p-3 transition hover:border-blue-500 hover:text-blue-400"
            >
              <FaTwitter />
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="rounded-full border border-slate-700 p-3 transition hover:border-blue-500 hover:text-blue-400"
            >
              <FaLinkedinIn />
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="rounded-full border border-slate-700 p-3 transition hover:border-blue-500 hover:text-blue-400"
            >
              <FaGithub />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} IdeaVault. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;