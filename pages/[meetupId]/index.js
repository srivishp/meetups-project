import MeetupDetail from "@/components/meetups/MeetupDetail";

function MeetupDetails() {
  return (
    <MeetupDetail
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg"
      title="A First Meetup"
      address="Eiffel Tower, Paris"
      description="Meetup Description"
    />
  );
}

// * If a page has Dynamic Routes, ie pages with [someId].js, and uses getStaticProps, it needs to define a list of paths to be statically generated.
// It has to pre-render all possible pages for the dynamic route IDs. For that we use getStaticPaths
// todo: When you export getStaticPaths (alongside Static Site Generation) from a page that uses dynamic routes,
// todo: Next.js will statically pre-render all the paths specified by getStaticPaths.
// https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-paths#when-should-i-use-getstaticpaths

export async function getStaticPaths() {
  return {
    // fallback is used to indicate if all supported meetupId values are listed (true)
    // or not (false)
    // todo: So, if user enters a path that is not supported, they would see a 404 error
    // todo: If set to true, then new meetupIds will be dynamically created and added to the list
    fallback: false,
    // paths key must contain one object per version of the dynamic page
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  // * This console log only shows in the terminal of dev server and not the browser console
  // * as it is running during build time
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/800px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
        id: "m1",
        title: "A First Meetup",
        address: "Eiffel Tower, Paris",
        description: "Meetup Description",
      },
    },
  };
}

export default MeetupDetails;
