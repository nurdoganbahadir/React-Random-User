import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [person, setPerson] = useState({});
  const [title, setTitle] = useState("name");
  const [userValue, setUserValue] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const handleAddUser = () => {
    if (person) {
      const isDuplicate = users.some((user) => user.email === person.email);
      if (isDuplicate) {
        alert("Bu kullanıcı zaten daha önce eklenmiş!");
      } else {
        setUsers((prevUsers) => [...prevUsers, person]);
      }
    }
  };

  const getUser = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const user = data.results[0];
    setPerson(user);
    setTitle("My name is");
    setUserValue(`${user.name.first} ${user.name.last}`);
    setLoading(false);
  };

  const handleValue = (e) => {
    const label = e.currentTarget.dataset.label; // dataset'i currentTarget'tan almak
    if (label === "name") {
      setTitle("My name is");
      setUserValue(`${person.name.first} ${person.name.last}`);
    } else if (label === "email") {
      setTitle("My email is");
      setUserValue(person.email);
    } else if (label === "age") {
      setTitle("My age is");
      setUserValue(person.dob.age);
    } else if (label === "street") {
      setTitle("My street is");
      setUserValue(
        `${person.location.street.number} ${person.location.street.name}`
      );
    } else if (label === "phone") {
      setTitle("My phone is");
      setUserValue(person.phone);
    } else if (label === "password") {
      setTitle("My password is");
      setUserValue(person.login.password);
    }
  };

  return (
    <>
      {loading ? (
        <h1 className="load">Loading...</h1>
      ) : (
        <main>
          <div className="block bcg-orange">
            <img src={cwSvg} alt="cw" id="cw" />
          </div>
          <div className="block">
            <div className="container">
              <img
                src={person.picture?.large || defaultImage}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">{title}</p>
              <p className="user-value">{userValue}</p>
              <div className="values-list">
                <button
                  className="icon"
                  data-label="name"
                  onMouseEnter={handleValue}
                >
                  <img src={womanSvg} alt="user" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="email"
                  onMouseEnter={handleValue}
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="age"
                  onMouseEnter={handleValue}
                >
                  <img src={womanAgeSvg} alt="age" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="street"
                  onMouseEnter={handleValue}
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="phone"
                  onMouseEnter={handleValue}
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  className="icon"
                  data-label="password"
                  onMouseEnter={handleValue}
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button className="btn" type="button" onClick={getUser}>
                  new user
                </button>
                <button className="btn" type="button" onClick={handleAddUser}>
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="body-tr">
                      <td>{user.name.first}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.dob.age}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </main>
      )}
    </>
  );
}

export default App;
