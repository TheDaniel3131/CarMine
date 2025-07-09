// Header.tsx
export interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  unreadMessages: number;
  onLogout: () => void;
}

// Footer.tsx
export interface FooterProps {
  darkMode: boolean;
}

// SignIn.tsx
export interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, token?: string) => void;
  logout: () => void;
  loading: boolean;
}
