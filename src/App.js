import React, { Component } from 'react'
// Component Imports
import Header from './Components/Header'
import Positive from './Components/Positive'
import Negative from './Components/Negative'
import Tile from './Components/Tile'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  text-align: center;
  font-family: 'Nunito', sans-serif;
  background: #f8f9f7;
`

const TileWrapper = styled.div`
  display: block; 
  margin-top: 5vh;
  background: #f8f9f7;
  @media (max-width: 750px) {
    display: inline-block;
    overflow-x: hidden;
    overflow-y: hidden: 
  }
`
const Refresh = styled.button`
  height: 25px;
  width: 75px;
  margin: auto;
  color: white;
  background: #7873ae;
`

class App extends Component {
  state = {
    buildings: [],
    building: '',
    rooms: [],
    room: '',
    roomData: {},
    device: null,
    devices: [],
    deviceData: {},
    roomHDMI: '',
    deviceHDMI: '',
    roomVGA: '',
    deviceVGA: '',
    adapterHDMI: '',
    adapterVGA: '',
    linkHDMI: '',
    linkVGA: '',
  }
  //converts to boolean value bc SQL only stores strings/numbers
  convToBool = string => {
    if (string === 'true') {
      return true
    }
    return false
  }
  //place buildings[] and devices[] in state
  componentDidMount = () => {
    axios.get('http://localhost:4000/api/devices').then(res => {
      this.setState({ devices: res.data })
    })
    axios.get('http://localhost:4000/api/buildings').then(res => {
      this.setState({ buildings: res.data })
    })
  }

  //sets selected building in state and calls rooms upon user selection
  setBuilding = building => {
    axios
      .get(`http://localhost:4000/api/buildings/${building}`)
      .then(res => {
        this.setState({ building: building, rooms: res.data })
      })
      .catch(err => console.log(err))
  }

  //calls for room and sets room and roomData in state upon user selection
  setRoom = room => {
    const { building } = this.state
    axios
      .get(`http://localhost:4000/api/buildings/${building}/${room}`)
      .then(res => {
        this.setState({
          room: room,
          roomData: res.data[0],
          roomHDMI: res.data[0].hasHDMI,
          roomVGA: res.data[0].hasVGA,
        })
      })
      .catch(err => console.log(err))
  }

  //sets selected device and deviceData into  state upon user selection
  setDevice = device => {
    this.setState({ device: device }, console.log(device))
    axios.get(`http://localhost:4000/api/devices/${device}`).then(res => {
      this.setState({
        deviceData: res.data[0],
        deviceHDMI: res.data[0].hasHDMI,
        deviceVGA: res.data[0].hasVGA,
        adapterHDMI: res.data[0].adapterHDMI,
        adapterVGA: res.data[0].adapterVGA,
        linkHDMI: res.data[0].linkHDMI,
        linkVGA: res.data[0].linkVGA,
      })
    })
  }

  //Function tests data from roomData and deviceData returns boolean called upon device selection
  adapterCheck = (roomHDMI, deviceHDMI, roomVGA, deviceVGA) => {
    //test booleans return true if adapter is needed
    if (
      (roomHDMI === true && deviceHDMI === true) ||
      (roomVGA === true && deviceVGA === true)
    ) {
      return false
    } else if (
      (roomHDMI === true && deviceHDMI === false) ||
      (roomVGA === true && deviceVGA === false)
    ) {
      return true
    }
  }

  handlePageRefresh = () => {
    window.location.reload()
  }

  //ADAPTER DISPLAY

  //helper function for adapterCheck() that gets specific adapter needs and displays adapter names
  whichAdapter = (roomHDMI, deviceHDMI, roomVGA, deviceVGA) => {
    //test both (prevents infinite loop)
    if (
      roomHDMI === true &&
      deviceHDMI === false &&
      (roomVGA === true && deviceVGA === false)
    ) {
      return `${this.state.adapterHDMI} or a ${this.state.adapterVGA}`
    }
    //test HDMI
    else if (roomHDMI === true && deviceHDMI === false) {
      return this.state.adapterHDMI
    }
    //test VGA
    else if (roomVGA === true && deviceVGA === false) {
      return this.state.adapterVGA
    }
  }

  //function to pass link(s) to Link
  whichLink = (roomHDMI, deviceHDMI, roomVGA, deviceVGA) => {
    if (
      roomHDMI === true &&
      deviceHDMI === false &&
      (roomVGA === true && deviceVGA === false)
    ) {
      return [this.state.linkHDMI, this.state.linkVGA]
    } else if (roomHDMI === true && deviceHDMI === false) {
      return this.state.linkHDMI
    } else if (roomVGA === true && deviceVGA === false) {
      return this.state.linkVGA
    }
  }

  render() {
    return (
      <Wrapper>
        <Header />
        <TileWrapper>
          {this.state.rooms.length === 0 &&
            this.state.buildings.map((building, index) => (
              <Tile
                key={index}
                text={building}
                id={building}
                func={this.setBuilding}
              />
            ))}
          {!this.state.room &&
            this.state.rooms.map((room, index) => (
              <Tile
                key={index}
                text={room.roomNumber}
                id={room.roomNumber}
                func={this.setRoom}
              />
            ))}
          {this.state.room &&
            !this.state.device &&
            this.state.devices.map((dev, index) => (
              <Tile
                key={index}
                id={dev._id}
                text={dev.name}
                func={this.setDevice}
              />
            ))}
        </TileWrapper>
        {this.state.device ? (
          this.adapterCheck(
            this.convToBool(this.state.roomHDMI),
            this.convToBool(this.state.deviceHDMI),
            this.convToBool(this.state.roomVGA),
            this.convToBool(this.state.deviceVGA),
          ) ? (
            <Negative
              whichAdapter={this.whichAdapter(
                this.convToBool(this.state.roomHDMI),
                this.convToBool(this.state.deviceHDMI),
                this.convToBool(this.state.roomVGA),
                this.convToBool(this.state.deviceVGA),
              )}
              whichLink={this.whichLink(
                this.convToBool(this.state.roomHDMI),
                this.convToBool(this.state.deviceHDMI),
                this.convToBool(this.state.roomVGA),
                this.convToBool(this.state.deviceVGA),
              )}
            />
          ) : (
            <div>
              <Positive />
              <Refresh onClick={this.handlePageRefresh}>Refresh</Refresh>
            </div>
          )
        ) : null}
      </Wrapper>
    )
  }
}

export default App
