import { React, useState } from "react";
import { Modal, Button } from 'antd';
import styled from "styled-components";
import Players from "../GameInfo/components/Players/Players";
import {
    HEATMAP_FULL,
    HEATMAP_ZONE_QUARTER,
    hints
} from "./types";

const { TabPane } = Tabs;


const Wrapper = styled.div`
  width: 46%;
  margin-left: 25px;
`;

const TabsWrapper = styled.div`
padding: 10px;
padding-left: 15px;
padding-right: 15px;
.ant-tabs-nav{
    margin: 0;
}

`;

const HelpWrapper = styled.div`
  // margin-top: 15px ;
  max-height: 500px;
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
    right: 234px;
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
    setHintCounter,
    hint,
    setGuess
}) => {
    const hints_for_choice = hints;
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [curItem, setCurItem] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        scores && handleHelp(curItem['handleHelp']);
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
            <Modal title="Угадай-ка!" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>А какой ход лучший на твой взгляд, дружище?</p>
                <input type="text" name="name" onChange={(e) => {
                    setGuess(e.target.value);
                }} placeholder="A7"/>
            </Modal>

            <TabsWrapper>
                {/*<Tabs type="card" centered>*/}
                    <Tabs centered>
                    <TabPane tab="Умные подсказки" key="1">
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
                                        scores && handleHelp(item['handleHelp']);
                                        if (hintCounter.lastHintStep + 1 === stepMain || hintCounter.lastHintStep === stepMain || stepMain === 0) {
                                            setHintCounter({ counter: hintCounter.counter + 1, lastHintStep: stepMain });
                                        } else {
                                            ;
                                            setHintCounter({ counter: 0, lastHintStep: -1 });
                                        }
                                    }
                                    }
                                >
                                    <div className="button" style={{ border: hintBadgeColor }} onClick={() => {
                                        showModal();
                                        setCurItem(item);
                                        if (item.id > 4) {
                                            scores && handleHelp(item['handleHelp']);
                                        }
                                        if (hintCounter.lastHintStep + 1 === stepMain || hintCounter.lastHintStep === stepMain || stepMain === 0) {
                                            setHintCounter({ counter: hintCounter.counter + 1, lastHintStep: stepMain });
                                        } else {
                                            setHintCounter({ counter: 0, lastHintStep: -1 });
                                        }
                                    }}>
                                        <span className="content">{item['name']}</span>
                                        <span className="badge" style={{ border: hintBadgeColor }}>{item['fine']}</span>
                                    </div>
                                </HelpItem>
                            })}
                        </HelpWrapper>
                    </TabPane>
                    <TabPane tab="Все подсказки" key="2">
                        <HelpWrapper>
                            {hints.map((item) => {
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
                                        scores && handleHelp(item['handleHelp']);
                                        if (hintCounter.lastHintStep + 1 === stepMain || hintCounter.lastHintStep === stepMain || stepMain === 0) {
                                            setHintCounter({ counter: hintCounter.counter + 1, lastHintStep: stepMain });
                                        } else {
                                            ;
                                            setHintCounter({ counter: 0, lastHintStep: -1 });
                                        }
                                    }
                                    }
                                >
                                    <div className="button" style={{ border: hintBadgeColor }} onClick={() => {
                                        showModal();
                                        setCurItem(item);
                                        if (item.id > 4) {
                                            scores && handleHelp(item['handleHelp']);
                                        }
                                        if (hintCounter.lastHintStep + 1 === stepMain || hintCounter.lastHintStep === stepMain || stepMain === 0) {
                                            setHintCounter({ counter: hintCounter.counter + 1, lastHintStep: stepMain });
                                        } else {
                                            setHintCounter({ counter: 0, lastHintStep: -1 });
                                        }
                                    }}>
                                        <span className="content">{item['name']}</span>
                                        <span className="badge" style={{ border: hintBadgeColor }}>{item['fine']}</span>
                                    </div>
                                </HelpItem>
                })}
            </HelpWrapper>
        </Wrapper>
    );
};

export default Help;
