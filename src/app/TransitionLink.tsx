"use client";
import Link from "next/link";
import { useTransitionRouter } from "next-view-transitions";
import { useParams, usePathname } from "next/navigation";
import { useStore } from "./useStore";

export default function TransitionLink({ href, children, data, scrollTarget, className }: {
    href: string;
    children: React.ReactNode;
    data?: any
    scrollTarget: string | null
    className?: string;
}) {
    const Router = useTransitionRouter();
    const { navOpen, setNavOpen, setScrollTarget } = useStore();
    const pathname = usePathname();
    const { locale } = useParams();

    return (
        <Link data-gsap={data} href={href} onClick={(e) => {
            e.preventDefault();
            if (pathname === `/${locale}${href}`) return;
            if (scrollTarget) setScrollTarget(scrollTarget);

            setTimeout(() => {
                Router.push(`/${locale}${href}`);
            }, navOpen ? 10 : 20);

            setTimeout(() => {
                setNavOpen(false)
            }, 30);

        }} className={className}>
            {children}
        </Link>
    );
}
