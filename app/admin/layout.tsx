"use client"
import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { getToken, clearToken } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingCart, Users, Tag, Menu, X, Moon, Sun } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    const token = getToken()
    const isLogin = pathname === "/admin/login"
    if (!token && !isLogin) router.replace("/admin/login")
    if (token && isLogin) router.replace("/admin/dashboard")
  }, [pathname, router])

  const toggleDarkMode = () => {
    setDarkMode((v) => !v)
    document.documentElement.classList.toggle("dark")
  }

  const NavLink = ({ href, label, Icon }: { href: string; label: string; Icon: any }) => {
    const active = pathname === href
    return (
      <Link
        href={href}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${active
          ? "bg-gradient-to-r from-cyan-500/20 to-orange-500/20 text-white border border-cyan-500/30 shadow-lg"
          : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
          }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </Link>
    )
  }

  const title = pathname?.split("/").pop() || "admin"

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-background to-slate-100 dark:from-slate-950 dark:via-background dark:to-slate-900 ${darkMode ? "dark" : ""}`}>
      {!isLoginPage && (
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 shadow-2xl`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">Admin</span>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white hover:bg-slate-700/50">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
              <NavLink href="/admin/dashboard" label="Dashboard" Icon={LayoutDashboard} />
              <NavLink href="/admin/products" label="Products" Icon={Package} />
              <NavLink href="/admin/categories" label="Categories" Icon={Tag} />
              <NavLink href="/admin/orders" label="Orders" Icon={ShoppingCart} />
              <NavLink href="/admin/customers" label="Customers" Icon={Users} />
            </nav>
          </div>
        </div>
      )}

      <div className={isLoginPage ? "" : "lg:ml-64"}>
        {!isLoginPage && (
          <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(true)} className="lg:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
                <h1 className="text-xl font-bold capitalize bg-gradient-to-r from-cyan-600 to-orange-600 bg-clip-text text-transparent">{title}</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="hover:bg-slate-100 dark:hover:bg-slate-800">
                  {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    clearToken()
                    router.replace("/admin/login")
                  }}
                  className="border-2 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-orange-50 dark:hover:from-cyan-950/20 dark:hover:to-orange-950/20"
                >
                  Logout
                </Button>
              </div>
            </div>
          </header>
        )}

        <main className="p-6">{children}</main>
      </div>

      {!isLoginPage && sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
