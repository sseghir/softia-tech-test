import React, { useEffect } from 'react';
import { FormControl, makeStyles, Select, MenuItem, InputLabel, CircularProgress, Button, FormHelperText, TextareaAutosize } from "@material-ui/core";
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


const SelectName = () => {
  const classes = useStyles();
  const [studentId, setStudentId] = React.useState('');
  const [convention, setConvention] = React.useState('');
  const [studAttestation, setAttestation] = React.useState('');
  const [attestationTemplate, setTemplate] = React.useState('');
  const [students, setStudents] = React.useState(undefined);

  const handleChange = (event) => {
    setStudentId(event.target.value);
    axios.get(`http://localhost:3001/convention/${event.target.value}`).then((res) => {
      const responseConvention = res.data;
      setConvention(responseConvention);
    });
    axios.get(`http://localhost:3001/student/${event.target.value}`).then((res) => {
      const responseStudent = res.data;
      setAttestation(responseStudent);
    });
  };

  const handleSubmit = () => {
    console.log("on submit");
    console.log(attestationTemplate);
    axios.get(`http://localhost:3001/attestation/${attestationTemplate.idEtudiant}/${attestationTemplate.convention}/${attestationTemplate.message}`)
    .then((res) => {
    });
  };

  const handleAttestionText = (event) => {
    setTemplate({
        "idEtudiant": studAttestation[0].idEtudiant,
        "convention": studAttestation[0].Convention,
        "message": event.target.value
    });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001`).then((res) => {
      const responseStudents = res.data;
      setStudents(responseStudents);
    })
  }, []);

  return (
    <FormControl className={classes.formControl}>
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
      {(studAttestation && convention) ? (
        <div>
          <TextareaAutosize type="text" id="messageAttestation" onChange={handleAttestionText}>
            {`Bonjour ${studAttestation[0].nom} ${studAttestation[0].prenom},\n\n\n\nVous avez suivi ${convention[0].nbHeur} de formation chez FormationPlus.\n\nPouvez-vous nous retourner ce mail avec la pièce jointe signée.\n\n\n\nCordialement,\n\nFormationPlus`}
          </TextareaAutosize>
          <Button variant="outlined" onClick={handleSubmit}>Ajouter</Button>
        </div>) : <></>}
    </FormControl>
  );
}

export default SelectName;