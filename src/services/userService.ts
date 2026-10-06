import { userData } from "../data/users";
import type { User } from "../types";

const USERS_STORAGE_KEY = "onecloud_users_v1";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function readUsers(): User[] {
  const saved = localStorage.getItem(
    USERS_STORAGE_KEY,
  );

  if (!saved) {
    const initialUsers = clone(userData);

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(initialUsers),
    );

    return initialUsers;
  }

  try {
    return JSON.parse(saved) as User[];
  } catch {
    const initialUsers = clone(userData);

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(initialUsers),
    );

    return initialUsers;
  }
}

function writeUsers(users: User[]) {
  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(users),
  );
}

export async function getUsers(): Promise<User[]> {
  return clone(readUsers());
}

export async function getUser(
  id: number,
): Promise<User> {
  const user = readUsers().find(
    (item) => item.id === id,
  );

  if (!user) {
    throw new Error("User not found");
  }

  return clone(user);
}

export async function createUser(
  data: Omit<User, "id" | "createdAt">,
): Promise<User> {
  const users = readUsers();

  const nextId =
    Math.max(
      0,
      ...users.map((user) => user.id),
    ) + 1;

  const newUser: User = {
    id: nextId,
    ...data,
    createdAt: new Date().toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    ),
  };

  writeUsers([
    newUser,
    ...users,
  ]);

  return clone(newUser);
}

export async function updateUser(
  id: number,
  data: Omit<User, "id" | "createdAt">,
): Promise<User> {
  const users = readUsers();

  const existingUser = users.find(
    (user) => user.id === id,
  );

  if (!existingUser) {
    throw new Error("User not found");
  }

  const updatedUser: User = {
    ...existingUser,
    ...data,
  };

  const updatedUsers = users.map(
    (user) =>
      user.id === id
        ? updatedUser
        : user,
  );

  writeUsers(updatedUsers);

  return clone(updatedUser);
}