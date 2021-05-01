import { React, useState } from "react";
import { Modal, Button } from 'antd';
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
  margin-bottom: 5px;
  padding: 18px;
  cursor: pointer;
  font-size: 18px;

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
    right: 250px;
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
     // background: rgba(0,0,0,.13);
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
    times,
    hintCounter,
    setHintCounter
}) => {
    const hints_for_choice = hints;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

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
                {hints_for_choice.map((item) => {
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
                        onClick={() => {
                            // scores && handleHelp(item['handleHelp']);
                            if (hintCounter.lastHintStep + 1 === stepMain || hintCounter.lastHintStep === stepMain || stepMain === 0) {
                                setHintCounter({ counter: hintCounter.counter + 1, lastHintStep: stepMain });
                            } else {
                                ;
                                setHintCounter({ counter: 0, lastHintStep: -1 });
                            }
                        }
                        }
                    >
                        <div className="button" /*onClick={() => showModal()}*/ style={{ border: hintBadgeColor }}>
                            <span className="content">{item['name']}</span>
                            <span className="badge" style={{ border: hintBadgeColor }}>{item['fine']}</span>
                        </div>
                        <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Modal>
                    </HelpItem>
                })}
            </HelpWrapper>
        </Wrapper>
    );
};

export default Help;
