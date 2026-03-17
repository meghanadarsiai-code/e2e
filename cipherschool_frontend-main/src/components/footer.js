import "./footer.css";

function Footer() {
  return (
    <footer className="app-footer">
      <div className="gfg-container">
        <div className="footer-grid">
          <div>
            <h4 className="mb-2">CipherSchools</h4>
            <p className="text-muted mb-0">
              Practical learning platform for developers and computer science
              enthusiasts.
            </p>
          </div>
          <div className="text-md-end">
            <small className="text-muted">
              Copyright {new Date().getFullYear()} CipherSchools
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
