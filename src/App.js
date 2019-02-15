import React, { Component } from 'react';
// Component Imports
import Select from './Select';
import Header from './Header';
import Positive from './Positive';
import {Nortonlist} from './Classroomlist';
import {Devicelist} from './Devicelist';
import './App.css';
import Negative from './Negative';

class App extends Component {

    state = {
      needsAdapter: true
    }
  render() {

  const targetValue = (i) => {
  return(
    i.currentTarget.text
  )}
  
    return (
      <div className="App">
        <Header />
        <Select 
        opts={Nortonlist}
        dopts={Devicelist}
        targetValue={this.targetValue}
        />
        {
          this.state.needsAdapter ? <Negative /> : <Positive /> 
        }
      </div>
    );
  }
}

export default App;
