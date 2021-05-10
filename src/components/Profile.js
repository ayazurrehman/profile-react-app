// components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

// styles and utils
import { makeStyles } from "@material-ui/core/styles";
import { INVERSECOLORS } from "../utils/constants";

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    maxWidth: "fit-content",
    margin: "auto",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  btn: {
    background: (props) => props.color,
    color: (props) => INVERSECOLORS[props.color],
  },
}));

const Profile = ({ details, isBirthday, onEdit }) => {
  const classes = useStyles(details);
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          {isBirthday && (
            <Typography variant="h3" component="h2">
              Happy Birthday !!
            </Typography>
          )}
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Name
          </Typography>
          <Typography variant="h5" component="h2">
            {details.name}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Birthday
          </Typography>
          <Typography variant="h5" component="h2">
            {details.date}
          </Typography>

          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Favourite Color
          </Typography>
          <Typography variant="h5" component="h2">
            {details.color}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onEdit()}
            className={classes.btn}
          >
            Edit Details
          </Button>
        </CardActions>
      </Card>

      {/* <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Button onClick={() => onEdit()}>Edit</Button>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            User details
          </Typography>

          <Typography component="h1" variant="h5">
            {details.name}
          </Typography>

          <Typography component="h1" variant="h5">
            {details.date}
          </Typography>

          <Typography component="h1" variant="h5">
            {details.color}
          </Typography>
        </div>
      </Container> */}
    </>
  );
};

export default Profile;
