"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

function Spinner() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
        </div>
    );
}

export default function RoutesLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);
    const [hasToken, setHasToken] = useState<boolean | null>(null);
    const [showUnauthorized, setShowUnauthorized] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            setHasToken(!!token);
            setChecking(false);
            if (!token && pathname !== "/Auth/login") {
                setShowUnauthorized(true);
                setTimeout(() => setShowUnauthorized(false), 1200);
                router.replace("/Auth/login");
            }
        }
    }, [router, pathname]);

    if (checking || showUnauthorized) return <Spinner />;
    if (!hasToken && pathname !== "/Auth/login") return <p className="text-center mt-10 text-lg text-red-500">No autorizado</p>;
    return <>{children}</>;
}
