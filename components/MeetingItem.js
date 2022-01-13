import styles from "../styles/MeetingItem.module.scss";
import convertTime from "convert-time";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MeetingItem = ({ name, date, status, id }) => {
  const dateArr = date.split(" ");
  const fullDate = dateArr[0];
  const time = dateArr[1];

  const [show, setShow] = useState(false);

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();

  const startsWithVowel = (vowel) => {
    if (
      vowel[0] === "a" ||
      vowel[0] === "e" ||
      vowel[0] === "i" ||
      vowel[0] === "o" ||
      vowel[0] === "u" ||
      vowel[0] === "A" ||
      vowel[0] === "E" ||
      vowel[0] === "I" ||
      vowel[0] === "O" ||
      vowel[0] === "U"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleClose = () => setShow(false);
  const handleBooking = async (e) => {
    e.preventDefault()
    if (first !== '' && last !== '' && email !== '' && phone.length >= 10) {
      setShow(false);
      router.push({
        pathname: "/booked",
        query: {
          first,
          last,
          email,
          phone,
          id,
        },
      });
    }
  };
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
      <Modal
        fullscreen={"md-down"}
        show={show}
        onHide={handleClose}
        className={styles.modal}
      >
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.modalTitle}>
            {monthName} {day} at {convertTime(`${time}`)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <h2>{name}</h2>
          <p>
            Fill out your information below to request{" "}
            {startsWithVowel(name) ? "an" : "a"} {name} for {monthName} {day} at{" "}
            {convertTime(`${time}`)}
          </p>
          <form className={styles.form}  onSubmit={handleBooking}>
            <label htmlFor="firstName">First Name</label>
            <input
              className={styles.textInput}
              id="firstName"
              type={"text"}
              value={first}
              onChange={(e) => setFirst(e.target.value)}
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              className={styles.textInput}
              id="lastName"
              type={"text"}
              value={last}
              onChange={(e) => setLast(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              className={styles.textInput}
              id="email"
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Phone</label>
            <input
              className={styles.textInput}
              id="phone"
              type={"tel"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Modal.Footer className={styles.modalFooter}>
              <button
                className={styles.closeBtn}
                onClick={handleClose}
              >
                Cancel
              </button>
              <input type='submit' className={styles.bookBtn} value='Book'/>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MeetingItem;
