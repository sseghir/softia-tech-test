import React from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles, Button, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
            alignItems: "center",
            justifyContent: "center"
        },
    },
}));

const AddStudent = () => {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField required id="nom" defaultValue="Nom" />
                <TextField required id="prenom" defaultValue="Prenom" />
                <Button>Ajouter</Button>
            </div>
        </form>
    );
}

export default AddStudent;