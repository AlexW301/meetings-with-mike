import styles from "../styles/Booked.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";
import Head from "next/head";

const Booked = ({ first, last, email }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Thank You!</title>
        <meta
          name="description"
          content="Book a meeting with Mike Comerford of Premier Mortgage Lending"
        />
        <link rel="icon" href="/images/pmllogo.png" />
      </Head>
      <h1>
        Thank You <br></br> {first} {last}
      </h1>
      <h3>We have recieved your request!</h3>
      <img src="/images/invite.svg" alt="rocket" height={200} />
      <p>
        We will respond to you shortly with an email to confirm your
        appointment. Please make sure to check your email at{" "}
        <span>{email}</span>
      </p>
      <Link href="https://www.pmlhomeloans.com" passHref>
        <a>Visit Our Website</a>
      </Link>
    </div>
  );
};

export default Booked;

export async function getServerSideProps(context) {
  const { first, last, email, phone, meetingOpt, id } = context.query;

  const graphql = JSON.stringify({
    query: `mutation {\r\n  change_multiple_column_values(board_id:2135781119, item_id:${id}, column_values: \"{\\\"text\\\": \\\"${first}\\\", \\\"text6\\\": \\\"${last}\\\", \\\"text3\\\": \\\"${email}\\\", \\\"text9\\\": \\\"${phone}\\\", \\\"text7\\\": \\\"${meetingOpt}\\\", \\\"status\\\": {\\\"label\\\": \\\"Pending\\\"}}\") {\r\n    id\r\n  }\r\n}`,
    variables: {},
  });

  const res = await fetch(`https://api.monday.com/v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.API_KEY,
    },
    body: graphql,
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
    });

  console.log(first);
  return {
    props: {
      first,
      last,
      email,
    },
  };
}
