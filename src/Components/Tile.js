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
  cursor: pointer;
  position: relative;
  flex-grow: 1;
  margin: 2vw 2vh;
  width: 275px;
  max-width: 275px;
  height: 150px;
  background: linear-gradient(to bottom right, deepskyblue, white);
  overflow: hidden;
  border-radius: 8px;
  box-shadow: -4px 4px 20px 1px black;
  text-decoration: none;
  color: inherit;
  animation: ${tilebounce} 0.3s;
  :active {
    box-shadow: -4px 4px 10px 1px black;
  }
`
const Tile = ({ text, func, id }) => (
  <Box onClick={() => func(id)}>
    <h5 className="text">{upperFirst(text)}</h5>
  </Box>
)

export default Tile
