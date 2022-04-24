import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <h1>Welcome to</h1>
      <h1>React Calendar</h1>
      <Link to='/calendar'>
        <h3>Go to Calendar page</h3>
      </Link>
    </div>
  );
}

export default App;
