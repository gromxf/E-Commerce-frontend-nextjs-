"use client"

import { usePathname } from "next/navigation"
import { Header } from "@/components/header"

export function HeaderGate() {
    const pathname = usePathname()
    if (pathname && pathname.startsWith("/admin")) return null
    return <Header />
}


