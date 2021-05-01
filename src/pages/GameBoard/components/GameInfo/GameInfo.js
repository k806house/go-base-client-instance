import React from "react";
import styled from "styled-components";
import Players from './components/Players/Players'
import Info from './components/Info/Info'
import { Alert } from "antd";
import { SketchOutlined } from "@ant-design/icons";
const icon = <SketchOutlined />;

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 120px;
`;

const TextBlock = styled.div`
  background: #f7f7f7;
  padding: 20px 40px;
`;

const InfoWrapper = styled.div`
    display: flex;
  flex-direction: column;
`;

const GameInfo = ({ stepColor, enemyPass, yourColor, you, opponent, turns, stepMain, stepTwo, times, proverb }) => {
  return (
    <Wrapper>
        <InfoWrapper>
            <Players enemyPass={enemyPass} opponent={opponent} you={you} stepColor={stepColor} yourColor={yourColor} stepMain={stepMain} stepTwo={stepTwo} times={times} />
            <Info turns={turns}/>
        </InfoWrapper>

        <Alert
            icon={icon}
            style={{ "font-style": "italic", "font-size": "23px", "padding": "25px", "text-align":"center" }}
            message={"«‎"+proverb+"»"}
            type="success"
            closable
            showIcon
        />
    </Wrapper>
  );
};

export default GameInfo;
