import React from "react";
import styled from "styled-components";
import Players from './components/Players/Players'
import Info from './components/Info/Info'

import { Card } from 'antd';

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

const GameInfo = ({ stepColor, enemyPass, yourColor, you, opponent, turns, stepMain, stepTwo, times }) => {
  return (
    <Wrapper>
      <Players enemyPass={enemyPass} opponent={opponent} you={you} stepColor={stepColor} yourColor={yourColor} stepMain={stepMain} stepTwo={stepTwo} times={times} />
      <Info turns={turns}/>
        {/*<TextBlock>*/}
        {/*    <Card style={{ width: 300 }}>*/}
        {/*        <p>Card content</p>*/}
        {/*        <p>Card content</p>*/}
        {/*        <p>Card content</p>*/}
        {/*    </Card>*/}
        {/*</TextBlock>*/}
    </Wrapper>
  );
};

export default GameInfo;
