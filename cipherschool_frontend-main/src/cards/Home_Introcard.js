import Card from "react-bootstrap/Card";
import "./Home_Introcard.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import logo from "../images/logo.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MOCK_USER } from "../MOCK_DATA";

function IntroCard() {
  // Here we adding the modal for login
  const [showlogin, setShowLogin] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  //   Here we adding the ,odal for sign up
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ..............................SIGNUP FUNCTIONALITY   .....................................

  //setting up use state for fullname ,password and email
  const [fullName, SetFullName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const [street, SetStreet] = useState("");
  const [homeAddress, SetHomeAddress] = useState("");
  const [state, SetSate] = useState("");
  const [country, SetCountry] = useState("");
  //setting up loading animation
  const [loading, SetLoading] = useState(false);
  //signup event


  // ... inside IntroCard
  const signup = (event) => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
      Swal.fire({
        icon: "success",
        title: "User signed up successfully (MOCK)",
      });
      handleClose();
      handleShowLogin();
      SetFullName("");
      SetEmail("");
      SetPassword("");
      SetStreet("");
      SetHomeAddress("");
      SetCountry("");
      SetSate("");
    }, 1000);
  };

  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (event) => {
    SetLoading(true);
    setTimeout(() => {
      SetLoading(false);
      const userData = { ...MOCK_USER, email: email || MOCK_USER.email };
      if (isAdminLogin) userData.role = 'admin';

      localStorage.setItem("token", "mock-token");
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch({ type: "LOGIN_SUCCESS", payload: userData });

      let timerInterval;
      Swal.fire({
        icon: "success",
        title: isAdminLogin ? "Welcome Admin!" : "Logging you in..... ",
        html: isAdminLogin ? "Accessing Admin Panel..." : `<img width="200" height="200" src="https://cdnb.artstation.com/p/assets/images/images/021/011/023/original/tejal-panchal-pussy-cat.gif?1570027735" alt="not available"/>`,
        timer: 2500,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      });

      if (isAdminLogin) {
        navigate("/admin-dashboard");
      } else {
        navigate(`/assignments`);
      }
    }, 1000);
  };

  return (
    <div>
      <div className="container" style={{ marginTop: '80px', marginBottom: '60px' }}>
        <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '20px' }}>
          <div className="row g-0 align-items-stretch">
            {/* Image Section */}
            <div className="col-lg-6 d-none d-lg-block" style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '500px'
            }}>
            </div>

            {/* Content Section */}
            <div className="col-lg-6 p-4 d-flex flex-column justify-content-center bg-white">
              <div className="p-lg-3">
                <span className="badge bg-warning text-dark mb-3 px-3 py-2 rounded-pill fw-bold">
                  🚀 #1 Learning Platform
                </span>
                <h1 style={{
                  fontSize: "2rem",
                  fontWeight: "800",
                  color: "var(--ciph-secondary)",
                  lineHeight: 1.2,
                  marginBottom: '20px'
                }}>
                  Master the Future with <span className="text-gradient" style={{ whiteSpace: 'nowrap' }}>CipherSchools</span>
                </h1>

                <p className="lead mb-5 text-muted" style={{ fontSize: "1.2rem", lineHeight: '1.8' }}>
                  Unlock your potential with expert-led courses, hands-on projects, and AI-powered learning assistance. Join a community of over 10,000+ learners today.
                </p>

                <div className="d-flex flex-wrap gap-3">
                  <Button
                    className="gfg-btn-primary btn-lg px-5 py-3 shadow-soft flex-grow-1 flex-lg-grow-0"
                    onClick={() => navigate('/courses')}
                  >
                    Explore Courses <i className="fa-solid fa-arrow-right ms-2"></i>
                  </Button>
                </div>

                <div className="mt-5 d-flex align-items-center gap-3 text-muted small">
                  <div className="d-flex">
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                  </div>
                  <span>Trusted by students from top universities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**modal working  */}
      <Modal
        show={showlogin}
        onHide={handleCloseLogin}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header style={{ border: "none" }} closeButton>
          <Modal.Title>
            <img src={logo} alt="logo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#F3912E",
            }}
          >
            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;Login{" "}
          </Card.Title>
          <br></br>
          <div className="form-floating mb-3">
            <input
              value={email}
              onChange={(ev) => SetEmail(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-user"></i>E mail
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={password}
              onChange={(ev) => SetPassword(ev.target.value)}
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-lock"></i>Password
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="adminLoginCheck"
              checked={isAdminLogin}
              onChange={(e) => setIsAdminLogin(e.target.checked)}
            />
            <label className="form-check-label text-muted" htmlFor="adminLoginCheck">
              Login as Admin
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              login();
            }}
            style={{ width: "100%", backgroundColor: "#F3912E" }}
          >
            Login
          </Button>
          {/*Adding the loading animation on top of the card  */}
          {loading ? (
            <div className="row">
              <div className="col-md-12">
                {/*Adding spinner code from bootstrap */}
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-2  d-grid">
            <button
              onClick={handleCloseLogin}
              className="custom-btn custom-btn-white"
              style={{ width: "100%", border: "none" }}
            >
              <span className="text-muted fs-6">Don't have an account?</span>
              <span style={{ color: "#F3912E" }} onClick={handleShow}>
                Sign Up
              </span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Modal for sign up  */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ border: "none" }} closeButton>
          <Modal.Title>
            <img src={logo} alt="logo" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card.Title
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#F3912E",
            }}
          >
            <i className="fa-solid fa-right-to-bracket"></i>&nbsp;Sign Up{" "}
          </Card.Title>
          <br></br>
          <div className="form-floating mb-3">
            <input
              value={fullName}
              onChange={(ev) => SetFullName(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Full Name"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-user"></i>&nbsp;Full Name
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={email}
              onChange={(ev) => SetEmail(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-envelope"></i>&nbsp;Enter E mail
            </label>
          </div>
          <div className="row">
            <div className="col-12" style={{ fontWeight: "600" }}>
              Address
            </div>
            <br></br>
          </div>
          <div className="form-floating mb-3">
            <input
              value={street}
              onChange={(ev) => SetStreet(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Street"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-street-view"></i>&nbsp;Street
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={homeAddress}
              onChange={(ev) => SetHomeAddress(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Appartment/Suite//Home Addres"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-building-user"></i>
              &nbsp;Appartment/Suite//Home Addres
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={state}
              onChange={(ev) => SetSate(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="state"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-group-arrows-rotate"></i>
              &nbsp;state
            </label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={country}
              onChange={(ev) => SetCountry(ev.target.value)}
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Country"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-earth-americas"></i>
              &nbsp;Country
            </label>
          </div>
          <div className="col-12" style={{ fontWeight: "600" }}>
            Password
          </div>
          <div className="form-floating mb-3">
            <input
              value={password}
              onChange={(ev) => SetPassword(ev.target.value)}
              type="password"
              className="form-control"
              id="floatingInput"
              placeholder="Password"
            />
            <label htmlFor="floatingInput">
              <i className="fa-solid fa-lock"></i>&nbsp;Set Password
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              signup();
            }}
            variant="primary"
            style={{ width: "100%", backgroundColor: "#F3912E" }}
          >
            Sign Up
          </Button>
          {/*Adding the loading animation on top of the card  */}
          {loading ? (
            <div className="row">
              <div className="col-md-12">
                {/*Adding spinner code from bootstrap */}
                <div className="spinner-border text-warning" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt-2  d-grid">
            <button
              onClick={handleClose}
              className="custom-btn custom-btn-white"
              style={{ width: "100%", border: "none" }}
            >
              <span className="text-muted fs-6">Already have an account?</span>
              <span style={{ color: "#F3912E" }} onClick={handleShowLogin}>
                Login
              </span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div >
  );
}

export default IntroCard;
