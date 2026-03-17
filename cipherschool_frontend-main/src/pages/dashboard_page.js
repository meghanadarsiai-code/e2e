import React, { useEffect, useState } from "react";

function DashboardPage() {

  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {

    const enrolled =
      JSON.parse(localStorage.getItem("enrolledCourses")) || [];

    const res =
      JSON.parse(localStorage.getItem("testResults")) || [];

    setCourses(enrolled);
    setResults(res);

  }, []);

  return (

    <div className="container mt-5">

      <h2>Welcome Back</h2>

      <div className="row mt-4">

        <div className="col-md-4">

          <div className="card shadow p-3 text-center">

            <h3>{courses.length}</h3>
            <p>Enrolled Courses</p>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-3 text-center">

            <h3>{courses.length}</h3>
            <p>Available Tests</p>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow p-3 text-center">

            <h3>{results.length}</h3>
            <p>Tests Completed</p>

          </div>

        </div>

      </div>


      <h4 className="mt-5">My Courses</h4>

      {courses.map((c, i) => (

        <div key={i} className="card p-3 mt-2">

          {c.name}

        </div>

      ))}


      <h4 className="mt-5">Recent Results</h4>

      {results.map((r, i) => (

        <div key={i} className="card p-3 mt-2">

          Score: {r.score}% | Date: {r.date}

        </div>

      ))}

    </div>
  );
}

export default DashboardPage;