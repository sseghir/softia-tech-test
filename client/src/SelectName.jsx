import React, { useEffect } from 'react';
import { FormControl, makeStyles, Select, MenuItem, InputLabel, CircularProgress, Button, Input } from "@material-ui/core";
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
  const [students, setStudents] = React.useState(undefined);

  const handleChange = (event) => {
    setStudentId(event.target.value);

    axios.get(`http://localhost:3001/student/${event.target.value}`).then((res) => {
      const responseConvention = res.data;
      setConvention(responseConvention);
      console.log(responseConvention);
    })
  };

  useEffect(() => {
    axios.get(`http://localhost:3001`).then((res) => {
      const responseStudent = res.data;
      setStudents(responseStudent);
    })
  }, []);

  console.log(students);
  return (
    <div>

      <FormControl className={classes.formControl} >
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
        console.log()
      </Select>
        <Button type="submit">Ajouter</Button>
        <div></div>
      </FormControl>
      <InputLabel disabled>{convention ? convention[0].nom : "Nom de la convention"}</InputLabel>
    </div>
  );
}

export default SelectName;