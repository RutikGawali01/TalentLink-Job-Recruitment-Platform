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

// ─── Header.jsx ───────────────────────────────────────────────────────────────
const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const [opened, { open, close }] = useDisclosure(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setupResponseInterceptor(navigate);
    const token = localStorage.getItem("token");
    if (!token) return;
    axiosInstance
      .get("/auth/me")
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => localStorage.removeItem("token"));
  }, [navigate, dispatch]);

  useEffect(() => {
    if (!user || !user.profileId) return;
    const fetchProfile = async () => {
      try {
        if (user.accountType === "APPLICANT") {
          const data = await getProfile(user?.profileId);
          dispatch(setProfile(data));
        }
        if (user.accountType === "EMPLOYER") {
          const data = await getEmployerProfile(user?.profileId);
          dispatch(setEmployerProfile({ ...data, companyName: user.name }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, [user, dispatch]);

  const hideNavbarRoutes = [];
  const shouldHideNavbar = hideNavbarRoutes.some((r) =>
    location.pathname.startsWith(r)
  );

  return (
    <>
      {!shouldHideNavbar && (
        <div
          className={`
            w-full h-20 flex fixed top-0 left-0 z-50
            justify-between px-6 items-center
            transition-all duration-300
            ${
              scrolled
                ? "bg-white/90 backdrop-blur-lg shadow-md shadow-slate-100 border-b border-slate-200"
                : "bg-white/60 backdrop-blur-md border-b border-slate-100"
            }
          `}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md shadow-blue-200 group-hover:shadow-blue-300 transition-all duration-300">
              <IconAnchor className="h-5 w-5 text-white" stroke={2.25} />
            </div>
            <span
              className="
                font-extrabold tracking-tight
                text-xl sm:text-2xl
                bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500
                bg-clip-text text-transparent
                whitespace-nowrap
                select-none
              "
            >
              TalentLink
            </span>
          </Link>

          {/* ── Nav Links ── */}
          <NavLinksController />

          {/* ── Right Section ── */}
          <div className="flex gap-2 items-center">
            {user ? (
              <ProfileMenu />
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button
                    variant="subtle"
                    className="
                      !font-semibold !text-slate-600
                      hover:!text-blue-600 hover:!bg-blue-50
                      !rounded-xl !transition-all !duration-200
                    "
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    variant="filled"
                    className="
                      !rounded-xl !px-6 !font-semibold
                      !bg-gradient-to-r !from-blue-600 !to-blue-700
                      hover:!from-blue-700 hover:!to-blue-800
                      !shadow-md !shadow-blue-200
                      hover:!shadow-blue-300 hover:!-translate-y-0.5
                      !transition-all !duration-200
                    "
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            {user && <NotifiMenu />}

            <Burger
              className="min-[930px]:hidden !text-slate-600"
              opened={opened}
              onClick={open}
              aria-label="Toggle navigation"
            />

            <Drawer
              size="xs"
              position="right"
              closeButtonProps={{ icon: <IconX size={22} stroke={1.5} /> }}
              overlayProps={{ backgroundOpacity: 0.45, blur: 6 }}
              opened={opened}
              onClose={close}
              title={
                <span className="font-extrabold text-lg bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                  HireFlow
                </span>
              }
              styles={{
                header: { borderBottom: "1px solid #E2E8F0", paddingBottom: 12 },
                body: { paddingTop: 20 },
              }}
            >
              <NavLinksController mobile={true} />
            </Drawer>
          </div>
        </div>
      )}

      {!shouldHideNavbar && <div className="h-20" />}
    </>
  );
};

export default Header;