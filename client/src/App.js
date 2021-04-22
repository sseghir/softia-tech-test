import './App.css';
import { Grid, Typography } from "@material-ui/core";
import SelectName from "./SelectName";

function App() {
  return (
    <div className="App">
      <Grid container spacing={2} direction="column">
      <Grid item container xs={12} justify="center">
        <Typography variant="h2">Bienvenue sur FormationPlus</Typography>
        </Grid>
        <Grid item container xs={12} justify="center">
            <SelectName />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
