



import html5Logo from "../images/html5_logo.png";

function Courses() {
  const defaultCourseImage = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80";
  const defaultInstructorImage = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80";

  return (
    <div className="gfg-container">
      <h2 className="gfg-header" style={{ fontSize: "2.5rem" }}>
        Popular Courses
      </h2>
      <div className="row">
        {[
          {
            title: "Complete Python Tutorial",
            img: "https://w0.peakpx.com/wallpaper/209/515/HD-wallpaper-python-logo-coding-kod-kodlama-code-mobile-lock-programming-thumbnail.jpg",
            videos: 241,
            time: 27.8,
            instructor: "Shreya",
            instructorImg: "https://images.unsplash.com/photo-1665686310934-8fab52b3821b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "JavaScript (ES6)",
            img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/800px-JavaScript-logo.png",
            videos: 241,
            time: 27.8,
            instructor: "Rahul",
            instructorImg: "https://images.unsplash.com/photo-1665686310934-8fab52b3821b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "Cascading Style Sheets",
            img: "https://1000logos.net/wp-content/uploads/2022/02/css-logo.jpg",
            videos: 241,
            time: 27.8,
            instructor: "Abhishek",
            instructorImg: "https://images.unsplash.com/photo-1665686310934-8fab52b3821b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          },
          {
            title: "HTML 5",
            img: html5Logo,
            videos: 241,
            time: 27.8,
            instructor: "Abhijeet",
            instructorImg: "https://images.unsplash.com/photo-1665686310934-8fab52b3821b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          }
        ].map((course, index) => (
          <div className="col-md-3 p-3" key={index}>
            <div className="gfg-card h-100">
              <img
                src={course.img}
                alt={course.title}
                style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "4px" }}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = defaultCourseImage;
                }}
              />
              <div className="mt-3">
                <h5 style={{ fontWeight: "600", color: "var(--gfg-text)" }}>{course.title}</h5>
                <p className="text-muted small">
                  {course.videos} Videos • {course.time} Hours
                </p>
                <div className="d-flex align-items-center mt-2">
                  <img
                    src={course.instructorImg}
                    alt={course.instructor}
                    style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = defaultInstructorImage;
                    }}
                  />
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{course.instructor}</div>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>Instructor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
