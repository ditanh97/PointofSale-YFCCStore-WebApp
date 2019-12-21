import { makeStyles, fade } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    cartHeader: {
        paddingLeft: theme.spacing(7),
        paddingRight: theme.spacing(7),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        display: 'flex',
    },
    paper: {
        padding: theme.spacing(3),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        border: "0px solid #CECECE"
    },
    fixedHeight: {
        height: "89vh",
        width: "90wh",
    },
    button: {
        height: 45,
        width: 150,
        margin: theme.spacing(1)
    },
    cartMaintenance: {
        marginTop: "70px",
        marginLeft: "60px",
        width: "300px"
    },
    cartTitle: {
        color: "#7C4A33",
        // flexGrow: 1,
        fontFamily: "Airbnb Cereal App",
        fontWeight: "bold",
    },
    fabStyle: {
        background:  '#828E42',
    },
}));

