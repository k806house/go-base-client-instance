import React from "react";
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
    hints
} from "./types";

const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`;

const HelpWrapper = styled.div`
  margin-top: 23px;
  max-height: 508px;
  overflow: scroll;
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const HelpItem = styled.div`
  width: 48%;
  margin-bottom: 10px;
  // background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 20px;
  cursor: pointer;

  .badge {
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: block;
    position: absolute;
    background: white;
    border: 2px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -15px;
    right: 245px;
    transition: all .3s;
  }

  .button {
    position: relative;
    //border: 2px solid red;
    padding: 15px 30px;
    color: black;
    background: white;
    cursor: pointer;
    user-select: none;

    &:hover {
      transform: scale(1.03);
      background: rgba(0,0,0,.13);
      box-shadow: 0 2px 20px rgba(0,0,0,.15);
    }

    &:active {
      transform: scale(.96);

      .badge {
        transform: scale(1.2);
      }
    }
  }
`;

const Help = ({
    enemyPass,
    stepColor,
    yourColor,
    you,
    opponent,
    stepMain,
    stepTwo,
    handleHelp,
    activeHelpId,
    scores,
    times
  }) => {
    const hints_for_choice = [hints[0], hints[1], hints[2]];
  return (
    <Wrapper>
      <Players
        enemyPass={enemyPass}
        opponent={opponent}
        you={you}
        stepColor={stepColor}
        yourColor={yourColor}
        stepMain={stepMain}
        stepTwo={stepTwo}
        times={times}
      />
      <HelpWrapper>
          {hints_for_choice.map((item)=>{
              let hintBadgeColor = '2px solid orange';
              if (item['fine'] === 2) {
                  hintBadgeColor = '2px solid orange';
              } else if (item['fine'] === 3) {
                  hintBadgeColor = '2px solid red';
              } else if (item['fine'] === 1) {
                  hintBadgeColor = '2px solid green';
              }

              return <HelpItem
                  active={activeHelpId === item['id']}
                  onClick={() =>
                      scores && handleHelp(item['handleHelp'])
                  }
              >
                  <div className="button" style={{border: hintBadgeColor}}>
                      <span className="content">{item['name']}</span>
                      <span className="badge" style={{border: hintBadgeColor}}>{item['fine']}</span>
                  </div>
              </HelpItem>
          })}
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
