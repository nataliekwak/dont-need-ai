import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../assets/logo.png";

import { ThemeToggle } from "./index.js";
import { useAuthStore } from "../store/authStore.js";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Navbar isBordered position="sticky" className="fixed shadow-xs">
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="h-8 mr-2" />
          <h1 className="font-bold text-2xl">You don't need AI.</h1>
        </RouterLink>
      </NavbarBrand>
      <NavbarContent justify="end">
        <ThemeToggle />
        {!isAuthenticated || !user.isVerified ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Button
                className="btn"
                as={Link}
                color="primary"
                href="/login"
                variant="light"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                className="btn"
                as={Link}
                color="primary"
                href="/register"
                variant="flat"
              >
                Register
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
                className="btn"
                as={Link}
                onPress={handleLogout}
                color="primary"
                href="/"
                variant="flat"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
