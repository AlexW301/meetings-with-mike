import styles from "../styles/MeetingItem.module.scss";
import convertTime from "convert-time";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";


const MeetingItem = ({ name, date, status }) => {
  const dateArr = date.split(" ");
  const fullDate = dateArr[0];
  const time = dateArr[1];
  console.log(date);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
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
      <p className={status === 'Available' ? styles.statusAvailable : styles.status}>{status}</p>
    </div>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{name}</Modal.Title>
    </Modal.Header>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={handleClose}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  </>
  );
};

export default MeetingItem;
