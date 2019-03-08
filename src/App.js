import React, { Component } from 'react'
// Component Imports
// import Select from './Components/Select'
import Header from './Components/Header'
import Positive from './Components/Positive'
import Negative from './Components/Negative'
import Tiles from './Components/Tiles'
import classroomList from './Data/Classroomlist'
// import { Devicelist } from './Data/Devicelist'
import './App.css'
import axios from 'axios'

class App extends Component {
  state = {
    needsAdapter: false,
    needsHDMIAdapter: false,
    needsVGAAdapter: false,
    ishidden: true,
    devices: [],
    device: '',
    deviceData: {},
  }

  //place devices[] in state
  componentDidMount = () => {
    axios.get('https://adapter-api.herokuapp.com/api/devices').then(res => {
      this.setState({ devices: res.data })
    })
  }

  //sets selected device from Tiles into App state
  setDevice = device => {
    this.setState({ device: device })
    axios
      .get(`https://adapter-api.herokuapp.com/api/devices/${device}`)
      .then(res => {
        this.setState({ deviceData: res.data }, () => {
          console.log(this.state.deviceData)
        })
      })
  }

  // Function tests data from roomData and deviceData
  //changes App State so that App renders Positive/Negative banners
  // adapterCheck = (roomHDMI, deviceHDMI, roomVGA, deviceVGA) => {
  //   if (
  //     (roomHDMI === true && deviceHDMI === true) ||
  //     (roomVGA === true && deviceVGA === true)
  //   ) {
  //     this.setNeedsNoAdapter()
  //   } else if (
  //     roomHDMI === true &&
  //     deviceHDMI === false &&
  //     (roomVGA === true && deviceVGA === false)
  //   ) {
  //     this.setNeedsBoth()
  //   } else if (roomHDMI === true && deviceHDMI === false) {
  //     this.setNeedsHDMIAdapter()
  //   } else if (roomVGA === true && deviceVGA === false) {
  //     this.setNeedsVGAAdapter()
  //   }
  // }
  //function to display Positive component
  handleDisplayBanner = () => {
    this.setState({ ishidden: false })
  }

  //Breaking apart adapterCheck()
  checkHDMI = (roomHDMI, deviceHDMI) => {
    if (roomHDMI === true && deviceHDMI === false) {
      this.setNeedsHDMIAdapter()
    }
  }

  checkVGA = (roomVGA, deviceVGA) => {
    if (roomVGA === true && deviceVGA === false) {
      this.setNeedsVGAAdapter()
    }
  }

  //Functions that change App state to render Positive/Negative(may rename) Banners. passed to Tiles

  setNeedsHDMIAdapter = () => {
    this.setState({
      needsAdapter: true,
      needsHDMIAdapter: true,
      needsVGAAdapter: false,
      ishidden: false,
    })
  }

  setNeedsVGAAdapter = () => {
    this.setState({
      needsAdapter: true,
      needsHDMIAdapter: false,
      needsVGAAdapter: true,
      ishidden: false,
    })
  }

  setNeedsBoth = () => {
    this.setState({
      needsAdapter: true,
      needsHDMIAdapter: true,
      needsVGAAdapter: true,
      ishidden: false,
    })
  }

  //ADAPTER DISPLAY

  //Function that displays appropriate adapter(s) dynamically needs to be moved to Tiles
  getDeviceAdapter = (adapterHDMI, adapterVGA) => {
    if (
      this.state.needsHDMIAdapter === true &&
      this.state.needsVGAAdapter === true
    ) {
      return adapterHDMI + ' or a ' + adapterVGA
    } else if (this.state.needsHDMIAdapter === true) {
      return adapterHDMI
    } else if (this.state.needsVGAAdapter === true) {
      return adapterVGA
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Tiles
          buildings={classroomList}
          adapterCheck={this.adapterCheck}
          devices={this.state.devices}
          setDevice={this.setDevice}
        />
        {this.state.needsAdapter ? (
          <Negative ishidden={this.state.ishidden} />
        ) : (
          <Positive ishidden={this.state.ishidden} />
        )}
      </div>
    )
  }
}

export default App
