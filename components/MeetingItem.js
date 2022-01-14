import styles from "../styles/MeetingItem.module.scss";
import convertTime from "convert-time";
import { Modal, Toast } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const MeetingItem = ({ name, date, status, id, options }) => {
  const dateArr = date.split(" ");
  const fullDate = dateArr[0];
  const time = dateArr[1];

  const [toastText, setToastText] = useState("");

  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);

  const closeShowA = () => {
    setShowA(false);
  };

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [meetingOpt, setMeetingOpt] = useState(null)

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

  const handleBooking = async (e) => {
    e.preventDefault();
    if (first !== "" && last !== "" && email !== "" && phone.length >= 10 && meetingOpt !== null) {
      setShow(false);
      router.push({
        pathname: "/booked",
        query: {
          first,
          last,
          email,
          phone,
          meetingOpt,
          id,
        },
      });
    } else if (phone.length < 10) {
      setToastText("Please Enter a valid phone number");
      setShowA(true);
      setTimeout(() => {
        setShowA(false);
      }, 5000);
    } else if (meetingOpt === null) {
      setToastText("Please select your prefered method of contact");
      setShowA(true);
      setTimeout(() => {
        setShowA(false);
      }, 5000);
    } else {
      setToastText("Please fill out all the required fields");
      setShowA(true);
      setTimeout(() => {
        setShowA(false);
      }, 5000);
    }
  };
  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShowA(false);
    setShow(false);
  };

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

  // Check which options should be applied
  // Note added the or because sometimes there is a space before the word and sometimes there isn't
  const optionsArr = options ? options.split(",") : null;
  const inPersonOpt = optionsArr
    ? optionsArr.includes(" In Person") || optionsArr.includes("In Person")
    : null;
  const phoneOpt = optionsArr
    ? optionsArr.includes(" Phone") || optionsArr.includes("Phone")
    : null;
  const zoomOpt = optionsArr
    ? optionsArr.includes(" Zoom") || optionsArr.includes("Zoom")
    : null;
  // console.log(options ? options.split(",") : null);

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
          <form className={styles.form} onSubmit={handleBooking}>
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
            {options && (
              <div className={styles.options}>
                <p className={styles.optionsLabel}>
                  Please select prefered contact method
                </p>
                <div className={styles.optionBtns}>
                  {phoneOpt && (
                    <input
                      type={"button"}
                      value={"Phone"}
                      style={meetingOpt === 'Phone' ? {background: '#be2424', color: '#f5fff5'} : {background: '#f5fff5'}}
                      onFocus={() => setMeetingOpt('Phone')}
                      onClick={() => setMeetingOpt('Phone')}
                      className={styles.optionBtn}
                    />
                  )}
                  {zoomOpt && (
                    <input
                      type={"button"}
                      value={"Zoom"}
                      style={meetingOpt === 'Zoom' ? {background: '#be2424', color: '#f5fff5'} : {background: '#f5fff5'}}
                      onFocus={() => setMeetingOpt('Zoom')}
                      onClick={() => setMeetingOpt('Zoom')}
                      className={styles.optionBtn}
                    />
                  )}
                  {inPersonOpt && (
                    <input
                      type={"button"}
                      value={"In Person"}
                      style={meetingOpt === 'In Person' ? {background: '#be2424', color: '#f5fff5'} : {background: '#f5fff5'}}
                      onFocus={() => setMeetingOpt('In Person')}
                      onClick={() => setMeetingOpt('In Person')}
                      className={styles.optionBtn}
                    />
                  )}
                </div>
              </div>
            )}
            <Modal.Footer className={styles.modalFooter}>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={handleClose}
              >
                Cancel
              </button>
              <input type="submit" className={styles.bookBtn} value="Book" />
            </Modal.Footer>
          </form>
        </Modal.Body>
        <Toast show={showA} onClose={closeShowA} className={styles.toast}>
          <Toast.Header>
            <strong className="me-auto">Woops!</strong>
            <small>now</small>
          </Toast.Header>
          <Toast.Body className={styles.toastBody}>{toastText}</Toast.Body>
        </Toast>
      </Modal>
    </>
  );
};

export default MeetingItem;
