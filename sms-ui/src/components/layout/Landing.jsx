import { makeStyles } from '@material-ui/core/styles';
import "./Landing.css";
import Header from './Header';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    color: '#fff !important',
    alignItems: 'left',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  }
  
}));

const Landing = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
          <div className="landing-background">
            {/* header */}
              <Header isLanding={true}/>
            {/* body */}
            <div>
              <div className="text-welcome">Welcome to</div>
              <div className="text-employee-management">
                SMSWorkPlace
              </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
