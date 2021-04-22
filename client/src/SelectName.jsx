import React, { useEffect } from 'react';
import { FormControl, makeStyles, Select, MenuItem, InputLabel, CircularProgress, Button, FormHelperText, TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const attestationTemplate = {
  nom: null,
  prenom: null,
  idEtudiant: 0,
  convention: 0,
  message: null
};

const SelectName = () => {
  const classes = useStyles();
  const [studentId, setStudentId] = React.useState('');
  const [convention, setConvention] = React.useState('');
  const [attestation, setAttestation] = React.useState('');
  const [students, setStudents] = React.useState(undefined);

  const handleChange = (event) => {
    setStudentId(event.target.value);
    console.log(event.target);
    axios.get(`http://localhost:3001/student/${event.target.value}`).then((res) => {
      const responseConvention = res.data;
      setConvention(responseConvention);
    });
    /*
    attestationTemplate.message = (student && convention) ? 
       `Bonjour ${student.nom} ${student.prenom},\n 
      Vous avez suivie ${convention.nbHeur} de formation chez FormationPlus.\n
      Pouvez-vous nous retourner ce mail avec la pièce jointe signée.\n
      Cordialement,\nFormationPlus` : "Patientez";
   */
  };

  const handleSubmit = (event) => {
    console.log("on submit");
    console.log(event.target.value);
  };

  const handleAttestionText = (event) => {
    console.log("on change textarea");
    console.log(event.target.value);

  }

  useEffect(() => {
    axios.get(`http://localhost:3001`).then((res) => {
      const responseStudent = res.data;
      setStudents(responseStudent);
    })
  }, []);

  console.log(students);
  return (
    <div>

      <FormControl className={classes.formControl} onSubmit={handleSubmit}>
        <InputLabel id="demo-simple-select-label">Etudiant</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={studentId}
          onChange={handleChange}
        >
          {students ? (students.map((student) => {
            return <MenuItem key={student.idEtudiant} value={student.idEtudiant} id={student.idEtudiant}>{`${student.nom} ${student.prenom}`}</MenuItem>;
          })) : <CircularProgress />};
      </Select>
        <FormHelperText>{convention ? convention[0].nom : "Nom de la convention"}</FormHelperText>
        <Button type="submit">Ajouter</Button>
        {/*
        <TextareaAutosize 
        aria-label="empty textarea" 
        placeholder="Selectionnez un etudiant pour generer son attestation." />*/}
        <input type="text" value={attestationTemplate.message ? attestation.message : "Attestation"} onChange={handleAttestionText} />
      </FormControl>
    </div>
  );
}

export default SelectName;