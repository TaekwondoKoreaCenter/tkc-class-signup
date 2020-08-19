import React from 'react';
import {
  Card,
  Grid,
  CardContent,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './classCard.css';


export default class ClassCard extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      clicked: false
    });
  }

  handleAddClass(classId){
    let clickedState = this.state.clicked? false: true
    this.setState({
      clicked: clickedState
    });
    this.props.chosenClass({'classId': classId, 'clicked': clickedState});
  }

  render(){
    const session = this.props.session;
    const {clicked} = this.state;

    return(
      <Card className = {clicked? 'cardClicked': 'cardUnClicked'}>
        <CardContent>
          <div className = 'cardHeader'>
            {session['className'] + ''}
          </div>
          <Grid container direction='row' justify='space-between'>
            <Grid item>
              <div className = 'classTime'>
                {session['time'][0].toString()}
              </div>
              <div className = 'classStatus'>
                {'Capacity: ' + session['status'] + "/10"}
              </div>
              <FormControlLabel
              control={<Checkbox name="checkedA" />}
              label="Add class for the entire month"
            />
            </Grid>
            
            <Grid item>
              <Button variant = 'contained' disableElevation color = {clicked? 'secondary':'primary'} onClick={() => {this.handleAddClass(session['classId'])}} className='classCardButton'> 
                {clicked? "X": "Add"}
              </Button> 
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}