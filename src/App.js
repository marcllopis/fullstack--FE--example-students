import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  let [students, setStudents] = useState([]);
  let [user, setUser] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((response) => response.json())
      .then((data) => setStudents(data));
  }, []);

  const handleForm = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/students", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        user: user,
      }),
    }).then((response) => {
      setUser("");
      if (response.status === 201) {
        fetch("http://localhost:5000/students")
          .then((response) => response.json())
          .then((data) => setStudents(data));
      }
    });
  };

  return (
    <div className="App">
      <h1>WCS students</h1>
      <form onSubmit={handleForm}>
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          placeholder="Student name..."
        />
        <button>Add student</button>
      </form>
      <h3>List of students</h3>
      <ul>
        {students.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
