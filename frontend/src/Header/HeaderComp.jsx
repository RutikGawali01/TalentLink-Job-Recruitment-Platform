import { useState, useEffect } from "react";
import { IconAnchor, IconX } from "@tabler/icons-react";
import { Button, useMantineTheme } from "@mantine/core";
import NotifiMenu from "./NotifiMenu";
import NavLinksController from "./NavLinksController";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ProfileMenu from "./ProfieMenu";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../Services/ProfileService";
import { setProfile } from "../Slice/ProfileSlice";
import { setUser } from "../Slice/UserSlice";
import axiosInstance, {
  setupResponseInterceptor,
} from "../Interceptor/AxiosInterceptor";
import { getEmployerProfile } from "../Services/EmployerProfileService";
import { setEmployerProfile } from "../Slice/EmployerProfileSlice";
import { useDisclosure } from "@mantine/hooks";
import { Drawer, Burger } from "@mantine/core";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  // ================= AUTH CHECK =================
  useEffect(() => {
    setupResponseInterceptor(navigate);

    const token = localStorage.getItem("token");
    if (!token) return;

    axiosInstance
      .get("/auth/me")
      .then((res) => {
        dispatch(setUser(res.data));
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, [navigate, dispatch]);

  // ================= PROFILE FETCH =================
  useEffect(() => {
    if (!user || !user.profileId) return;

    const fetchProfile = async () => {
      try {
        if (user.accountType === "APPLICANT") {
          const data = await getProfile(user.profileId);
          dispatch(setProfile(data));
        }

        if (user.accountType === "EMPLOYER") {
          const data = await getEmployerProfile(user.profileId);
          const updatedData = { ...data, companyName: user.name };
          dispatch(setEmployerProfile(updatedData));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user, dispatch]);

  // ================= HIDE NAVBAR ROUTES =================
  const hideNavbarRoutes = [
    // "/signup",
    // "/login"
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  // ================= RETURN =================
  return (
    <>
      {/* Navbar shown only when allowed */}
      {!shouldHideNavbar && (
        <div
          className="
            w-full h-20 text-primary flex fixed top-0 left-0 z-50
            justify-between px-6 items-center
            bg-white/60 backdrop-blur-md
            border-b border-gray-200
          "
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-[var(--blue-600)]"
          >
            <IconAnchor
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9"
              color="var(--blue-600)"
              stroke={2.25}
            />

            <div
              className="font-semibold 
                  text-xl 
                  sm:text-2xl 
                  md:text-3xl 
                  bg-[var(--gradient-primary)]
                  bg-clip-text 
                 
                  whitespace-nowrap"
            >
              HireFlow
            </div>
          </Link>
          {/* Links */}

          <NavLinksController />

          {/* Right Section */}
          <div className="flex gap-2 items-center">
            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center gap-4">
                {/* Login Button */}
                <Link to="/login">
                  <Button variant="outline" className="text-[var(--blue-600)]">
                    Login
                  </Button>
                </Link>

                {/* Get Started Button */}
                <Link to="/signup">
                  <Button variant="filled" className="rounded-lg px-6">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
            {user && <NotifiMenu />}
            <Burger
              className="min-[930px]:hidden"
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />

            <Drawer
              size={"xs"}
              position="right"
              closeButtonProps={{
                icon: <IconX size={25} stroke={1.5} />,
              }}
              overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
              opened={opened}
              onClose={close}
              title=""
              className="flex gap-2"
            >
              <NavLinksController mobile={true} />
            </Drawer>
          </div>
        </div>
      )}

      {/* Spacer ONLY when navbar is visible */}
      {!shouldHideNavbar && <div className="h-20" />}
    </>
  );
};

export default Header;
