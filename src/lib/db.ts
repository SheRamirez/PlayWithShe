import bcrypt from 'bcryptjs';

export interface DBUser {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
}

const USERS_KEY = 'minigames_users';

const getUsers = (): DBUser[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: DBUser[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const createUser = (username: string, email: string, password: string): DBUser | null => {
  try {
    const users = getUsers();
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );
    
    if (existingUser) {
      return null;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser: DBUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashedPassword,
      created_at: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const findUserByEmail = (email: string): DBUser | null => {
  try {
    const users = getUsers();
    return users.find((u) => u.email === email) || null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

export const validatePassword = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};