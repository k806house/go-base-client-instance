import React from "react";
import styled from "styled-components";
import Players from './components/Players/Players'
import Info from './components/Info/Info'

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
`;

const TextBlock = styled.div`
  background: #f7f7f7;
  padding: 20px 40px;
`;

const GameInfo = ({ stepColor, enemyPass, yourColor, you, opponent, turns, stepMain, stepTwo, times, proverb, setProverb }) => {
  return (
    <Wrapper>
      <Players enemyPass={enemyPass} opponent={opponent} you={you} stepColor={stepColor} yourColor={yourColor} stepMain={stepMain} stepTwo={stepTwo} times={times} />
      <Info turns={turns}/>
        <h1>{proverb}</h1>
    </Wrapper>
  );
};

export default GameInfo;
