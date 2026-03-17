import React from "react";
import { useParams } from "react-router-dom";

function CourseMaterials() {
  const { courseName } = useParams();

  const materials = {
    DSA: [
      { name: "GeeksforGeeks DSA", link: "https://www.geeksforgeeks.org/data-structures/" },
      { name: "LeetCode Practice", link: "https://leetcode.com/problemset/" },
      { name: "DSA Roadmap", link: "https://roadmap.sh/dsa" },
    ],

    "Web Development": [
      { name: "W3Schools HTML", link: "https://www.w3schools.com/html/" },
      { name: "CSS Tutorial", link: "https://www.w3schools.com/css/" },
      { name: "JavaScript Guide", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    ],

    "Data Science": [
      { name: "Python Tutorial", link: "https://www.w3schools.com/python/" },
      { name: "Machine Learning Crash Course", link: "https://developers.google.com/machine-learning/crash-course" },
      { name: "Kaggle Learn", link: "https://www.kaggle.com/learn" },
    ],
  };

  const courseLinks = materials[courseName] || [];

  return (
    <div className="container mt-5">
      <h2>{courseName} Study Materials</h2>

      <ul>
        {courseLinks.map((item, index) => (
          <li key={index} style={{ marginTop: "10px" }}>
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseMaterials;