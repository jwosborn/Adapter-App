import React from 'react'
import logo from '../Assets/SBTSlogo.jpg'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: row
  justify-content: space-between;
  background: #aeaeae;
  padding-top: 5vh;
`
const Title = styled.span`
  margin: auto; 
  margin-bottom: 5vh;
  font-family: 'Nunito';
  font-size: 5em;
  color: #3a3a3a;
  text-shadow: 2px 2px 2px gray;
  padding-right: 15vw; 

  @media (max-width: 750px) {
    padding-right: 0
    margin: auto; 
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

const Header = () => (
  <div className="Header-Parent">
    <img className="logo-img" src={logo} alt="SBTS Logo" />
    <span className="app-title">Do I Need An Adapter?</span>
  </div>
)

export default Header
