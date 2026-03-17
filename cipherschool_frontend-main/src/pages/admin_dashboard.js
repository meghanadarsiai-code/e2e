import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiService } from "../utils/api";
import { clearAuth, getUser, isAuthenticated } from "../utils/auth";
import "./admin_dashboard.css";

const initialCourseForm = {
  title: "",
  description: "",
  category: "",
  level: "Beginner",
  duration: "4 weeks",
  instructor: "",
  thumbnail: "",
};

const initialTestForm = {
  title: "",
  difficulty: "Easy",
  duration: "30 Mins",
  question: "",
  options: ["", "", "", ""],
  answer: "",
};

const initialAssignmentForm = {
  title: "",
  topic: "",
  difficulty: "Easy",
  description: "",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tests, setTests] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [courseForm, setCourseForm] = useState(initialCourseForm);
  const [testForm, setTestForm] = useState(initialTestForm);
  const [assignmentForm, setAssignmentForm] = useState(initialAssignmentForm);

  const [usersQuery, setUsersQuery] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingTestId, setEditingTestId] = useState(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState(null);

  const [courseDraft, setCourseDraft] = useState({});
  const [testDraft, setTestDraft] = useState({});
  const [assignmentDraft, setAssignmentDraft] = useState({});
  const [issuingForUserId, setIssuingForUserId] = useState(null);

  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const user = useMemo(() => getUser(), []);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [usersRes, coursesRes, testsRes, assignmentsRes] = await Promise.all([
        apiService.users.all(),
        apiService.courses.list(),
        apiService.tests.list(),
        apiService.assignments.list(),
      ]);

      setUsers(usersRes.data || []);
      setCourses(coursesRes.data || []);
      setTests(testsRes.data || []);
      setAssignments(assignmentsRes.data || []);
      setLastSyncedAt(new Date());
    } catch (error) {
      Swal.fire(
        "Load failed",
        error.response?.data?.error || "Unable to fetch admin dashboard data",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const loadUsers = useCallback(async () => {
    try {
      const usersRes = await apiService.users.all();
      setUsers(usersRes.data || []);
      setLastSyncedAt(new Date());
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated() || user?.role !== "admin") {
      navigate("/home");
      return;
    }

    loadAllData();
  }, [navigate, user?.role, loadAllData]);

  useEffect(() => {
    if (activeTab !== "users") return;
    const interval = setInterval(loadUsers, 10000);
    return () => clearInterval(interval);
  }, [activeTab, loadUsers]);

  const onLogout = () => {
    clearAuth();
    navigate("/home");
  };

  const deleteEntity = async (type, id) => {
    const result = await Swal.fire({
      title: "Delete item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#d33",
    });

    if (!result.isConfirmed) return;

    try {
      if (type === "course") await apiService.courses.remove(id);
      if (type === "test") await apiService.tests.remove(id);
      if (type === "assignment") await apiService.assignments.remove(id);
      await loadAllData();
      Swal.fire("Deleted", "Item deleted successfully", "success");
    } catch (error) {
      Swal.fire("Delete failed", error.response?.data?.error || "Please try again", "error");
    }
  };

  const createCourse = async (event) => {
    event.preventDefault();
    try {
      await apiService.courses.create(courseForm);
      setCourseForm(initialCourseForm);
      await loadAllData();
      Swal.fire("Created", "Course created successfully", "success");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to create course", "error");
    }
  };

  const createTest = async (event) => {
    event.preventDefault();

    const hasEmptyOption = testForm.options.some((option) => !option.trim());
    if (!testForm.question.trim() || hasEmptyOption || !testForm.answer.trim()) {
      Swal.fire("Incomplete", "Please complete all test question fields", "warning");
      return;
    }

    const payload = {
      title: testForm.title,
      difficulty: testForm.difficulty,
      duration: testForm.duration,
      questions: [
        {
          question: testForm.question,
          options: testForm.options,
          answer: testForm.answer,
        },
      ],
    };

    try {
      await apiService.tests.create(payload);
      setTestForm(initialTestForm);
      await loadAllData();
      Swal.fire("Created", "Test created successfully", "success");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to create test", "error");
    }
  };

  const createAssignment = async (event) => {
    event.preventDefault();
    try {
      await apiService.assignments.create(assignmentForm);
      setAssignmentForm(initialAssignmentForm);
      await loadAllData();
      Swal.fire("Created", "Assignment created successfully", "success");
    } catch (error) {
      Swal.fire(
        "Failed",
        error.response?.data?.error || "Unable to create assignment",
        "error"
      );
    }
  };

  const saveCourseEdit = async (id) => {
    try {
      await apiService.courses.update(id, courseDraft);
      setEditingCourseId(null);
      setCourseDraft({});
      await loadAllData();
      Swal.fire("Updated", "Course updated", "success");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to update course", "error");
    }
  };

  const saveTestEdit = async (id) => {
    try {
      await apiService.tests.update(id, {
        title: testDraft.title,
        difficulty: testDraft.difficulty,
        duration: testDraft.duration,
      });
      setEditingTestId(null);
      setTestDraft({});
      await loadAllData();
      Swal.fire("Updated", "Test updated", "success");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to update test", "error");
    }
  };

  const saveAssignmentEdit = async (id) => {
    try {
      await apiService.assignments.update(id, assignmentDraft);
      setEditingAssignmentId(null);
      setAssignmentDraft({});
      await loadAllData();
      Swal.fire("Updated", "Assignment updated", "success");
    } catch (error) {
      Swal.fire("Failed", error.response?.data?.error || "Unable to update assignment", "error");
    }
  };

  const issueCertificate = async (targetUser) => {
    if (!targetUser?._id) return;

    // Filter courses the user is enrolled in
    const enrolledCourses = courses.filter(
      (course) => course.enrolledUsers && course.enrolledUsers.includes(targetUser._id)
    );

    if (enrolledCourses.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Not Enrolled",
        text: `${targetUser.fullName || targetUser.email} is not registered in any published courses.`,
      });
      return;
    }

    // Build options for sweetalert
    const inputOptions = {};
    enrolledCourses.forEach((course) => {
      inputOptions[course.title] = course.title; // Using title as the value
    });

    const { value: courseName } = await Swal.fire({
      title: "Issue Certificate",
      input: "select",
      inputOptions,
      inputLabel: `Select a registered course for ${targetUser.fullName || targetUser.email}`,
      inputPlaceholder: "Choose a course",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "You need to select a course!";
      }
    });

    if (!courseName) return;

    setIssuingForUserId(targetUser._id);
    try {
      await apiService.certificates.issue(targetUser._id, {
        course: courseName,
      });
      Swal.fire("Issued", `Certificate issued to ${targetUser.fullName || targetUser.email} for ${courseName}`, "success");
    } catch (error) {
      const data = error.response?.data;
      const eligibility = data?.eligibility;
      const extra = eligibility
        ? `\nEnrolled Courses: ${eligibility.enrolledCoursesCount} | Passed Tests: ${eligibility.passedTestsCount}/${eligibility.totalTests}`
        : "";
      Swal.fire(
        "Cannot issue",
        `${data?.error || "User is not eligible yet"}${extra}`,
        "warning"
      );
    } finally {
      setIssuingForUserId(null);
    }
  };

  const stats = [
    { label: "Users", value: users.length, icon: "👥" },
    { label: "Courses", value: courses.length, icon: "📚" },
    { label: "Tests", value: tests.length, icon: "🧪" },
    { label: "Assignments", value: assignments.length, icon: "🧩" },
  ];

  const filteredUsers = users.filter((item) => {
    const key = usersQuery.trim().toLowerCase();
    if (!key) return true;
    return (
      (item.fullName || "").toLowerCase().includes(key) ||
      (item.email || "").toLowerCase().includes(key) ||
      (item.country || "").toLowerCase().includes(key)
    );
  });

  if (!isAuthenticated() || user?.role !== "admin") return null;

  return (
    <div className="admin-dashboard gfg-container mt-4">
      <div className="admin-header-card mb-3">
        <div>
          <p className="admin-eyebrow">Control Center</p>
          <h2 className="gfg-header mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Manage users and content with live sync. User profile updates appear here automatically.
          </p>
          <small className="text-muted">
            Last sync: {lastSyncedAt ? lastSyncedAt.toLocaleTimeString() : "-"}
          </small>
        </div>
        <div className="d-flex gap-2 align-items-center">
          <button className="btn btn-outline-dark" onClick={loadAllData}>
            Refresh
          </button>
          <button className="btn btn-outline-danger" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="admin-tabs mb-3">
        {[
          { id: "overview", label: "Overview" },
          { id: "users", label: "Users" },
          { id: "courses", label: "Courses" },
          { id: "tests", label: "Tests" },
          { id: "assignments", label: "Assignments" },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`btn ${activeTab === tab.id ? "btn-dark" : "btn-light border"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-warning" role="status" />
        </div>
      ) : (
        <>
          {activeTab === "overview" && (
            <section className="admin-panel">
              <h5 className="mb-3">Platform Summary</h5>
              <div className="admin-stats-grid">
                {stats.map((item) => (
                  <article key={item.label}>
                    <h3>{item.icon} {item.value}</h3>
                    <p>{item.label}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeTab === "users" && (
            <section className="admin-panel">
              <div className="d-flex justify-content-between align-items-center mb-3 gap-2 flex-wrap">
                <h5 className="m-0">Registered Users</h5>
                <input
                  className="form-control"
                  placeholder="Search users by name/email/country"
                  style={{ maxWidth: "340px" }}
                  value={usersQuery}
                  onChange={(e) => setUsersQuery(e.target.value)}
                />
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Country</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((item) => (
                      <tr key={item._id}>
                        <td>{item.fullName || "-"}</td>
                        <td>{item.email}</td>
                        <td>
                          <span className={`badge ${item.role === "admin" ? "bg-danger" : "bg-primary"}`}>
                            {item.role || "student"}
                          </span>
                        </td>
                        <td>{item.country || "-"}</td>
                        <td className="text-end">
                          {item.role !== "admin" ? (
                            <button
                              className="btn btn-sm btn-outline-success"
                              disabled={issuingForUserId === item._id}
                              onClick={() => issueCertificate(item)}
                            >
                              {issuingForUserId === item._id ? "Issuing..." : "Issue Certificate"}
                            </button>
                          ) : (
                            <span className="text-muted small">Admin</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!filteredUsers.length && (
                      <tr>
                        <td colSpan={5} className="text-center text-muted py-4">
                          No matching users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === "courses" && (
            <section className="admin-panel">
              <div className="row g-3">
                <div className="col-lg-5">
                  <h5 className="mb-3">Create Course</h5>
                  <form className="d-grid gap-2" onSubmit={createCourse}>
                    <input className="form-control" placeholder="Title" required value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
                    <textarea className="form-control" rows={2} placeholder="Description" required value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
                    <input className="form-control" placeholder="Category" required value={courseForm.category} onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })} />
                    <div className="row g-2">
                      <div className="col-6">
                        <select className="form-select" value={courseForm.level} onChange={(e) => setCourseForm({ ...courseForm, level: e.target.value })}>
                          <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
                        </select>
                      </div>
                      <div className="col-6"><input className="form-control" placeholder="Duration" value={courseForm.duration} onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })} /></div>
                    </div>
                    <input className="form-control" placeholder="Instructor" value={courseForm.instructor} onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })} />
                    <input className="form-control" placeholder="Thumbnail URL" value={courseForm.thumbnail} onChange={(e) => setCourseForm({ ...courseForm, thumbnail: e.target.value })} />
                    <button className="gfg-btn-primary" type="submit">Create Course</button>
                  </form>
                </div>

                <div className="col-lg-7">
                  <h5 className="mb-3">Published Courses</h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light"><tr><th>Title</th><th>Category</th><th>Level</th><th className="text-end">Action</th></tr></thead>
                      <tbody>
                        {courses.map((item) => (
                          <tr key={item._id}>
                            <td>
                              {editingCourseId === item._id ? (
                                <input className="form-control form-control-sm" value={courseDraft.title || ""} onChange={(e) => setCourseDraft({ ...courseDraft, title: e.target.value })} />
                              ) : item.title}
                            </td>
                            <td>
                              {editingCourseId === item._id ? (
                                <input className="form-control form-control-sm" value={courseDraft.category || ""} onChange={(e) => setCourseDraft({ ...courseDraft, category: e.target.value })} />
                              ) : item.category}
                            </td>
                            <td>
                              {editingCourseId === item._id ? (
                                <select className="form-select form-select-sm" value={courseDraft.level || "Beginner"} onChange={(e) => setCourseDraft({ ...courseDraft, level: e.target.value })}><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select>
                              ) : item.level}
                            </td>
                            <td className="text-end d-flex justify-content-end gap-2">
                              {editingCourseId === item._id ? (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => saveCourseEdit(item._id)}>Save</button>
                                  <button className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingCourseId(null); setCourseDraft({}); }}>Cancel</button>
                                </>
                              ) : (
                                <button className="btn btn-sm btn-outline-dark" onClick={() => { setEditingCourseId(item._id); setCourseDraft(item); }}>Edit</button>
                              )}
                              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEntity("course", item._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "tests" && (
            <section className="admin-panel">
              <div className="row g-3">
                <div className="col-lg-5">
                  <h5 className="mb-3">Create Test</h5>
                  <form className="d-grid gap-2" onSubmit={createTest}>
                    <input className="form-control" placeholder="Title" required value={testForm.title} onChange={(e) => setTestForm({ ...testForm, title: e.target.value })} />
                    <div className="row g-2">
                      <div className="col-6"><select className="form-select" value={testForm.difficulty} onChange={(e) => setTestForm({ ...testForm, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
                      <div className="col-6"><input className="form-control" placeholder="Duration" required value={testForm.duration} onChange={(e) => setTestForm({ ...testForm, duration: e.target.value })} /></div>
                    </div>
                    <input className="form-control" placeholder="Question" required value={testForm.question} onChange={(e) => setTestForm({ ...testForm, question: e.target.value })} />
                    {testForm.options.map((option, index) => (
                      <input key={index} className="form-control" placeholder={`Option ${index + 1}`} required value={option} onChange={(e) => { const nextOptions = [...testForm.options]; nextOptions[index] = e.target.value; setTestForm({ ...testForm, options: nextOptions }); }} />
                    ))}
                    <input className="form-control" placeholder="Correct answer" required value={testForm.answer} onChange={(e) => setTestForm({ ...testForm, answer: e.target.value })} />
                    <button className="gfg-btn-primary" type="submit">Create Test</button>
                  </form>
                </div>

                <div className="col-lg-7">
                  <h5 className="mb-3">Published Tests</h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light"><tr><th>Title</th><th>Difficulty</th><th>Duration</th><th className="text-end">Action</th></tr></thead>
                      <tbody>
                        {tests.map((item) => (
                          <tr key={item._id}>
                            <td>{editingTestId === item._id ? <input className="form-control form-control-sm" value={testDraft.title || ""} onChange={(e) => setTestDraft({ ...testDraft, title: e.target.value })} /> : item.title}</td>
                            <td>{editingTestId === item._id ? <select className="form-select form-select-sm" value={testDraft.difficulty || "Easy"} onChange={(e) => setTestDraft({ ...testDraft, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select> : item.difficulty}</td>
                            <td>{editingTestId === item._id ? <input className="form-control form-control-sm" value={testDraft.duration || ""} onChange={(e) => setTestDraft({ ...testDraft, duration: e.target.value })} /> : item.duration}</td>
                            <td className="text-end d-flex justify-content-end gap-2">
                              {editingTestId === item._id ? (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => saveTestEdit(item._id)}>Save</button>
                                  <button className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingTestId(null); setTestDraft({}); }}>Cancel</button>
                                </>
                              ) : (
                                <button className="btn btn-sm btn-outline-dark" onClick={() => { setEditingTestId(item._id); setTestDraft(item); }}>Edit</button>
                              )}
                              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEntity("test", item._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "assignments" && (
            <section className="admin-panel">
              <div className="row g-3">
                <div className="col-lg-5">
                  <h5 className="mb-3">Create Assignment</h5>
                  <form className="d-grid gap-2" onSubmit={createAssignment}>
                    <input className="form-control" placeholder="Title" required value={assignmentForm.title} onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })} />
                    <input className="form-control" placeholder="Topic" required value={assignmentForm.topic} onChange={(e) => setAssignmentForm({ ...assignmentForm, topic: e.target.value })} />
                    <select className="form-select" value={assignmentForm.difficulty} onChange={(e) => setAssignmentForm({ ...assignmentForm, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select>
                    <textarea className="form-control" rows={2} placeholder="Description" value={assignmentForm.description} onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })} />
                    <button className="gfg-btn-primary" type="submit">Create Assignment</button>
                  </form>
                </div>

                <div className="col-lg-7">
                  <h5 className="mb-3">Assignments</h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="bg-light"><tr><th>Title</th><th>Topic</th><th>Difficulty</th><th className="text-end">Action</th></tr></thead>
                      <tbody>
                        {assignments.map((item) => (
                          <tr key={item._id}>
                            <td>{editingAssignmentId === item._id ? <input className="form-control form-control-sm" value={assignmentDraft.title || ""} onChange={(e) => setAssignmentDraft({ ...assignmentDraft, title: e.target.value })} /> : item.title}</td>
                            <td>{editingAssignmentId === item._id ? <input className="form-control form-control-sm" value={assignmentDraft.topic || ""} onChange={(e) => setAssignmentDraft({ ...assignmentDraft, topic: e.target.value })} /> : item.topic}</td>
                            <td>{editingAssignmentId === item._id ? <select className="form-select form-select-sm" value={assignmentDraft.difficulty || "Easy"} onChange={(e) => setAssignmentDraft({ ...assignmentDraft, difficulty: e.target.value })}><option>Easy</option><option>Medium</option><option>Hard</option></select> : item.difficulty}</td>
                            <td className="text-end d-flex justify-content-end gap-2">
                              {editingAssignmentId === item._id ? (
                                <>
                                  <button className="btn btn-sm btn-success" onClick={() => saveAssignmentEdit(item._id)}>Save</button>
                                  <button className="btn btn-sm btn-outline-secondary" onClick={() => { setEditingAssignmentId(null); setAssignmentDraft({}); }}>Cancel</button>
                                </>
                              ) : (
                                <button className="btn btn-sm btn-outline-dark" onClick={() => { setEditingAssignmentId(item._id); setAssignmentDraft(item); }}>Edit</button>
                              )}
                              <button className="btn btn-sm btn-outline-danger" onClick={() => deleteEntity("assignment", item._id)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
