import ReviewSlide from "../components/reviews_slide";

function Review() {
  return (
    <div className="mt-5 mb-5">
      <div className="gfg-card p-5" style={{ backgroundColor: "var(--gfg-header-bg)", color: "white" }}>
        <div className="row align-items-center mb-4">
          <div className="col-md-12">
            <h5 style={{ color: "#F3912E", fontWeight: "700", textTransform: "uppercase" }}>
              Students LIVE Feedback
            </h5>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "700" }}>
              We love to read them
            </h2>
            <p className="lead" style={{ maxWidth: "600px" }}>
              Feedback is a significant component of our success because it
              inspires us to get better and meet the expectations of our students.
            </p>
          </div>
        </div>
        <div className="row">
          <ReviewSlide />
        </div>
      </div>
    </div>
  );
}
export default Review;
