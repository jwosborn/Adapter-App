import React, { Component } from 'react'

class Select extends Component {
  //function returns boolean values of hasHDMI and hasVGA based on device selection
  connections = i => {
    this.props.getRoomTarget(i)
    //  console.log(this.props.roomTarget)
    //     const roomHDMI = this.props.opts.find(
    //       x => x.roomNumber === this.props.roomTarget,
    //     ).hasHDMI
    //     const roomVGA = this.props.opts.find(
    //       x => x.roomNumber === this.props.roomTarget,
    //     ).hasVGA
    //     const deviceHDMI = this.props.dopts.find(
    //       x => x.name === this.props.deviceTarget,
    //     ).hasHDMI
    //     const deviceVGA = this.props.dopts.find(
    //       x => x.name === this.props.deviceTarget,
    //     ).hasVGA
    //     this.props.adapterCheck(roomHDMI, roomVGA, deviceHDMI, deviceVGA)
  }

  render() {
    return (
      <div className="Choice-parent">
        <div>
          <label htmlFor="Room-List" className="label-text">
            Choose Your Classroom:
          </label>
          <br />
          <select
            className="Room-list"
            id="Room-list"
            onChange={this.connections}
          >
            <option disabled selected>
              Choose Your Classroom
            </option>
            {this.props.opts.map(op => (
              <option key={op.roomNumber} value={op.roomNumber}>
                {op.roomNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="Device-List" className="label-text">
            Choose Your Device:
          </label>
          <br />
          <select
            className="Device-list"
            onChange={e => this.props.getDeviceTarget(e)}
          >
            <option disabled selected>
              Choose Your Device
            </option>
            {this.props.dopts.map(op => (
              <option key={op.name} value={op.name}>
                {op.name}
              </option>
            ))}
          </select>
          <button className="submit" onClick={this.connections}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}
export default Select
