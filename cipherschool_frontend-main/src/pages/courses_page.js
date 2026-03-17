   import React, { useEffect, useState } from "react";

function CoursesPage() {

  const defaultCourses = [
    {
      name: "Python",
      gfg: "https://www.geeksforgeeks.org/python-programming-language/",
      w3: "https://www.w3schools.com/python/",
      practice: "https://leetcode.com/problemset/"
    },
    {
      name: "Java",
      gfg: "https://www.geeksforgeeks.org/java/",
      w3: "https://www.w3schools.com/java/",
      practice: "https://leetcode.com/problemset/"
    },
    {
      name: "C",
      gfg: "https://www.geeksforgeeks.org/c-programming-language/",
      w3: "https://www.w3schools.com/c/",
      practice: "https://leetcode.com/problemset/"
    },
    {
      name: "C++",
      gfg: "https://www.geeksforgeeks.org/c-plus-plus/",
      w3: "https://www.w3schools.com/cpp/",
      practice: "https://leetcode.com/problemset/"
    },
    {
      name: "JavaScript",
      gfg: "https://www.geeksforgeeks.org/javascript/",
      w3: "https://www.w3schools.com/js/",
      practice: "https://leetcode.com/problemset/"
    },
    {
      name: "HTML",
      gfg: "https://www.geeksforgeeks.org/html/",
      w3: "https://www.w3schools.com/html/",
      practice: "https://leetcode.com/problemset/"
    }
  ];

  const [enrolled, setEnrolled] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
    setEnrolled(saved);
  }, []);

  const enrollCourse = (course) => {

    const updated = [...enrolled, course];

    setEnrolled(updated);

    localStorage.setItem("enrolledCourses", JSON.stringify(updated));
  };

  const isEnrolled = (courseName) => {
    return enrolled.some((c) => c.name === courseName);
  };

  return (
    <div className="container mt-5">

      <h2>Available Courses</h2>

      {defaultCourses.map((course, index) => (

        <div key={index} className="card p-3 mt-3">

          <h4>{course.name}</h4>

          {isEnrolled(course.name) ? (
            <button className="btn btn-success" disabled>
              Enrolled
            </button>
          ) : (
            <button
              className="btn btn-dark"
              onClick={() => enrollCourse(course)}
            >
              Enroll
            </button>
          )}

        </div>

      ))}

      <hr className="mt-5"/>

      <h3>My Enrolled Courses</h3>

      {enrolled.length === 0 && (
        <p>No courses enrolled yet.</p>
      )}

      {enrolled.map((course, index) => (

        <div key={index} className="card p-3 mt-3">

          <h4>{course.name}</h4>

          <div className="d-flex gap-3">

            <a
              href={course.gfg}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
            >
              Learn (GFG)
            </a>

            <a
              href={course.w3}
              target="_blank"
              rel="noreferrer"
              className="btn btn-warning"
            >
              Learn (W3Schools)
            </a>

            <a
              href={course.practice}
              target="_blank"
              rel="noreferrer"
              className="btn btn-dark"
            >
              Practice (LeetCode)
            </a>

          </div>

        </div>

      ))}

    </div>
  );
}

export default CoursesPage;