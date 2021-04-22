import React, {useEffect} from 'react';
import { FormControl, makeStyles, Select, MenuItem, InputLabel } from "@material-ui/core";
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
  const [age, setAge] = React.useState('');
  const [student, setStudent] = React.useState(undefined);
  
  const handleChange = (event) => {
    setAge(event.target.value);
  };
 
  useEffect(() => {
    axios.get(`http://localhost:3001`).then((res) => {
      const responseStudent = res.data;
      setStudent(responseStudent);
    })
  }, []);
  console.log(student);
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Etudiant</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SelectName;