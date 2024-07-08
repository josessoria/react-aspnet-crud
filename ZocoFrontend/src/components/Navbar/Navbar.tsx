import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom"; // Asumiendo que estás usando React Router para la navegación
import zocopng from "../../assets/image/zocopng.png";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import { UserContext, UserContextType } from "../../context/UserProvider";

const Navbartab = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["Products", "Dashboard", "Log Out"];
  const { user }: UserContextType = useContext(UserContext);

  const handleLogout = (navigate: any) => {
    localStorage.removeItem("token");

    navigate("/login");
  };
  console.log(user);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src={zocopng} className=" w-[100px] " alt="" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <img src={zocopng} className=" w-[100px] " alt="" />
        </NavbarBrand>
        <NavbarItem isActive>
          <Link color="foreground" aria-current="page" to="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          {user?.role === "admin" && (
            <Link color="foreground" aria-current="page" to="/admin">
              Admin
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {!user ? (
          <>
            <NavbarItem className=" lg:flex">
              <Link to="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="warning" to="/register" variant="flat">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="lg:flex">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform shadow-xl"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onClick={() => handleLogout(navigate)}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              to="#"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Navbartab;
