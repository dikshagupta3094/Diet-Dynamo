import React, { useState } from "react";
import Footer from "../Components/Footer.jsx";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Diet.png";
import { Link, NavLink } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ModalClose from "@mui/joy/ModalClose";
import { GiHamburgerMenu } from "react-icons/gi";
const HomeLayout = ({ children }) => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden max-h-screen md:flex flex-col fixed top-0 right-0 left-0 z-1">
        <div className="flex items-center justify-between shadow px-5 py-5 bg-white">
          <div className="flex items-center gap-5">
            <img src={Logo} alt="Image" className="h-[50px] w-[50px]" />
            <h1 className="text-2 font-bold text-green-500 text-2xl">DIET DYNAMO</h1>
          </div>
          <ul className="flex items-center text-[18px] font-semibold px-10 gap-5 flex-wrap md:flex-nowrap">
            <li>
              <NavLink to={"/"} className="hover:text-green-500">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={"/about"} className="hover:text-green-500">
                About
              </NavLink>
            </li>
            {isLoggedIn && role == "USER" && (
              <li>
                <NavLink to={"/expert"} className="hover:text-green-500">
                  Our Expert
                </NavLink>
              </li>
            )}

            {isLoggedIn && role == "ADMIN" && (
              <li>
                <NavLink
                  to={"/admin-dashboard"}
                  className="hover:text-green-500"
                >
                  Admin Dashboard
                </NavLink>
              </li>
            )}

            {isLoggedIn && role == "DIET EXPERT" && (
              <li>
                <NavLink to={"/view-queries"} className="hover:text-green-500">
                  View Queries
                </NavLink>
              </li>
            )}

            {!isLoggedIn ? (
              <div className="flex items-center gap-5">
                <li>
                  <button className="bg-green-500 px-3 py-1 rounded-xl text-white hover:bg-blue-500">
                    <NavLink to={"/login"}>Login</NavLink>
                  </button>
                </li>

                <li>
                  <button className="bg-green-500 px-3 py-1 rounded-xl text-white hover:bg-blue-500">
                    <NavLink to={"/signup"}>Register</NavLink>
                  </button>
                </li>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <li>
                  <button className="bg-green-500 px-3 py-1 rounded-xl text-white hover:bg-blue-500">
                    <NavLink to={"/my"}>My Profile</NavLink>
                  </button>
                </li>
                <li>
                  <button className="bg-green-500 px-3 py-1 rounded-xl text-white hover:bg-blue-500">
                    <NavLink to={"/logout"}>Logout</NavLink>
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </div>

      {/* Responsive navabar */}
      <div className="flex px-2 py-2 md:hidden">
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <GiHamburgerMenu />
        </Button>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ModalClose />
          <DialogTitle>
            <div className="flex items-center gap-4">
              <img src={Logo} alt="" className="h-[40px] w-[40px]" />
              <h1 className="font-semibold text-green-500 text-2xl">
                DIET DYNAMO
              </h1>
            </div>
          </DialogTitle>
          <DialogContent className="h-full flex flex-col justify-between">
            <List>
              <ListItem>
                <ListItemButton onClick={() => setOpen(false)}>
                  <NavLink to={"/"} className=" text-[18px] font-semibold">
                    Home
                  </NavLink>
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => setOpen(false)}>
                  <NavLink to={"/about"} className="text-[18px] font-semibold">
                    About
                  </NavLink>
                </ListItemButton>
              </ListItem>

              {isLoggedIn && role == "USER" && (
                <ListItem>
                  <ListItemButton>
                    <NavLink
                      to={"/expert"}
                      className="text-[18px] font-semibold"
                    >
                      Our Expert
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              )}

              {isLoggedIn && role == "ADMIN" && (
                <ListItem>
                  <ListItemButton>
                    <NavLink
                      to={"/admin-dashboard"}
                      className="text-[18px] font-semibold"
                    >
                      Admin
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              )}

              {isLoggedIn && role == "DIET EXPERT" && (
                <ListItem>
                  <ListItemButton>
                    <NavLink
                      to={"/view-queries"}
                      className="text-[18px] font-semibold"
                    >
                      View Query
                    </NavLink>
                  </ListItemButton>
                </ListItem>
              )}

              {/* Buttons at Bottom */}
              <div className="p-4 mt-auto flex justify-between">
                {!isLoggedIn ? (
                  <>
                    <button className="w-full py-2 rounded-xl bg-green-500 text-white">
                      <NavLink
                        to={"/login"}
                        className="text-[18px] font-semibold"
                      >
                        Login
                      </NavLink>
                    </button>
                    <button className="w-full py-2 rounded-xl bg-green-500 text-white ml-2">
                      <NavLink
                        to={"/signup"}
                        className="text-[18px] font-semibold"
                      >
                        Register
                      </NavLink>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full py-2 rounded-xl bg-green-500 text-white">
                      <NavLink to={"/me"} className="text-[18px] font-semibold">
                        My Profile
                      </NavLink>
                    </button>
                    <button className="w-full py-2 rounded-xl bg-green-500 text-white ml-2">
                      <NavLink
                        to={"/logout"}
                        className="text-[18px] font-semibold"
                      >
                        Logout
                      </NavLink>
                    </button>
                  </>
                )}
              </div>
            </List>
          </DialogContent>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              p: 1.5,
              pb: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          ></Box>
        </Drawer>
      </div>

      {children}

      <Footer />
    </>
  );
};

export default HomeLayout;
