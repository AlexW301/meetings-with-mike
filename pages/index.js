import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";
import MeetingItem from "../components/MeetingItem";
import { useState } from "react";
import { Carousel, Pagination, Modal, Button } from "react-bootstrap";

export default function Home({ data }) {
  console.log(data);

  const items = data.data.boards[0].items;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const sortedItems = items.sort((a, b) => {
    let dateA = new Date(a.column_values[1].text.split(" ")[0]);
    let dateB = new Date(b.column_values[1].text.split(" ")[0]);
    return dateA - dateB;
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>PML Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sectionOne}>
        <h1 className={styles.header}>Book An Appointment</h1>
      </div>
      <div className={styles.sectionTwo}>
        <h2 className={styles.availableDates}>Available Dates</h2>
        <div className={styles.scrollView}>
          {sortedItems.map((item) => {
            if (item.column_values[0].text === "Available")
            {
              return (
                <div key={item.id} className={styles.container}>
                  <MeetingItem
                    name={item.name}
                    date={item.column_values[1].text}
                    status={item.column_values[0].text}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // const client = new ApolloClient({
  //   uri: `https://api.monday.com/v2`,
  //   cache: new InMemoryCache(),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: process.env.API_KEY,
  //   }
  // })

  // const {data} = await client.query({
  //   query: gql`
  //   query {
  //     boards (ids:2135781119) {
  //       items {
  //         name
  //         id
  //         column_values {
  //           id
  //           text
  //         }
  //       }
  //     }
  //   }
  //   `
  // })

  const graphql = JSON.stringify({
    query:
      "query {\r\n  boards (ids:2135781119) {\r\n    items {\r\n      id\r\n      name\r\n      column_values {\r\n        id\r\n        text\r\n      }\r\n    }\r\n  }\r\n}",
    variables: {},
  });

  const res = await fetch(`https://api.monday.com/v2`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.API_KEY,
    },
    body: graphql,
  });
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
