import MeetupList from "@/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A First Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
    address: "Some address, some city etc etc...",
    description: "This is the first meetup!",
  },

  {
    id: "m2",
    title: "A Second Meetup",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg/800px-Lady_Liberty_under_a_blue_sky_%28cropped%29.jpg",
    address: "Some address, some city etc etc...",
    description: "This is the second meetup!",
  },
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// * Static Site Generation (SSG)
// getStaticProps works only in 'pages' components
// It will pre-render the content using props, which helps in SEO
// Loads data before component is executed, so that it will get rendered with the required data

// ! This code will not execute on either server or client. It will get executed during build process.

export async function getStaticProps() {
  // todo: Can write any code here (connecting to DB, accessing file systems).
  // must ALWAYS return an object
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },

    // * Incremental static generation with 'revalidate'
    // Waits a given number of seconds before pre rendering page again
    // Users will not see outdated content this way
    revalidate: 10,
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
//   // todo: Can write any code here (connecting to DB, accessing file systems).
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
