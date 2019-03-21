import React from 'react'
import styled, { keyframes } from 'styled-components'

const upperFirst = text => {
  return typeof text === 'string'
    ? text.charAt(0).toUpperCase() + text.slice(1)
    : text
}

const tilebounce = keyframes`{
  0% {
    transform: translateY(15%);
  }
  50%{
    transform: translateY(-10%);
  }
  100%{
    transform: translateY(0);
  }
}`
const Box = styled.div`
  display: inline-block;
  cursor: pointer;
  position: relative;
  // flex-grow: 3
  // flex-basis: 33%;
  margin: 2vh 1vw 2vh 1vw;
  width: 225px;
  max-width: 275px;
  height: 150px;
  background: #c8c7d5;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: -4px 4px 10px 1px black;
  animation: ${tilebounce} 0.3s;
  :hover {
    font-size: 1.35em;
  }
  :active {
    box-shadow: -4px 4px 10px 1px black;
  }
  @media (max-width: 750px) {
    display: block;
    wrap: wrap;
    width: 225px;
    height: 100px;
    margin: 4.5vh 2.5vw;
  }
`

const Option = styled.h5`
  font-family: 'Nunito';
  color: #261605;
  font-size: 1.75em;
  margin-top: 30px;
  white-space: no-wrap;
`

const Tile = ({ text, func, id }) => (
  <Box onClick={() => func(id)}>
    <Option>{upperFirst(text)}</Option>
  </Box>
)

export default Tile
