"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Shield, User, CheckCircle, Search, Users, UserCheck, UserX } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Switch } from "@/components/ui/switch"

interface UserData {
  id: number
  salutation: string
  name: string
  email: string
  role: string
  status: string
  lastLogin: string
  avatar: string
  isSystemAdmin: boolean
}

export default function UserSettings() {
  const [users, setUsers] = useState<UserData[]>([
    {
      id: 1,
      salutation: "Mr.",
      name: "John Doe",
      email: "john.doe@company.com",
      role: "Admin",
      status: "active",
      lastLogin: "Jan 23, 10:30",
      avatar: "/placeholder.svg?height=32&width=32",
      isSystemAdmin: true,
    },
    {
      id: 2,
      salutation: "Ms.",
      name: "Jane Smith",
      email: "jane.smith@company.com",
      role: "Developer",
      status: "active",
      lastLogin: "Jan 23, 09:15",
      avatar: "/placeholder.svg?height=32&width=32",
      isSystemAdmin: false,
    },
    {
      id: 3,
      salutation: "Mr.",
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      role: "Analyst",
      status: "inactive",
      lastLogin: "Jan 20, 14:22",
      avatar: "/placeholder.svg?height=32&width=32",
      isSystemAdmin: false,
    },
    {
      id: 4,
      salutation: "Ms.",
      name: "Alice Brown",
      email: "alice.brown@company.com",
      role: "Developer",
      status: "active",
      lastLogin: "Jan 23, 11:45",
      avatar: "/placeholder.svg?height=32&width=32",
      isSystemAdmin: false,
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  // Form states
  const [formData, setFormData] = useState({
    salutation: "",
    name: "",
    email: "",
    role: "",
    isSystemAdmin: false,
    isActive: true,
  })

  // Filter states
  const [nameFilter, setNameFilter] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Admin":
        return <Shield className="h-4 w-4 text-purple-600" />
      case "Developer":
        return <User className="h-4 w-4 text-blue-600" />
      case "Analyst":
        return <User className="h-4 w-4 text-emerald-600" />
      default:
        return <User className="h-4 w-4 text-slate-600" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{role}</Badge>
      case "Developer":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{role}</Badge>
      case "Analyst":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">{role}</Badge>
      default:
        return <Badge variant="secondary">{role}</Badge>
    }
  }

  const handleSaveUser = async () => {
    const isUpdate = editingUser !== null

    // Simulate saving user
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (isUpdate) {
      setSuccessMessage("User data updated successfully")
    } else {
      setSuccessMessage(
        "User data created successfully and Email has been sent to the user with the link to create password",
      )
      // Simulate sending email only for new users
      console.log("Password creation email sent to user")
    }

    setShowSuccessMessage(true)
    setIsDialogOpen(false)
    setEditingUser(null)
    resetForm()

    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false)
    }, 5000)
  }

  const handleEditUser = (user: UserData) => {
    setEditingUser(user)
    setFormData({
      salutation: user.salutation,
      name: user.name,
      email: user.email,
      role: user.role,
      isSystemAdmin: user.isSystemAdmin,
      isActive: user.status === "active",
    })
    setIsDialogOpen(true)
  }

  const handleAddUser = () => {
    setEditingUser(null)
    resetForm()
    setIsDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      salutation: "",
      name: "",
      email: "",
      role: "",
      isSystemAdmin: false,
      isActive: true,
    })
  }

  // Filter users based on search criteria
  const filteredUsers = users.filter((user) => {
    const matchesName = nameFilter === "" || user.name.toLowerCase().includes(nameFilter.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesName && matchesRole && matchesStatus
  })

  // Count active and inactive users
  const activeUserCount = users.filter((user) => user.status === "active").length
  const inactiveUserCount = users.filter((user) => user.status === "inactive").length

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Manage your team members, roles, and permissions with ease
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 border-0 text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">Active Users</p>
                    <p className="text-3xl font-bold">{activeUserCount}</p>
                  </div>
                  <UserCheck className="h-8 w-8 text-emerald-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0 text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Inactive Users</p>
                    <p className="text-3xl font-bold">{inactiveUserCount}</p>
                  </div>
                  <UserX className="h-8 w-8 text-red-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-0 text-white shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Users</p>
                    <p className="text-3xl font-bold">{users.length}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Section */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl text-slate-800">Team Members</CardTitle>
                  <CardDescription className="text-slate-600">Search, filter, and manage your team</CardDescription>
                </div>
                <Button
                  onClick={handleAddUser}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Search Name</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      placeholder="Search by name..."
                      value={nameFilter}
                      onChange={(e) => setNameFilter(e.target.value)}
                      className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Role</Label>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="All Roles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setNameFilter("")
                      setRoleFilter("all")
                      setStatusFilter("all")
                    }}
                    className="w-full border-slate-200 hover:bg-slate-50"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>

              {/* Users Table */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className="overflow-hidden rounded-lg">
                    <Table>
                      <TableHeader className="bg-slate-50">
                        <TableRow className="border-slate-200">
                          <TableHead className="text-slate-700 font-semibold">S/NO.</TableHead>
                          <TableHead className="text-slate-700 font-semibold">User</TableHead>
                          <TableHead className="text-slate-700 font-semibold">Role</TableHead>
                          <TableHead className="text-slate-700 font-semibold">Status</TableHead>
                          <TableHead className="text-slate-700 font-semibold">Last Login</TableHead>
                          <TableHead className="text-slate-700 font-semibold w-20">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user, index) => (
                          <TableRow key={user.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                            <TableCell className="font-medium text-slate-600">{index + 1}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <Avatar className="h-10 w-10 ring-2 ring-slate-100">
                                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
                                      {user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  {user.status === "active" && (
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-800">
                                    {user.salutation} {user.name}
                                  </p>
                                  <p className="text-sm text-slate-500">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getRoleIcon(user.role)}
                                {getRoleBadge(user.role)}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={user.status === "active" ? "default" : "secondary"}
                                className={
                                  user.status === "active"
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-100"
                                }
                              >
                                {user.status === "active" ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-slate-500">{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditUser(user)}
                                  className="h-8 w-8 p-0 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4 text-blue-600" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4 text-red-600" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* User Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl text-slate-800">
                  {editingUser ? "Edit User" : "Add New User"}
                </DialogTitle>
                <DialogDescription className="text-slate-600">
                  {editingUser
                    ? "Update user account details"
                    : "Create a new user account with appropriate permissions"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salutation" className="text-slate-700 font-medium">
                      Salutation
                    </Label>
                    <Select
                      value={formData.salutation}
                      onValueChange={(value) => setFormData({ ...formData, salutation: value })}
                    >
                      <SelectTrigger className="border-slate-200 focus:border-blue-500">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Ms.">Ms.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 col-span-2">
                    <Label htmlFor="user-name" className="text-slate-700 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="user-name"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border-slate-200 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-email" className="text-slate-700 font-medium">
                    Email Address
                  </Label>
                  <Input
                    id="user-email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="border-slate-200 focus:border-blue-500"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-role" className="text-slate-700 font-medium">
                    Role
                  </Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger className="border-slate-200 focus:border-blue-500">
                      <SelectValue placeholder="Select user role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Developer">Developer</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                      <SelectItem value="Viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* System Admin and Active Status in one line */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <Label htmlFor="system-admin" className="text-slate-700 font-medium text-sm">
                      System Admin
                    </Label>
                    <Switch
                      id="system-admin"
                      checked={formData.isSystemAdmin}
                      onCheckedChange={(checked) => setFormData({ ...formData, isSystemAdmin: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <Label htmlFor="active-status" className="text-slate-700 font-medium text-sm">
                      Active User
                    </Label>
                    <Switch
                      id="active-status"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-slate-200">
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveUser}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Save
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {showSuccessMessage && (
            <div className="fixed top-6 right-6 bg-white border border-emerald-200 text-emerald-800 px-6 py-4 rounded-xl shadow-2xl z-50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                </div>
                <span className="font-medium">{successMessage}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
