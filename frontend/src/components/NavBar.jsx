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

const NavBar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">You don't need AI.</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {!isAuthenticated || !user.isVerified ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem>
              <Button
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
