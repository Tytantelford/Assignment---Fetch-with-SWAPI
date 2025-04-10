import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function User() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [planetName, setPlanetName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.result.properties);
      })
      .catch((err) => {
        console.error("Fetch user failed", err);
      });
  }, [uid]);

  function handlePlanetClick() {
    setLoading(true);
    fetch(user.homeworld)
      .then((res) => res.json())
      .then((data) => {
        setPlanetName(data.result.properties.name);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Planet fetch failed", err);
        setLoading(false);
      });
  }

  if (!user) return <h3>Loading user...</h3>;

  return (
    <div>
      <h2>{user.name}</h2>
      {planetName ? (
        <p>Home planet: {planetName}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={handlePlanetClick}>Click for home planet</button>
      )}
    </div>
  );
}
