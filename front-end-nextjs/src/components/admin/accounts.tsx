"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const accountsData = [
  {
    id: 1,
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "Customer",
    status: "Active",
    orders: 5,
    lastLogin: "2023-10-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Tran Thi B",
    email: "tranthib@example.com",
    phone: "0912345678",
    role: "Customer",
    status: "Active",
    orders: 3,
    lastLogin: "2023-10-10",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Le Van C",
    email: "levanc@example.com",
    phone: "0923456789",
    role: "Admin",
    status: "Active",
    orders: 0,
    lastLogin: "2023-10-18",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Pham Thi D",
    email: "phamthid@example.com",
    phone: "0934567890",
    role: "Staff",
    status: "Active",
    orders: 0,
    lastLogin: "2023-10-17",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Hoang Van E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    role: "Customer",
    status: "Inactive",
    orders: 2,
    lastLogin: "2023-09-25",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Nguyen Thi F",
    email: "nguyenthif@example.com",
    phone: "0956789012",
    role: "Customer",
    status: "Inactive",
    orders: 1,
    lastLogin: "2023-09-20",
    avatar: '/placeholder.svg?height=40&width=40"th=40',
  },
  {
    id: 7,
    name: "Tran Van G",
    email: "tranvang@example.com",
    phone: "0967890123",
    role: "Customer",
    status: "Active",
    orders: 7,
    lastLogin: "2023-10-16",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    name: "Le Thi H",
    email: "lethih@example.com",
    phone: "0978901234",
    role: "Customer",
    status: "Blocked",
    orders: 0,
    lastLogin: "2023-08-15",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const roles = ["Customer", "Staff", "Admin"];

export function Accounts() {
  const [accounts, setAccounts] = useState(accountsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [newAccount, setNewAccount] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Customer",
    status: "Active",
    avatar: "/placeholder.svg?height=200&width=200",
  });

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered accounts
  const getFilteredAccounts = () => {
    return accounts.filter((account) => {
      const matchesSearch =
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.phone.includes(searchTerm);

      const matchesRole = roleFilter === "all" || account.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || account.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const getSortedAccounts = () => {
    const filteredAccounts = getFilteredAccounts();

    return [...filteredAccounts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle add account
  const handleAddAccount = () => {
    const id = Math.max(...accounts.map((a) => a.id)) + 1;
    const today = new Date().toISOString().split("T")[0];

    setAccounts([
      ...accounts,
      {
        id,
        name: newAccount.name,
        email: newAccount.email,
        phone: newAccount.phone,
        role: newAccount.role,
        status: newAccount.status,
        orders: 0,
        lastLogin: today,
        avatar: newAccount.avatar,
      },
    ]);

    setNewAccount({
      name: "",
      email: "",
      phone: "",
      role: "Customer",
      status: "Active",
      avatar: "/placeholder.svg?height=200&width=200",
    });
    setIsAddDialogOpen(false);
  };

  // Handle edit account
  const handleEditAccount = () => {
    setAccounts(
      accounts.map((account) =>
        account.id === currentAccount.id ? currentAccount : account
      )
    );
    setIsEditDialogOpen(false);
  };

  // Handle delete account
  const handleDeleteAccount = () => {
    setAccounts(accounts.filter((account) => account.id !== currentAccount.id));
    setIsDeleteDialogOpen(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Inactive":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Blocked":
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get role badge
  const getRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-500">{role}</Badge>;
      case "Staff":
        return <Badge className="bg-blue-500">{role}</Badge>;
      case "Customer":
        return <Badge className="bg-gray-500">{role}</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Accounts</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Account</DialogTitle>
              <DialogDescription>
                Create a new user account in the system.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, name: e.target.value })
                    }
                    placeholder="Full name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newAccount.email}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, email: e.target.value })
                    }
                    placeholder="Email address"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={newAccount.phone}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, phone: e.target.value })
                    }
                    placeholder="Phone number"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={newAccount.role}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, role: value })
                    }
                  >
                    <SelectTrigger id="role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newAccount.status}
                    onValueChange={(value) =>
                      setNewAccount({ ...newAccount, status: value })
                    }
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avatar">Avatar URL</Label>
                  <Input
                    id="avatar"
                    value={newAccount.avatar}
                    onChange={(e) =>
                      setNewAccount({ ...newAccount, avatar: e.target.value })
                    }
                    placeholder="Avatar URL"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <img
                  src={newAccount.avatar || "/placeholder.svg"}
                  alt="Avatar preview"
                  className="h-20 w-20 object-cover rounded-full border"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddAccount}>Add Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Accounts</CardTitle>
          <CardDescription>
            Manage user accounts and permissions.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full sm:w-[300px]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[80px] cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  ID
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="w-[50px]">Avatar</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer text-right"
                  onClick={() => requestSort("orders")}
                >
                  Orders
                  {sortConfig.key === "orders" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedAccounts().map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.id}</TableCell>
                  <TableCell>
                    <img
                      src={account.avatar || "/placeholder.svg"}
                      alt={account.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.email}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.phone}
                  </TableCell>
                  <TableCell>{getRoleBadge(account.role)}</TableCell>
                  <TableCell>{getStatusBadge(account.status)}</TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {account.orders}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAccount(account);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentAccount(account);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCurrentAccount(account);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {getSortedAccounts().length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No accounts found. Try a different search term or filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Account Details</DialogTitle>
          </DialogHeader>
          {currentAccount && (
            <div className="py-4">
              <Tabs defaultValue="info" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="info">Account Info</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="info" className="space-y-4 pt-4">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <img
                        src={currentAccount.avatar || "/placeholder.svg"}
                        alt={currentAccount.name}
                        className="h-32 w-32 rounded-full object-cover border"
                      />
                      <div className="text-center">
                        <h3 className="text-lg font-semibold">
                          {currentAccount.name}
                        </h3>
                        <div className="mt-1">
                          {getRoleBadge(currentAccount.role)}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Email
                          </p>
                          <p>{currentAccount.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Phone
                          </p>
                          <p>{currentAccount.phone}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Status
                          </p>
                          <div className="mt-1">
                            {getStatusBadge(currentAccount.status)}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            Last Login
                          </p>
                          <p>{currentAccount.lastLogin}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Orders
                        </p>
                        <p>{currentAccount.orders}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="activity" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recent Activity</h3>
                    </div>
                    {currentAccount.orders > 0 ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">Order #1234</p>
                            <p className="text-sm text-muted-foreground">
                              Purchased Honda Wave Alpha
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">30,000,000₫</p>
                            <p className="text-sm text-muted-foreground">
                              2023-10-15
                            </p>
                          </div>
                        </div>
                        {currentAccount.orders > 1 && (
                          <div className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium">Order #1198</p>
                              <p className="text-sm text-muted-foreground">
                                Purchased Yamaha Exciter 155
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">50,000,000₫</p>
                              <p className="text-sm text-muted-foreground">
                                2023-09-22
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No activity found for this account.
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogDescription>
              Make changes to the account details.
            </DialogDescription>
          </DialogHeader>
          {currentAccount && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={currentAccount.name}
                    onChange={(e) =>
                      setCurrentAccount({
                        ...currentAccount,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    type="email"
                    value={currentAccount.email}
                    onChange={(e) =>
                      setCurrentAccount({
                        ...currentAccount,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-phone">Phone Number</Label>
                  <Input
                    id="edit-phone"
                    value={currentAccount.phone}
                    onChange={(e) =>
                      setCurrentAccount({
                        ...currentAccount,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-role">Role</Label>
                  <Select
                    value={currentAccount.role}
                    onValueChange={(value) =>
                      setCurrentAccount({ ...currentAccount, role: value })
                    }
                  >
                    <SelectTrigger id="edit-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={currentAccount.status}
                    onValueChange={(value) =>
                      setCurrentAccount({ ...currentAccount, status: value })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Blocked">Blocked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-avatar">Avatar URL</Label>
                  <Input
                    id="edit-avatar"
                    value={currentAccount.avatar}
                    onChange={(e) =>
                      setCurrentAccount({
                        ...currentAccount,
                        avatar: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <img
                  src={currentAccount.avatar || "/placeholder.svg"}
                  alt="Avatar preview"
                  className="h-20 w-20 object-cover rounded-full border"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditAccount}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this account? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentAccount && (
            <div className="py-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentAccount.avatar || "/placeholder.svg"}
                  alt={currentAccount.name}
                  className="h-12 w-12 object-cover rounded-full"
                />
                <div>
                  <p className="font-medium">{currentAccount.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentAccount.email}
                  </p>
                </div>
              </div>
              {currentAccount.orders > 0 && (
                <div className="mt-4 p-4 bg-yellow-50 text-yellow-800 rounded-md">
                  <p className="text-sm font-medium">
                    Warning: This account has {currentAccount.orders} orders.
                  </p>
                  <p className="text-sm">
                    Deleting this account may affect order history and
                    reporting.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
