// dependencies
import { useEffect, useState } from "react";

// components
import Form from "./components/Form";
import Profile from "./components/Profile";

// utils
import { isBirthdayCheck } from "./utils/helpers";
import { useDidUpdateEffect } from "./utils/customHooks";

function App() {
  const [details, setDetails] = useState({
    name: "",
    color: "white",
    date: "",
  });
  const [editState, setEditState] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);

  // update the user details state and disable edit state
  const updateDetails = (details) => {
    setDetails(details);
    setEditState(false);
  };

  // update if it is birthday of the user
  useEffect(() => {
    if (isBirthdayCheck(new Date(details.date))) {
      setIsBirthday(true);
    } else {
      setIsBirthday(false);
    }
  }, [details.date]);

  // Store state to local storage
  // source https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
  useDidUpdateEffect(() => {
    localStorage.setItem("details", JSON.stringify(details));
  }, [details]);

  // Retrieve State from local storage and update state
  useEffect(() => {
    const retrievedDetails = localStorage.getItem("details");
    if (retrievedDetails) {
      setDetails(JSON.parse(retrievedDetails));
    }
  }, []);

  return (
    <>
      {details.name === "" || editState ? (
        <Form
          updateDetails={updateDetails}
          userDetails={details}
          onCancel={() => setEditState(false)}
        />
      ) : (
        <Profile
          details={details}
          onEdit={() => setEditState(true)}
          isBirthday={isBirthday}
        />
      )}
    </>
  );
}

export default App;
