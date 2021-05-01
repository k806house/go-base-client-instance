import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../../../../assets/img/logo_game.png";
import {MAIN_URL} from '../../../../constants/routes'

const Wrapper = styled.div`
  display: flex;
  height: 66px;
  align-items: center;
  margin-bottom: 34px;
  padding-top: 29px;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const Menu = styled.div`
  display: flex;
  align-items: center;
  margin-left: 64px;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Logotype = styled.img`
`;
const Text = styled.p`
  font-size: 24px;
  line-height: 28px;
  margin-right: 32px;
  cursor: pointer;
`;
const TextHint = styled.p`
  font-size: 24px;
  line-height: 28px;
  margin-right: 32px;
  cursor: pointer;
  color: ${(props) => (props.hint ? "#D8AD63" : "#000")};
`;

const TextSdf = styled.p`
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
  color: #aaaaaa;
  &:hover {
    color: #000000;
  }
`;
const GameId = styled.p`
  font-size: 24px;
  line-height: 28px;
`;
const Timer = styled.p`
  font-size: 24px;
  line-height: 28px;
  color: #767676;
`;

const Bulb = styled.p` 
  * {
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  body {
    background: black;
    position: absolute;
    left: 50%;
    top: 40%;
  }

  div,
  input {
    position: absolute;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    //left: 50%;
    //top: 40%;
    transform: translate(-50%, -50%) scale(0.2);
    box-shadow: 0 0 0px 10px white;
    background: white;
    transition: all 0.5s ease-in-out;
  }

  div::before {
    position: absolute;
    content: "";
    width: 70px;
    border-top: 60px solid white;
    border-left: 30px solid transparent;
    border-right: 30px solid transparent;
    left: 10px;
    top: 110px;
    transition: all 0.5s ease-in-out;
  }

  div::after {
    position: absolute;
    content: "";
    width: 70px;
    height: 5px;
    background: grey;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 15px;
    box-shadow: 0px 10px 0 0 grey, 0px 20px 0 0 grey;
  }

  body::before {
    content: "";
    position: absolute;
    height: 25px;
    width: 50px;
    background: grey;
    top: 135px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    z-index: 1;
  }

  input, input:focus {
    z-index: 1;
    outline: unset;
    border: none;
  }

  input {
    background: #ffe770;
    box-shadow: 0 0 0 10px #ffe770, 0 0 150px 10px #ffcd00;
    transition: all 0.5s ease-in-out;
  }

  input + div::before {
    border-top-color: #ffe770;
    transition: all 0.5s ease-in-out;
  }
`;

export const Header = ({ history, gameId, setHint, hint, setResign, helpType, setPass, viewPass, view }) => {

  return (
    <Wrapper>
      <Content>
        <Left>
          <LogoWrapper onClick={() => history.push(MAIN_URL)}>
            <Logotype alt="logo" src={Logo} />
          </LogoWrapper>
          <Menu>
            {viewPass && (
              <Text onClick={() => setPass()}>Пас</Text>
            )}
            <Text onClick={() => setResign()}>Сдаться</Text>
            {/*{view && (*/}
            {/*  <TextHint onClick={() => setHint(!hint)} hint={hint}>Взять подсказку</TextHint>*/}
            {/*)}*/}
          </Menu>
        </Left>
        <GameId>ID игры: {gameId}</GameId>
        {view && (<Bulb onClick={() => setHint(!hint)} hint={hint}>
          <input type="checkbox"/>
          <div></div>
        </Bulb>)}
      </Content>
    </Wrapper>
  );
};
