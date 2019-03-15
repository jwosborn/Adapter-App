import React, { Component } from 'react'
import logo from '../Assets/SBTSlogo.jpg'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row
  justify-content: space-between;
  background: #3a3a3a;
  padding-top: 5vh;
`
const Title = styled.span`
  margin-bottom: 5vh;
  font-family: monospace;
  font-size: 5em;
  color: #27d4b6;
  text-shadow: 2px 2px 2px gray;
  padding-right: 15vw;

  @media (max-width: 750px) {
    padding-left: 2vw;
  }
`
const Logo = styled.img`
  position: relative;
  left: 2.5vw;
  height: 100px;
  width: 100px;
  opacity: 0.75;
  border-radius: 10px 10px 10px 10px;
  @media (max-width: 750px) {
    display: none;
  }
`

class Header extends Component {
  render() {
    return (
      <Wrapper>
        <Logo src={logo} alt="SBTS Logo" />
        <Title>Do I Need An Adapter?</Title>
      </Wrapper>
    )
  }
}

export default Header
