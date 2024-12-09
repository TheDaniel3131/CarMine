"use client";

import * as React from "react";
import { Search, Trash, Eye } from "lucide-react";
import AH from "@/components/adminheader/AdminHeader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeContext";

interface User {
  userId: string;
  username: string;
  email: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false);
  const { darkMode } = useTheme();

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch(`/api/admin/users/${userId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete user");
        setUsers(users.filter((user) => user.userId !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}
    >
      <AH />
      <main className="flex-grow container mx-auto px-4 py-4">
        <Card
          className={`shadow-sm ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white"
          }`}
        >
          <CardHeader className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold">
                  User Management
                </CardTitle>
                <CardDescription
                  className={darkMode ? "text-gray-300" : "text-gray-600"}
                >
                  View and manage user accounts
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={`pl-8 ${
                    darkMode ? "bg-gray-700 text-gray-100" : "bg-white"
                  }`}
                />
              </div>
            </div>
            <div
              className={`rounded-md border ${
                darkMode ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/4">Username</TableHead>
                    <TableHead className="w-1/2">Email</TableHead>
                    <TableHead className="w-1/4 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.userId}>
                        <TableCell className="font-medium">
                          {user.username}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteUser(user.userId)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent
          className={darkMode ? "bg-gray-800 text-gray-100" : "bg-white"}
        >
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>
                  User ID
                </Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedUser.userId}
                </div>
              </div>
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>
                  Username
                </Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedUser.username}
                </div>
              </div>
              <div>
                <Label className={darkMode ? "text-gray-300" : ""}>Email</Label>
                <div className={darkMode ? "text-gray-100" : ""}>
                  {selectedUser.email}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
