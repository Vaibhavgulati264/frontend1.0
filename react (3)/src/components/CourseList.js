import React from 'react';

function CourseList({ courses, onDeleteCourse }) {
  return (
    <div className="container">
      <h2>List of Courses</h2>
      <table>
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.title}</td>
              <td>{course.code}</td>
              <td>
                <button onClick={() => onDeleteCourse(index)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseList;