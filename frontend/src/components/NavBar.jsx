import React from "react";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import { useAuthStore } from "../store/authStore.js";
import ThemeToggle from "./ThemeToggle.jsx";

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar isBordered className="navbar bg-base-100 shadow-sm">
      <NavbarBrand className="navbar-start">
        <p className="font-bold text-inherit">You don't need AI.</p>
      </NavbarBrand>
      <NavbarContent className="navbar-end" justify="end">
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
