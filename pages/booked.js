
const Booked = ({first, last, email}) => {
    return (
        <div>
            Thank you {first} {last} for requesting a meeting
            check your email for confirmation {email}
        </div>
    )
}

export default Booked;

export async function getServerSideProps(context) {
    const {first, last, email, id} = context.query
    
    const graphql = JSON.stringify({
        query: `mutation {\r\n  change_multiple_column_values(board_id:2135781119, item_id:${id}, column_values: \"{\\\"text\\\": \\\"${first}\\\", \\\"text6\\\": \\\"${last}\\\", \\\"text3\\\": \\\"${email}\\\", \\\"status\\\": {\\\"label\\\": \\\"Pending\\\"}}\") {\r\n    id\r\n  }\r\n}`,
        variables: {}
      })
  
      const res = await fetch(`https://api.monday.com/v2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.API_KEY,
      },
      body: graphql
    }).then(response => response.json())
      .then(json => {console.log(json)})

    console.log(first)
    return {
        props: {
            first,
            last,
            email
        }
    }
}