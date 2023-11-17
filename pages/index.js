// ? A Smart Next JS feature:
// If an import is used only in server side code (methods like getStaticProps etc...) in nextjs apps, it is only included in the server side bundle and not the client side bundle and vice versa
// This is helpful as it reduces bundle sizes and improves the security in case of server side imports
import { MongoClient } from "mongodb";
import Head from "next/head";
import MeetupList from "@/components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
//     address: "Some address, some city etc etc...",
//     description: "This is the first meetup!",
//   },

//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg/800px-Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg",
//     address: "Some address, some city etc etc...",
//     description: "This is the second meetup!",
//   },
// ];

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="Meetups Project"
          content="Browse a huge list of React Meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

// -> Static Site Generation (SSG)
// getStaticProps works only in 'pages' components
// It will pre-render the content using props, which helps in SEO
// Loads data before component is executed, so that it will get rendered with the required data

// ! This code will not execute on either server or client. It will get executed during build process.

export async function getStaticProps() {
  //  Can write any code here (connecting to DB, accessing file systems).

  const client = await MongoClient.connect(
    "mongodb+srv://srivishp:Mongo123@cluster0.ttaoxto.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups-collection");
  // find() will find all documents by default in a collection

  const meetups = await meetupsCollection.find().toArray();

  client.close();
  // must ALWAYS return an object
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.data.title,
        address: meetup.data.address,
        image: meetup.data.image,
      })),
    },

    // * Incremental static generation with 'revalidate'
    // Waits a given number of seconds before pre rendering page again
    // Users will not see outdated content this way
    revalidate: 1,
  };
}

////////////////////////////////////////////////////////////////////////

// // * Server Side Rendering (SSR)
// // ! ONLY USE IF YOUR PAGE MAKES MULTIPLE REQUESTS PER SECOND
// // getServerSideProps works only in 'pages' components
// // It will run on the server. Useful for updating/fetching data everytime a request is sent.

// // ! This code will always execute on the server.
// // Can perform operations using credentials which cannot be exposed to the user

// export async function getServerSideProps(context) {
//   // context parameter provides us the info about request and response objects
//   // like request headers, body etc...
//   const req = context.req;
//   const res = context.res;
//   // # Can write any code here (connecting to DB, accessing file systems).
//   // must ALWAYS return an object
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },

//     // * Cannot set revalidate as it runs after every incoming request.
//     // revalidate doesn't make sense here
//   };
// }

export default HomePage;
