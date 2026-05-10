"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Macaco", icon: "🐒" },
  { href: "/roleta", label: "Roleta", icon: "🎯" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-30 w-full border-b border-jungle-700/40 bg-jungle-950/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-2">
          <span className="text-2xl transition-transform group-hover:rotate-12">🐒</span>
          <span className="text-sm font-extrabold uppercase tracking-[0.2em] text-banana-400">
            Pergunte ao Macaco
          </span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold uppercase tracking-widest transition sm:px-4 sm:text-sm " +
                    (active
                      ? "bg-banana-500 text-jungle-950 shadow-[0_8px_20px_-8px_rgba(245,211,90,0.6)]"
                      : "text-jungle-700 hover:bg-jungle-800/60 hover:text-banana-400")
                  }
                >
                  <span aria-hidden>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
