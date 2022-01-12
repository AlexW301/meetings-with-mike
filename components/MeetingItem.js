import styles from "../styles/MeetingItem.module.scss";
import convertTime from "convert-time";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const MeetingItem = ({ name, date, status, id }) => {
  const dateArr = date.split(" ");
  const fullDate = dateArr[0];
  const time = dateArr[1];

  const [show, setShow] = useState(false);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");

  const handleClose = () => setShow(false);
  const handleBooking = async () => {
    setShow(false)
    console.log(first)
    console.log(last)
    console.log(email)
    console.log(id)

    const graphql = JSON.stringify({
      query: `mutation {\r\n  change_multiple_column_values(board_id:2135781119, item_id:2136719918, column_values: \"{\\\"text\\\": \\\"${first}\\\", \\\"text6\\\": \\\"${last}\\\", \\\"text3\\\": \\\"${email}\\\", \\\"status\\\": {\\\"label\\\": \\\"Pending\\\"}}\") {\r\n    id\r\n  }\r\n}`,
      variables: {}
    })

    const res = await fetch(`https://api.monday.com/v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.API_KEY,
    },
    body: graphql
  });
  const result = await res.json();
  console.log(result)
  }
  const handleShow = () => setShow(true);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = fullDate.split("-")[1];
  const monthNumber = month.indexOf("0") ? month : month[1];
  const monthName = months[monthNumber - 1];
  const day = fullDate.split("-")[2];
  //   console.log(months[monthNumber - 1])

  
  return (
    <>
      <div className={styles.container} onClick={handleShow}>
        <h2 className={styles.date}>
          {monthName} {day} at {convertTime(`${time}`)}
        </h2>
        <h3 className={styles.title}>{name}</h3>
        <p
          className={
            status === "Available" ? styles.statusAvailable : styles.status
          }
        >
          {status}
        </p>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>
            {monthName} {day} at {convertTime(`${time}`)}
          </h2>
          <p>Fill out your information below to book an appointment for {monthName} {day} at {convertTime(`${time}`)}</p>
          <form className={styles.form}>
            <label htmlFor="firstName">First Name</label>
            <input className={styles.textInput} id="firstName" type={"text"} value={first} onChange={(e) => setFirst(e.target.value)} />
            <label htmlFor="lastName">Last Name</label>
            <input className={styles.textInput} id="lastName" type={"text"} value={last} onChange={(e) => setLast(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input className={styles.textInput} id="email" type={"text"} value={email} onChange={(e) => setEmail(e.target.value)} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleBooking}>
            Book
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MeetingItem;
