

import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');

  const baseUrl = process.env.REACT_APP_BACKEND_URL

  const addCourse = async () => {
    const newCourse = { name: courseTitle, code: courseCode, description: courseDescription };
    console.log(baseUrl, "good")
    const response = await axios.post(`${baseUrl}/api/course/`, newCourse);
    setCourseTitle('');
    setCourseCode('');
    setCourseDescription('')
  };

  const searchCourseList = async () => {
    const response = await axios.get(`${baseUrl}/api/course/`);
    setCourses(response.data.data)
    console.log(response.data.data)
  }

  const searchInstanceList = async () => {
    const response = await axios.get(`${baseUrl}/api/instance/`);
    setInstances(response.data.data)
    console.log(response.data.data)
  }

  const addInstance = async () => {
    const courseCode = courses.filter(course => course.name === selectedCourse);
    const newInstance = { name: selectedCourse, year: year, semester: semester, code: courseCode[0].code };
    const response = await axios.post(`${baseUrl}/api/instance/`, newInstance);
    setYear('')
    setSelectedCourse('')
    setSemester('')
    console.log(response)
  };

  const deleteCourse = async (code, id) => {
    setCourses(courses.filter(course => course.code !== code));
    const response = await axios.delete(`${baseUrl}/api/course/${id}`);
  };

  const deleteInstance = async (index, id) => {
    setInstances(instances.filter((_, i) => i !== index));
    const response = await axios.delete(`${baseUrl}/api/instance/${id}`);
  };

  return (
    <div className="App">
      <div className="add-course">
        <h3>Add Course</h3>
        <input
          type="text"
          placeholder="Course title"
          value={courseTitle}
          onChange={e => setCourseTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course code"
          value={courseCode}
          onChange={e => setCourseCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Course description"
          value={courseDescription}
          onChange={e => setCourseDescription(e.target.value)}
        />
        <button onClick={addCourse}>Add course</button>
      </div>

      <div className="add-instance">
        <h3>Add Instance</h3>
        <select onChange={e => setSelectedCourse(e.target.value)} value={selectedCourse}>
          <option value="">Select course</option>
          {courses.map(course => (
            <option key={course.code} value={course.name}>{course.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Year"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={e => setSemester(e.target.value)}
        />
        <button onClick={addInstance}>Add instance</button>
      </div>

      <div className="list-courses">
        <h3>Courses</h3>
        <button onClick={searchCourseList}>List courses</button>
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.code}>
                <td>{course.name}</td>
                <td>{course.code}</td>
                <td>
                  <button onClick={() => { }}>🔍</button>
                  <button onClick={() => deleteCourse(course.code, course.id)} style={{ color: 'black' }}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="list-instances">
        <h3>Course Instances</h3>
        <button onClick={searchInstanceList}>List instances</button>
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Year-Sem</th>
              <th>Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {instances.map((instance, index) => (
              <tr key={index}>
                <td>{courses.find(course => course.code === instance.code)?.name}</td>
                <td>{instance.year}-{instance.semester}</td>
                <td>{instance.code}</td>
                <td>
                  <button onClick={() => { }}>🔍</button>
                  <button onClick={() => deleteInstance(index, instance.id)} style={{ color: 'black' }}>🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default App;