import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta
          name="Meetup Description"
          content={props.meetupData.description}
        />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

/*

 ? If a page has Dynamic Routes, ie pages with [someId].js, and uses getStaticProps, it needs to define a list of paths to be statically generated.
 It has to pre-render all possible pages for the dynamic route IDs. For that we use getStaticPaths
 # When you export getStaticPaths (alongside Static Site Generation) from a page that uses dynamic routes,
 # Next.js will statically pre-render all the paths specified by getStaticPaths.
 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths#when-should-i-use-getstaticpaths

 */

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://srivishp:Mongo123@cluster0.ttaoxto.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups-collection");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // * fallback is used to indicate if all supported meetupId values are listed (true) or not (false)
    // ? So, if user enters a path that is not supported, they would see a 404 error
    // # If set to true or blocking, then new meetupIds will be dynamically created and added to the list
    // true will show empty page but blocking will not show anything until the page is pre-rendered
    fallback: "blocking",
    // paths key must contain one object per version of the dynamic page
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // * This console log only shows in the terminal of dev server and not the browser console
  // * as it is running during build time
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://srivishp:Mongo123@cluster0.ttaoxto.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups-collection");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.data.title,
        address: selectedMeetup.data.address,
        image: selectedMeetup.data.image,
        description: selectedMeetup.data.description,
      },
    },
  };
}

export default MeetupDetails;
