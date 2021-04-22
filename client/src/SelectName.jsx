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
  const [studAttestation, setAttestation] = React.useState('');
  const [students, setStudents] = React.useState(undefined);

  const handleChange = (event) => {
    setStudentId(event.target.value);
    console.log(event.target);
    axios.get(`http://localhost:3001/convention/${event.target.value}`).then((res) => {
      const responseConvention = res.data;
      setConvention(responseConvention);
    });
    axios.get(`http://localhost:3001/student/${event.target.value}`).then((res) => {
      const responseStudent = res.data;
      setAttestation(responseStudent);
      console.log(responseStudent);
    });
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
      const responseStudents = res.data;
      setStudents(responseStudents);
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
        {(studAttestation && convention )? (
          <TextareaAutosize type="text" id="messageAttestation">
            {`Bonjour ${studAttestation[0].nom} ${studAttestation[0].prenom},\n\n\n\nVous avez suivi ${convention[0].nbHeur} de formation chez FormationPlus.\n\nPouvez-vous nous retourner ce mail avec la pièce jointe signée.\n\n\n\nCordialement,\n\nFormationPlus`}
          </TextareaAutosize>) : <></>}
      </FormControl>
    </div>
  );
}

export default SelectName;