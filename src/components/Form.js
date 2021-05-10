// dependencies
import { useState } from "react";

// components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// styles and utils
import { dateInFuture } from "../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import { COLORS, INVERSECOLORS } from "../utils/constants";
import CssBaseline from "@material-ui/core/CssBaseline";

// style
const useStyles = makeStyles((theme) => ({
  root: {
    margin: 4,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  btn: {
    margin: theme.spacing(3, 1, 2),
    width: "40%",
    background: (props) => props.color,
    color: (props) => INVERSECOLORS[props.color],
  },
}));

const Form = ({ userDetails, updateDetails, onCancel }) => {
  const classes = useStyles(userDetails);

  // user Details
  const [details, setDetails] = useState(userDetails);

  // error message to show after form validation
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    color: "",
    date: "",
  });

  // a boolean check to see if all the form fields are valid
  const [validity, setValidity] = useState({
    name: true,
    color: true,
    date: true,
  });

  // validation function for all the form fields
  const validateField = (fieldName) => {
    switch (fieldName) {
      case "name":
        // check if name is empty
        if (details[fieldName].trim() === "") {
          setErrorMessage({
            ...errorMessage,
            [fieldName]: "Name cannot be empty",
          });
          setValidity({ ...validity, [fieldName]: false });

          // check if name only contains letters and no numbers
          // sources https://www.w3resource.com/javascript/form/all-letters-field.php#:~:text=To%20get%20a%20string%20contains,expression%20against%20the%20input%20value.
          // https://stackoverflow.com/questions/6623231/remove-all-white-spaces-from-text
        } else if (!details[fieldName].replace(/ /g, "").match(/^[A-Za-z]+$/)) {
          setErrorMessage({
            ...errorMessage,
            [fieldName]: "Name can only contain letters",
          });
          setValidity({ ...validity, [fieldName]: false });
        } else {
          setErrorMessage({ ...errorMessage, [fieldName]: "" });
          setValidity({ ...validity, [fieldName]: true });
        }
        break;
      case "date":
        const dateValue = new Date(details.date);
        // check if date is a valid date
        if (dateValue !== "Invalid Date" && !isNaN(dateValue)) {
          const today = new Date();
          // check if date is in future
          // because a birthday can't be in future
          if (dateInFuture(today, dateValue)) {
            setErrorMessage({
              ...errorMessage,
              [fieldName]: "Please enter/select a date from the past",
            });
            setValidity({ ...validity, [fieldName]: false });
          } else {
            setErrorMessage({ ...errorMessage, [fieldName]: "" });
            setValidity({ ...validity, [fieldName]: true });
          }
        } else {
          setErrorMessage({
            ...errorMessage,
            [fieldName]: "Please enter/select a valid date",
          });
          setValidity({ ...validity, [fieldName]: false });
        }
        break;

      default:
        break;
    }
  };

  // update value of form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
  };

  // check if all form fields are valid
  // and then update the details in profile
  const handleSubmit = (event) => {
    event.preventDefault();

    // validate all fields
    for (let key in details) {
      validateField(key);
    }

    // check if all fields are valid
    for (let key in details) {
      if (!validity[key]) return;
    }

    // update details
    updateDetails(details);
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Enter details
          </Typography>
          <form className={classes.form}>
            {/* Name */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handleChange}
              value={details.name}
              onBlur={() => validateField("name")}
              helperText={errorMessage.name}
              error={!validity.name}
            />

            {/* Birthday */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="date"
              label="Birthday"
              name="date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              value={details.date}
              onBlur={() => validateField("date")}
              helperText={errorMessage.date}
              error={!validity.date}
            />

            {/* Color Input */}
            <FormControl
              margin="normal"
              required
              fullWidth
              className={classes.formControl}
            >
              <InputLabel id="color-label">Color</InputLabel>
              <Select
                labelId="color-label"
                id="color"
                name="color"
                onChange={handleChange}
                value={details.color}
              >
                {COLORS.map((color) => (
                  <MenuItem key={color} value={color}>
                    {color.toUpperCase()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Buttons */}
            <Button
              color="secondary"
              className={classes.btn}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default Form;
