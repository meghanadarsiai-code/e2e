import React, { useEffect, useMemo, useState } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import AuthModal from "./auth_modal";
import { clearAuth, getUser, isAuthenticated } from "../utils/auth";

function TopNavbar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeUser = useMemo(() => user?._id ? user : getUser(), [user]);
  const loggedIn = isAuthenticated();
  const admin = activeUser?.role === "admin";

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark-mode");
    else document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const logout = () => {
    clearAuth();
    dispatch({ type: "LOGOUT" });
    navigate("/home");
  };

  const navItems = [
    { label: "Home", path: "/home" },
    ...(loggedIn && !admin ? [{ label: "Dashboard", path: "/dashboard" }] : []),
    { label: "Courses", path: "/courses" },
    { label: "Tests", path: "/tests" },
    { label: "Code Editor", path: "/ide" },
    { label: "Chat", path: "/chat" },
    { label: "Certificates", path: "/certificate" },
  ];

  return (
    <>
      <AuthModal show={showAuthModal} onHide={() => setShowAuthModal(false)} />
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="glass-effect border-bottom fixed-top"
        style={{ height: "80px" }}
      >
        <Container>
          <Navbar.Brand onClick={() => navigate("/home")} style={{ cursor: "pointer" }}>
            <span className="fw-bold" style={{ color: "var(--ciph-text)" }}>Cipher</span>
            <span style={{ color: "var(--ciph-primary)", fontWeight: 800 }}>Schools</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-offcanvas" />
          <Navbar.Offcanvas id="main-offcanvas" placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Navigation</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-center flex-grow-1 gap-lg-3">
                {navItems.map((item) => (
                  <Nav.Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setExpanded(false)}
                    className="nav-link fw-semibold"
                    style={{ color: "var(--ciph-text)" }}
                  >
                    {item.label}
                  </Nav.Link>
                ))}
                {admin && (
                  <Nav.Link
                    href="/admin-dashboard"
                    onClick={() => setExpanded(false)}
                    className="nav-link fw-bold text-danger"
                  >
                    Admin Dashboard
                  </Nav.Link>
                )}
              </Nav>

              <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
                <Button
                  variant="light"
                  className="rounded-circle border"
                  style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "var(--ciph-card-bg)",
                    color: "var(--ciph-text)",
                    borderColor: "var(--ciph-border)"
                  }}
                  onClick={() => setDarkMode((prev) => !prev)}
                >
                  <i className={`fa-solid ${darkMode ? "fa-sun" : "fa-moon"}`} />
                </Button>

                {loggedIn ? (
                  <>
                    <Button
                      variant="outline-dark"
                      className="rounded-pill"
                      style={{ color: "var(--ciph-text)", borderColor: "var(--ciph-border)" }}
                      onClick={() => { navigate(`/profilepage/${activeUser?._id}`); setExpanded(false); }}
                    >
                      {activeUser?.fullName || "Profile"}
                    </Button>
                    <Button variant="danger" className="rounded-pill px-3" onClick={() => { logout(); setExpanded(false); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button className="gfg-btn-primary rounded-pill px-4" onClick={() => { setShowAuthModal(true); setExpanded(false); }}>
                    Login / Signup
                  </Button>
                )}
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
