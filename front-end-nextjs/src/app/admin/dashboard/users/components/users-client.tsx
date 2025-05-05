"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserActionDropdown } from "./user-action-dropdown"
import { AddUserModal } from "./add-user-modal"
import { EditUserModal } from "./edit-user-modal"
import { ChangePasswordModal } from "./change-password-modal"

export type UserRole = "admin" | "staff"
export type UserStatus = "active" | "inactive"

export interface User {
  id: number
  name: string
  email: string
  phone: string
  role: UserRole
  status: UserStatus
}

// Mock data for users
const initialUsers: User[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "admin",
    status: "active",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    role: "staff",
    status: "active",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    role: "staff",
    status: "inactive",
  },
  {
    id: 4,
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "staff",
    status: "active",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    role: "staff",
    status: "active",
  },
]

export const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-purple-100 text-purple-800"
    case "staff":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getRoleText = (role: string) => {
  switch (role) {
    case "admin":
      return "Quản trị viên"
    case "staff":
      return "Nhân viên"
    default:
      return role
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Hoạt động"
    case "inactive":
      return "Không hoạt động"
    default:
      return status
  }
}

export function UsersClient() {
  const [users, setUsers] = useState<User[]>(initialUsers)

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const handleAddUser = (newUser: Omit<User, "id">) => {
    const id = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1
    setUsers([...users, { ...newUser, id }])
    setAddModalOpen(false)
  }

  const handleEditUser = (updatedUser: User) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleChangePassword = (userId: number, newPassword: string) => {
    // In a real application, this would call an API to update the password
    console.log(`Changing password for user ${userId} to ${newPassword}`)
    setPasswordModalOpen(false)
    setSelectedUser(null)
  }

  const handleToggleStatus = (userId: number) => {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            status: user.status === "active" ? "inactive" : "active",
          }
        }
        return user
      }),
    )
  }

  const openEditModal = (user: User) => {
    setSelectedUser(user)
    setEditModalOpen(true)
  }

  const openPasswordModal = (user: User) => {
    setSelectedUser(user)
    setPasswordModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí tài khoản</h1>
        <Button onClick={() => setAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tài khoản</CardTitle>
          <CardDescription>Quản lý tài khoản người dùng trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleText(user.role)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusText(user.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <UserActionDropdown
                      user={user}
                      onEdit={() => openEditModal(user)}
                      onChangePassword={() => openPasswordModal(user)}
                      onToggleStatus={() => handleToggleStatus(user.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddUserModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddUser} />

      {selectedUser && (
        <>
          <EditUserModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            user={selectedUser}
            onEdit={handleEditUser}
          />

          <ChangePasswordModal
            isOpen={passwordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
            user={selectedUser}
            onChangePassword={handleChangePassword}
          />
        </>
      )}
    </div>
  )
}
