import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import User from "./User";

export default function App() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people/")
      .then((res) => res.json())
      .then((data) => {
        setPeople(data.results);
      });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {people.map((person) => (
                <div key={person.uid}>
                  <Link to={`/user/${person.uid}`}>
                    <h5>{person.name}</h5>
                  </Link>
                </div>
              ))}
            </div>
          }
        />
        <Route path="/user/:uid" element={<User />} />
      </Routes>
    </div>
  );
}
