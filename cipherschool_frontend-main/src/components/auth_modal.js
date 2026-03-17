import React, { useMemo, useState } from "react";
import { Button, Form, Modal, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiService } from "../utils/api";
import { persistAuth } from "../utils/auth";

const INTEREST_OPTIONS = [
  "DSA",
  "Web Development",
  "Data Science",
  "App Development",
  "Programming Languages",
  "CS Fundamentals",
];

function AuthModal(props) {
  const [tab, setTab] = useState("login");
  const [loading, setLoading] = useState(false);
  const [asAdmin, setAsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [street, setStreet] = useState("");
  const [homeAddress, setHomeAddress] = useState("");
  const [stateName, setStateName] = useState("");
  const [country, setCountry] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authTitle = useMemo(
    () => (asAdmin ? "Admin Access" : "Student Access"),
    [asAdmin]
  );

  const persistAndRoute = (token, user) => {
    persistAuth({ token, user });
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
    props.onHide();
    navigate(user.role === "admin" ? "/admin-dashboard" : "/home");
  };

  const fillAdminCredentials = () => {
    setEmail("admin@cipherschools.com");
    setPassword("Admin@123");
    setAsAdmin(true);
    setTab("login");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = { email, password };
      const response = asAdmin
        ? await apiService.auth.adminLogin(payload)
        : await apiService.auth.userLogin(payload);

      // Silently log activity for the heatmap upon successful login
      apiService.users.logActivity().catch(e => console.error("Could not log activity", e));

      const { token, user } = response.data.result;
      persistAndRoute(token, user);
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome ${user.role === "admin" ? "Admin" : user.fullName}`,
        timer: 1400,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.error || "Unable to login",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const payload = {
        fullName,
        email,
        password,
        street,
        homeAddress,
        state: stateName,
        country,
        intrest1: selectedInterests[0] || "Select from options",
        intrest2: selectedInterests[1] || "Select from options",
        intrest3: selectedInterests[2] || "Select from options",
        intrest4: selectedInterests[3] || "Select from options",
      };

      await apiService.auth.userSignup(payload);
      const loginResponse = await apiService.auth.userLogin({ email, password });
      const { token, user } = loginResponse.data.result;
      persistAndRoute(token, user);

      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your student account is ready",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.response?.data?.error || "Unable to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal {...props} centered className="auth-modal" size="md">
      <Modal.Header closeButton className="border-0 pb-0 pt-4 px-4">
        <Modal.Title className="fw-bold w-100 text-center fs-3">
          <span style={{ color: "var(--ciph-secondary)" }}>Cipher</span>
          <span style={{ color: "var(--ciph-primary)" }}>Schools</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="px-4 pb-4">
        <div className="mb-4 p-3 rounded-4 shadow-sm" style={{ background: "var(--ciph-soft)" }}>
          <div className="d-flex justify-content-between align-items-center">
            <strong>{authTitle}</strong>
            <Form.Check
              type="switch"
              id="admin-mode"
              label="Admin"
              checked={asAdmin}
              onChange={(e) => setAsAdmin(e.target.checked)}
              disabled={tab === "signup"}
            />
          </div>
        </div>

        <Tabs activeKey={tab} onSelect={(k) => setTab(k || "login")} fill>
          <Tab eventKey="login" title="Login">
            <Form className="pt-3" onSubmit={handleLogin}>
              {asAdmin && (
                <div className="mb-3 p-2 rounded-3 border bg-light d-flex justify-content-between align-items-center gap-2">
                  <small className="text-muted mb-0">Demo admin: admin@cipherschools.com / Admin@123</small>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-dark"
                    onClick={fillAdminCredentials}
                  >
                    Use Demo
                  </button>
                </div>
              )}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="gfg-btn-primary" disabled={loading}>
                  {loading ? "Signing in..." : "Login"}
                </Button>
              </div>
            </Form>
          </Tab>

          <Tab eventKey="signup" title="Sign Up">
            <Form className="pt-3" onSubmit={handleSignup}>
              <Form.Group className="mb-2">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Home Address</Form.Label>
                <Form.Control
                  type="text"
                  value={homeAddress}
                  onChange={(e) => setHomeAddress(e.target.value)}
                  required
                />
              </Form.Group>
              <div className="row">
                <div className="col-6">
                  <Form.Group className="mb-2">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-6">
                  <Form.Group className="mb-2">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Interests (optional)</Form.Label>
                <div className="d-flex flex-wrap gap-2">
                  {INTEREST_OPTIONS.map((interest) => (
                    <Form.Check
                      key={interest}
                      type="checkbox"
                      label={interest}
                      checked={selectedInterests.includes(interest)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedInterests((prev) => prev.concat(interest).slice(0, 4));
                        } else {
                          setSelectedInterests((prev) =>
                            prev.filter((value) => value !== interest)
                          );
                        }
                      }}
                    />
                  ))}
                </div>
              </Form.Group>
              <div className="d-grid">
                <Button type="submit" className="gfg-btn-primary" disabled={loading}>
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </div>
            </Form>
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}

export default AuthModal;
