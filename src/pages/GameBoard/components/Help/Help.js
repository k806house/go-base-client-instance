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
  background: ${(props) => (props.active ? "#D8AD63" : "#f6f6f6")};
  padding: 10px;
  cursor: pointer;
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
    times,
    hintCounter,
    setHintCounter
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
              return <HelpItem
                  active={activeHelpId === item['id']}
                  onClick={() =>
                  {
                      scores && handleHelp(item['handleHelp']);
                      if (hintCounter.lastHintStep + 1 === stepMain || stepMain === 1){
                          setHintCounter({counter:hintCounter.counter + 1, lastHintStep: stepMain});
                      } else {
                          setHintCounter({counter:0, lastHintStep: -1});
                      }
                  }
                  }
              >
                  {item['name']}
              </HelpItem>
          })}
      </HelpWrapper>
    </Wrapper>
  );
};

export default Help;
