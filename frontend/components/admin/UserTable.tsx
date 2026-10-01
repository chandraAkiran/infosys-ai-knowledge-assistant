"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";

interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  department: string;
  is_active: boolean;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const response = await apiRequest<User[]>("/users/", {
        method: "GET",
        token,
      });

      setUsers(response);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not load users.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function updateUserRole(
    userId: number,
    role: string,
    department: string
  ) {
    try {
      setUpdatingId(userId);
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const updatedUser = await apiRequest<User>(
        `/users/${userId}/role`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({
            role,
            department,
          }),
        }
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? updatedUser : user
        )
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not update user role.";

      setError(message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function updateUserStatus(
    userId: number,
    isActive: boolean
  ) {
    try {
      setUpdatingId(userId);
      setError("");

      const token = localStorage.getItem("enterprise_token");

      if (!token) {
        throw new Error("You are not logged in.");
      }

      const updatedUser = await apiRequest<User>(
        `/users/${userId}/status`,
        {
          method: "PATCH",
          token,
          body: JSON.stringify({
            is_active: isActive,
          }),
        }
      );

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === userId ? updatedUser : user
        )
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not update user status.";

      setError(message);
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Users & Roles
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage employee roles and department access.
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-slate-500">
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <p className="text-sm text-slate-500">
          No users found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="px-3 py-3 font-medium">Name</th>
                <th className="px-3 py-3 font-medium">Role</th>
                <th className="px-3 py-3 font-medium">Department</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="px-3 py-4">
                    <div className="font-medium text-slate-900">
                      {user.full_name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {user.email}
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <select
                      value={user.role}
                      disabled={updatingId === user.id}
                      onChange={(event) =>
                        updateUserRole(
                          user.id,
                          event.target.value,
                          user.department
                        )
                      }
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
                    >
                      <option value="employee">Employee</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>

                  <td className="px-3 py-4">
                    <select
                      value={user.department}
                      disabled={updatingId === user.id}
                      onChange={(event) =>
                        updateUserRole(
                          user.id,
                          user.role,
                          event.target.value
                        )
                      }
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700"
                    >
                      <option value="IT">IT</option>
                      <option value="Engineering">Engineering</option>
                      <option value="HR">HR</option>
                      <option value="Delivery Operations">
                        Delivery Operations
                      </option>
                      <option value="PMO">PMO</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </td>

                  <td className="px-3 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        user.is_active
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-3 py-4">
                    <button
                      type="button"
                      disabled={updatingId === user.id}
                      onClick={() =>
                        updateUserStatus(
                          user.id,
                          !user.is_active
                        )
                      }
                      className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {updatingId === user.id
                        ? "Updating..."
                        : user.is_active
                          ? "Deactivate"
                          : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}