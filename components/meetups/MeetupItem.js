import { useRouter } from "next/router";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

function MeetupItem(props) {
  // The useRouter hook allows you to programmatically change routes inside components.
  // It is a React hook and must always be used at the root level of a component
  const router = useRouter();

  function showDetailsHandler() {
    //-> Programmatic Navigation with useRouter
    // ? push() method pushes a new page onto a stack of pages

    // Getting the id via props from meetup list
    router.push("/" + props.id);
  }
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
