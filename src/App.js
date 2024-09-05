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

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const user = data.results[0];
    setPerson(user);
    setTitle("My name is");
    setUserValue(`${user.name.first} ${user.name.last}`);
  };

  const handleValue = (e) => {
    if (e.target.dataset.label === "name") {
      setTitle("My name is");
      setUserValue(`${person.name.first} ${person.name.last}`);
    } else if (e.target.dataset.label === "email") {
      setTitle("email");
      setUserValue(person.email);
    } else if (e.target.dataset.label === "age") {
      setTitle("age");
      setUserValue(person.dob.age);
    } else if (e.target.dataset.label === "street") {
      setTitle("street");
      setUserValue(
        `${person.location.street.number} ${person.location.street.name}`
      );
    } else if (e.target.dataset.label === "phone") {
      setTitle("phone");
      setUserValue(person.phone);
    } else if (e.target.dataset.label === "password") {
      setTitle("password");
      setUserValue(person.login.password);
    }
  };

  return (
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
            <button className="icon" data-label="name">
              <img src={womanSvg} alt="user" id="iconImg" />
            </button>
            <button className="icon" data-label="email">
              <img src={mailSvg} alt="mail" id="iconImg" />
            </button>
            <button className="icon" data-label="age">
              <img src={womanAgeSvg} alt="age" id="iconImg" />
            </button>
            <button className="icon" data-label="street">
              <img src={mapSvg} alt="map" id="iconImg" />
            </button>
            <button className="icon" data-label="phone">
              <img src={phoneSvg} alt="phone" id="iconImg" />
            </button>
            <button className="icon" data-label="password">
              <img src={padlockSvg} alt="lock" id="iconImg" />
            </button>
          </div>
          <div className="btn-group">
            <button className="btn" type="button">
              new user
            </button>
            <button className="btn" type="button">
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
              <tr className="body-tr"></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}

export default App;
