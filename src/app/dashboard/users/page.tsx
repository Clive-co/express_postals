// src/app/dashboard/users/page.tsx
"use client";

import { useState, useEffect } from "react";
import { XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

type User = {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
};

type CurrentUser = {
  _id: string;
  username: string;
  role: "admin" | "user";
};

export default function UsersPage() {
  // State for all users:
  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(true);
  const [usersError, setUsersError] = useState<string | null>(null);

  // State for current signed-in user (to check role):
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [meLoading, setMeLoading] = useState<boolean>(true);

  // Delete confirmation modal state:
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // "Create New User" modal state:
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [createForm, setCreateForm] = useState<{
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
  }>({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [createLoading, setCreateLoading] = useState<boolean>(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);

  // Utility to normalize JSON response into an array of users:
  function normalizeToUserArray(data: any): User[] {
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray((data as any).users)) {
      return (data as any).users;
    }
    return [];
  }

  // Fetch all users:
  useEffect(() => {
    async function fetchUsers() {
      setUsersLoading(true);
      setUsersError(null);
      try {
        const res = await fetch("/api/users", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(normalizeToUserArray(data));
      } catch (err: any) {
        setUsersError(err.message || "Error loading users");
      } finally {
        setUsersLoading(false);
      }
    }
    fetchUsers();
  }, []);

  // Fetch current signed-in user:
  useEffect(() => {
    async function fetchMe() {
      setMeLoading(true);
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Not authenticated");
        const { user } = await res.json();
        setCurrentUser(user);
      } catch {
        setCurrentUser(null);
      } finally {
        setMeLoading(false);
      }
    }
    fetchMe();
  }, []);

  // Refresh users helper:
  async function refreshUsers() {
    setUsersLoading(true);
    setUsersError(null);
    try {
      const res = await fetch("/api/users", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(normalizeToUserArray(data));
    } catch (err: any) {
      setUsersError(err.message || "Error loading users");
    } finally {
      setUsersLoading(false);
    }
  }

    // Open the “are you sure?” modal for a particular user
  function onDeleteClick(user: User) {
    setUserToDelete(user);
    setDeleteError(null);
    setShowDeleteConfirm(true);
  }

  // Confirm deletion:
  async function confirmDelete() {
    if (!userToDelete) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/users/${userToDelete._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.message || "Failed to delete user");
      }
      // reload
      await refreshUsers();
      setShowDeleteConfirm(false);
      setUserToDelete(null);
    } catch (err: any) {
      setDeleteError(err.message || "Error deleting user");
    } finally {
      setDeleteLoading(false);
    }
  }

  // Handle Create New User:
  async function handleCreateSubmit(e: React.FormEvent) {
  e.preventDefault();
  setCreateError(null);
  setCreateSuccess(null);

  if (!createForm.username || !createForm.email || !createForm.password) {
    setCreateError("All fields are required.");
    return;
  }

  setCreateLoading(true);
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(createForm),
    });

    // If not OK, try to pull an error message from JSON, otherwise fallback
    if (!res.ok) {
      let errMsg = `Server responded with ${res.status}`;
      // attempt to parse JSON error
      try {
        const errData = await res.json();
        if (errData.error) errMsg = errData.error;
      } catch {
        // parsing failed (likely HTML), leave errMsg as-is
      }

      // Handle duplicate‐key (Mongo code 11000)
      if (errMsg.includes("duplicate key")) {
        if (errMsg.includes("email")) {
          errMsg = "Email already exists.";
        } else if (errMsg.includes("username")) {
          errMsg = "Username already exists.";
        } else {
          errMsg = "That value already exists.";
        }
      }

      throw new Error(errMsg);
    }

    // At this point res.ok === true, parse the JSON
    const data = await res.json();

    // Success
    setCreateSuccess("User created successfully.");
    setShowCreateModal(false);
    setCreateForm({ username: "", email: "", password: "", role: "user" });
    await refreshUsers();

  } catch (err: any) {
    setCreateError(err.message);
  } finally {
    setCreateLoading(false);
  }
}


  return (
    <div className="min-h-[100vh] bg-gray-50 dark:bg-gray-dark px-4 py-6 sm:px-6 lg:px-8">
      {/* ─── Page Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Manage Users
          </h1>
          <nav className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            <a href="/dashboard" className="hover:underline">
              Dashboard
            </a>{" "}
            / Users
          </nav>
        </div>

        {/* "Create New User" button for admins */}
        {!meLoading && currentUser?.role === "admin" && (
          <button
            onClick={() => {
              setShowCreateModal(true);
              setCreateError(null);
              setCreateSuccess(null);
            }}
            className="inline-flex items-center gap-2 rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Create New User
          </button>
        )}
      </div>

      {/* ─── Card Container ──────────────────────────────────────────────────────── */}
      <div className="rounded-lg bg-white dark:bg-gray-700 shadow-sm overflow-hidden">
        {usersLoading ? (
          <div className="p-6 text-center text-gray-700 dark:text-gray-300">
            Loading users…
          </div>
        ) : usersError ? (
          <div className="p-6 text-center text-red-500">{usersError}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
              {/* ─── Table Header ────────────────────────────────────────────────── */}
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>

              {/* ─── Table Body ────────────────────────────────────────────────────── */}
              <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    {/* User (image + username) */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100 flex items-center space-x-3">
                      <img
                        src={`/images/user/user-32.png`}
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                      />
                      <div>{user.username}</div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                      {user.email}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-100">
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </td>

                    {/* Delete Button (only visible/clickable if currentUser is admin) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!meLoading && currentUser?.role === "admin" && (
                        <button
                          title="Delete"
                          onClick={() => onDeleteClick(user)}
                          className="inline-flex items-center justify-center h-8 w-8 rounded border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-gray-100 focus:outline-none"
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500 dark:text-gray-300"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─── Delete Confirmation Modal ──────────────────────────────────────────── */}
      {showDeleteConfirm && userToDelete && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black bg-opacity-50 px-4 pt-20 pb-8 overflow-y-auto">
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl">
            {/* Close / X */}
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setUserToDelete(null);
                setDeleteError(null);
              }}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
            >
              <XIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>

            <div className="px-6 py-8 text-center space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirm Delete
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Are you sure you want to delete user{" "}
                <span className="font-medium">{userToDelete.username}</span>?
              </p>

              {deleteError && (
                <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
                  {deleteError}
                </div>
              )}

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setUserToDelete(null);
                    setDeleteError(null);
                  }}
                  className="rounded-md bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
                    deleteLoading
                      ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                      : "bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-500"
                  )}
                >
                  {deleteLoading ? (
                    <svg
                      className="h-5 w-5 animate-spin text-white dark:text-gray-200"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Delete User"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Create New User Modal ──────────────────────────────────────────────── */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black bg-opacity-50 px-4 pt-20 pb-8 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col max-h-[90vh]">
            {/* Close / X */}
            <button
              onClick={() => {
                setShowCreateModal(false);
                setCreateError(null);
                setCreateSuccess(null);
              }}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-gray-100 p-1 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none"
            >
              <XIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
            </button>

            <div className="px-6 pt-8 pb-6 flex-1 overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Create New User
              </h2>

              <form onSubmit={handleCreateSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label
                    htmlFor="new-username"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Username
                  </label>
                  <input
                    id="new-username"
                    type="text"
                    required
                    value={createForm.username}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    placeholder="johndoe"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-purple-400"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="new-email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Email
                  </label>
                  <input
                    id="new-email"
                    type="email"
                    required
                    value={createForm.email}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    placeholder="john@example.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-purple-400"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    required
                    value={createForm.password}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="********"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-purple-400"
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="new-role"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Role
                  </label>
                  <select
                    id="new-role"
                    required
                    value={createForm.role}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        role: e.target.value as "admin" | "user",
                      }))
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-100 dark:focus:border-purple-400"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {/* Error / Success Messages */}
                {createError && (
                  <div className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-800 dark:bg-red-900 dark:text-red-200" role="alert">
                    {createError}
                  </div>
                )}
                {createSuccess && (
                  <div className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-800 dark:bg-green-900 dark:text-green-200" role="alert">
                    {createSuccess}
                  </div>
                )}

                {/* Submit Button */}
                <div className="text-right pt-4">
                  <button
                    type="submit"
                    disabled={createLoading}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                      createLoading
                        ? "bg-gray-300 text-gray-700 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
                        : "bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-purple-500"
                    )}
                  >
                    {createLoading ? (
                      <svg
                        className="h-5 w-5 animate-spin text-white dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    ) : (
                      "Create User"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
