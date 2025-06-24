"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Home,
  Database,
  Settings,
  Calendar,
  FileText,
  Shuffle,
  Menu,
  LogOut,
  User,
  Bell,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Layers,
  Zap,
  Activity,
  Cog,
  GitBranch,
  Monitor,
  UserCog,
  LucideLink,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle,
} from "lucide-react"
import NextLink from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationItem {
  name: string
  href?: string
  icon: any
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/home", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  {
    name: "Data Operations",
    icon: Layers,
    children: [{ name: "Entity Data Mapping", href: "/mapping", icon: Shuffle }],
  },
  {
    name: "Data Transformation & Scheduling",
    icon: Zap,
    children: [
      { name: "Transformation", href: "/transformations", icon: GitBranch },
      { name: "Scheduling", href: "/scheduler", icon: Calendar },
    ],
  },
  {
    name: "Testing & Monitoring",
    icon: Activity,
    children: [
      {
        name: "Monitoring",
        icon: Monitor,
        children: [{ name: "Schedule Log", href: "/logs", icon: FileText }],
      },
    ],
  },
  {
    name: "Configuration Setup",
    icon: Cog,
    children: [
      { name: "User Configuration", href: "/users", icon: UserCog },
      { name: "Connection Configuration", href: "/configuration", icon: LucideLink },
    ],
  },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [myAccountOpen, setMyAccountOpen] = useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = useState(false)
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  // User data state
  const [userName, setUserName] = useState("John Doe")
  const [userEmail] = useState("john.doe@example.com")
  const [userRole] = useState("Admin")
  const [isEditingName, setIsEditingName] = useState(false)

  // Password change state
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)
  const [accountUpdateSuccess, setAccountUpdateSuccess] = useState(false)

  const router = useRouter()

  const toggleSection = (sectionName: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionName) ? prev.filter((name) => name !== sectionName) : [...prev, sectionName],
    )
  }

  const isExpanded = (sectionName: string) => expandedSections.includes(sectionName)

  const isActiveSection = (item: NavigationItem): boolean => {
    if (item.href && pathname === item.href) return true
    if (item.children) {
      return item.children.some((child) => isActiveSection(child))
    }
    return false
  }

  const renderNavigationItem = (item: NavigationItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.href ? pathname === item.href : isActiveSection(item)
    const expanded = isExpanded(item.name)

    if (hasChildren) {
      return (
        <Collapsible key={item.name} open={expanded} onOpenChange={() => toggleSection(item.name)}>
          <CollapsibleTrigger asChild>
            <button
              className={cn(
                "flex items-center justify-between w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
                level === 0 ? "ml-0" : level === 1 ? "ml-4" : "ml-8",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="h-5 w-5" />
                {item.name}
              </div>
              {expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 mt-1">
            {item.children?.map((child) => renderNavigationItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <NextLink
        key={item.name}
        href={item.href!}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
          level === 0 ? "ml-0" : level === 1 ? "ml-4" : "ml-8",
          isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <item.icon className="h-5 w-5" />
        {item.name}
      </NextLink>
    )
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userData")
    router.push("/login")
  }

  const handleSaveAccount = () => {
    setAccountUpdateSuccess(true)
    setIsEditingName(false)
    setTimeout(() => {
      setAccountUpdateSuccess(false)
      setMyAccountOpen(false)
    }, 2000)
  }

  const handleChangePassword = async () => {
    // Simulate password change
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setPasswordChangeSuccess(true)
    setOldPassword("")
    setNewPassword("")

    // Simulate sending email notification
    console.log(`Password change notification sent to ${userEmail}`)

    setTimeout(() => {
      setPasswordChangeSuccess(false)
      setChangePasswordOpen(false)
    }, 3000)
  }

  const handleRestrictedEdit = (field: string) => {
    alert(`Please contact the Administration to change ${field}.`)
  }

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={cn("flex flex-col h-full", mobile ? "w-full" : "w-64")}>
      <div className="flex items-center gap-2 px-6 py-4 border-b">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Database className="h-5 w-5 text-white" />
        </div>
        <span className="font-bold text-xl">ETL Tool</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">{navigation.map((item) => renderNavigationItem(item))}</nav>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-white">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-64">
                  <Sidebar mobile />
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0 h-auto w-auto rounded-full">
                    <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center border-0 overflow-hidden">
                      <span className="text-white font-bold text-sm leading-none">
                        {userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{userName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setMyAccountOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setChangePasswordOpen(true)}>
                    <KeyRound className="mr-2 h-4 w-4" />
                    <span>Change Password</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* My Account Dialog */}
      <Dialog open={myAccountOpen} onOpenChange={setMyAccountOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-500">My Account</DialogTitle>
            <DialogDescription>Manage your account information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <div className="flex gap-2">
                <Input
                  id="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  disabled={!isEditingName}
                  className="flex-1"
                />
                <Button variant="outline" size="sm" onClick={() => setIsEditingName(!isEditingName)}>
                  {isEditingName ? "Cancel" : "Edit"}
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="flex gap-2">
                <Input id="email" value={userEmail} disabled className="flex-1 bg-gray-50" />
                <Button variant="outline" size="sm" onClick={() => handleRestrictedEdit("Email")}>
                  Edit
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role
              </Label>
              <div className="flex gap-2">
                <Input id="role" value={userRole} disabled className="flex-1 bg-gray-50" />
                <Button variant="outline" size="sm" onClick={() => handleRestrictedEdit("Role")}>
                  Edit
                </Button>
              </div>
            </div>
          </div>

          {accountUpdateSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
              <CheckCircle className="h-4 w-4" />
              Account updated successfully!
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setMyAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAccount} disabled={!isEditingName}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-orange-500">Change Password</DialogTitle>
            <DialogDescription>Enter your current password and choose a new one</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="oldPassword" className="text-sm font-medium text-blue-900">
                Old Password
              </Label>
              <div className="relative">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  {showOldPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="newPassword" className="text-sm font-medium text-blue-900">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {passwordChangeSuccess && (
            <div className="flex items-center gap-2 text-green-600 text-sm mb-4">
              <CheckCircle className="h-4 w-4" />
              Password updated successfully! Email notification sent to {userEmail}
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setChangePasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword} disabled={!oldPassword || !newPassword}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
