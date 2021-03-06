import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button } from 'antd';
import { take } from "redux-saga/effects";
import Board from "./components/Board/Board";
import GameInfo from "./components/GameInfo/GameInfo";
import styled from "styled-components";
import { Header } from "./components/Header";
import Help from "./components/Help/Help";
import {
  hintHeatmapFull,
  hintHeatmapZone,
  markersClear,
  multipleHelp,
  setWinnerUser,
  setLoserUser,
  setBlocked,
  hintShowBest,
  setScoresWinner,
  hintBestMoves,
  hintHeatmapQuarter,
  hintHeatmap2Quarters,
  hintScoresSuperiority
} from "../../store/Board/actions";

import {
  getGameInfo
} from "../../store/Profile/actions";

import { clearGameId } from "../../store/GameCreate/actions";

import { client, token } from '../../Socket.js'
import {
  HEATMAP_FULL,
  HEATMAP_ZONE_QUARTER,
} from "./components/Help/types";

import {message, notification} from "antd";
import {SmileOutlined} from '@ant-design/icons';
import "antd/dist/antd.css";
import { proverbs } from "./proverbs"

const Wrapper = styled.div`
  max-width: 1377px;
  margin: 0 auto;
`;
const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: stretch;
  height: calc(100vh - 129px);
`;
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(255,255,255,0.5);
  z-index: 99999999;
`;

const processHeatmapQuarters = (field) => {
  if (field == null) return;

  let q1 = {sum: 0, q: 1}, q2 = {sum: 0, q: 2}, q3 = {sum: 0, q: 3}, q4 = {sum: 0, q: 4};

  for (let i = 0; i < field.length; i++) {
    for (let j = 0; j < field.length; j++) {
      if (i < 6 && j < 6) {
        q3.sum += Math.abs(field[i][j]);
      } else if (i < 6 && j > 6) {
        q2.sum += Math.abs(field[i][j]);
      } else if (i > 6 && j < 6) {
        q4.sum += Math.abs(field[i][j]);
      } else if (i > 6 && j > 6) {
        q1.sum += Math.abs(field[i][j]);
      }
    }
  }

  let sortedQs = [q1, q2, q3, q4].sort((a, b) => {
    return b.sum - a.sum;
  });

  console.log(sortedQs[0].q);

  if (sortedQs[1].sum > sortedQs[0].sum / 2) {
    return [sortedQs[0], sortedQs[1]];
  } else {
    return [sortedQs[0]];
  }
}

const GameBoard = ({ history }) => {

  const game_id = useSelector((state) => state.createGame.id);
  const blocked = useSelector((state) => state.board.blocked);
  const mapStones = useSelector((state) => state.board.mapStones);
  const field = useSelector((state) => state.profile.field);

  const [hint, setHint] = useState(false);
  const [enemyPass, setEnemyPass] = useState(false);
  const [lastMarkers, setLastMarkers] = useState(null);
  const [helpType, setHelpType] = useState('');
  const [activeHelpId, setActiveHelpId] = useState('');
  const [multipleType, setMultipleType] = useState(false);
  const [mapType, setMapType] = useState(false);
  const [multipleHint, setMultipleHint] = useState({});
  const [multipleCount, setMultipleCount] = useState([]);
  const [turns, setTurns] = useState([]);
  const [yourColor, setYourColor] = useState("white");
  const [coordinates, setCoordinates] = useState({});
  const [you, setYou] = useState({});
  const [opponent, setOpponent] = useState({});
  const [stepMain, setStepMain] = useState(0);
  const [stepTwo, setStepTwo] = useState(0);
  const [stepColor, setStepColor] = useState('white');
  const [classNames, setClassNames] = useState({});
  const dispatch = useDispatch();
  const [times, setTimes] = useState({playerOne: 0, playerTwo: 0});
  const [hintCounter, setHintCounter] = useState({counter: 0, lastHintStep: -1});
  const [guess, setGuess] = useState("");
  const [proverb, setProverb] = useState('');
  const markers = useSelector((state) => state.board.markers);
  const [isKrasavchikVisible, setKrasavchikVisible] = useState(false);
  const [crowdedQuarters, setCrowdedQuarters] = useState([]);

  if (guess in markers) {
      setKrasavchikVisible(true);
      setGuess("");
  }

  const openNotification = () => {
    notification.open({
      message: '?????? ?????????????????? ????????????!',
      description:
          '???????????????? ?????????? ???????????????? ?????????????',
      icon: <SmileOutlined rotate={180} />
    });
  };

  useEffect(() => {
    if (Object.keys(multipleHint).length === multipleCount) {
      dispatch(multipleHelp());
      deleteCoordinates(multipleHint);
      setHelpType('');
      setMultipleHint({});
    }
  }, [multipleHint, multipleCount]);

  if (game_id === null) {
    history.push('/')
  }

  useEffect(() => {
    if (game_id) {
      setProverb(proverbs[Math.floor(Math.random() * proverbs.length)]);
      client.send(JSON.stringify([5, 'go/game']));
      client.send(JSON.stringify([7, "go/game", {command: "auth", token: localStorage.getItem('GoGameToken'), game_id: game_id}]));
    }
  },[])

  useEffect(()=>{
    console.log("hintCounter"+hintCounter.counter);
    if (hintCounter.counter===3){
      openNotification();
      setHintCounter({counter: 0, lastHintStep: -1});
    }
  }, [hintCounter]);

  // ???????????? ?????? ???????????????? heatmap???? ???????? ?????????? ???????? ??????????????????
  useEffect(() => {

    dispatch(getGameInfo(game_id));
    let crowdedQuarters = processHeatmapQuarters(field);

    setCrowdedQuarters(crowdedQuarters);

  }, [ stepTwo ]);

  client.onmessage = function(e) {
    setEnemyPass(false)
    if (typeof e.data === 'string') {
      let jsonData = JSON.parse(e.data);
      if (jsonData.payload) {
        if (jsonData.payload.currentMap) {
          setCoordinates(mapMap(jsonData.payload.currentMap))
        }
        if (jsonData.payload.type === "currentMap") {
          setYou(jsonData.payload.you)
          setOpponent(jsonData.payload.opponent)
        }
        if (jsonData.payload.player) {
          if(typeof jsonData.payload.player === 'string') {
            setYourColor(jsonData.payload.player === 'w' ? 'white' : 'black')
          }
        }
        if (jsonData.payload.type && (jsonData.payload.type === 'endGame')) {
          let winner = jsonData.payload.winnerPlayer
          let loser = jsonData.payload.loserPlayer
          winner.finalScore = jsonData.payload.finalScore;
          dispatch(setWinnerUser(winner))
          dispatch(setLoserUser(loser))
          history.push('/', { from: "Win" })
          dispatch(clearGameId())
        }
        if (jsonData.payload.turn) {
          setStepColor(jsonData.payload.turn)
        }
        if (jsonData.payload.move) {
          setTurns(turns => [...turns, timeConverter(jsonData.time)+': '+jsonData.payload.move])
        }
        if (jsonData.payload.type === 'newTurn') {
          setLastMarkers({[jsonData.payload.place]:'circle'})
        }
        if (jsonData.payload.moveType === 'pass') {
          if (stepColor !== yourColor) {
            setEnemyPass(true)
          }
        }
        if (jsonData.payload.turnBlackEndedAt && jsonData.payload.turnWhiteEndedAt) {
          setTimes({
            playerOne: Math.floor((Number(jsonData.payload.turnBlackEndedAt)  - new Date().getTime()) / 1000),
            playerTwo: Math.floor((Number(jsonData.payload.turnWhiteEndedAt)  - new Date().getTime()) / 1000)
          })
        }
      }
    }
    dispatch(setBlocked(false))
  };

  const mapMap = (map) => {
    let coords = {};
    let alpha = 'ABCDEFGHJKLMNOPQRSTUV'
    map.map((row, rowId) => row.map((cell, colId) => {
      if(cell !== 0)
      {
        let sign = alpha[rowId];
        coords[`${sign}${(colId + 1)}`] = cell === -1 ? 'white' : 'black';
      }
    }))
    let steMainTemp = 0
    let stepTwoTemp = 0
    Object.keys(coords).forEach((key) => {
      if (String(yourColor) === String(coords[key])) {
        steMainTemp += 1
      } else {
        stepTwoTemp += 1
      }
    })
    setStepMain(steMainTemp)
    setStepTwo(stepTwoTemp)
    return coords;
  }

  const move = (coord) => {
    if (stepColor === yourColor) {
      dispatch(markersClear());
      setActiveHelpId(null);
      setHelpType('')
      dispatch(setBlocked(true))
      client.send(JSON.stringify([7, "go/game", {command: "move", token: token, place: coord.toString().toLowerCase(), game_id: game_id}]));
    }
  }

  const pass = () => {
    dispatch(markersClear());
    setActiveHelpId(null);
    setHelpType('')
    dispatch(setBlocked(true))
    client.send(JSON.stringify([7, "go/game", {command: "pass", token: token, game_id: game_id}]));
  }

  const resign = () => {
    dispatch(setBlocked(true))
    client.send(JSON.stringify([7, "go/game", {command: "resign", token: token, game_id: game_id}]));
  }



  const handleHelp = ({type, multipleHandleCount, id, count} ) => {
    dispatch(markersClear());
    setMultipleHint({});
    setActiveHelpId(id);

    if (type === "single") {
      dispatch(setBlocked(true))
      setHelpType("single");
      dispatch(hintBestMoves(game_id, count));
    }
    if (type === "multiple") {
      setHelpType("multiple");
      setMultipleType("multiple");
      setMultipleCount(multipleHandleCount);
    }
    if (type === "map") {
      dispatch(setBlocked(true))
      setHelpType("map");
      setMapType("map");
      switch (id)
      {
        case HEATMAP_FULL:
          dispatch(hintHeatmapFull(game_id));
          break;
        case HEATMAP_ZONE_QUARTER:
          dispatch(hintHeatmapZone(game_id, true));
          break;
        case 25:
          dispatch(hintHeatmapQuarter(game_id, 1));
          break;
        case 26:
          dispatch(hintHeatmapQuarter(game_id, 2));
          break;
        case 27:
          dispatch(hintHeatmapQuarter(game_id, 3));
          break;
        case 28:
          dispatch(hintHeatmapQuarter(game_id, 4));
          break;
        case 29:
          dispatch(hintHeatmap2Quarters(game_id, "1,2"));
          break;
        case 30:
          dispatch(hintHeatmap2Quarters(game_id, "3,4"));
          break;
        case 31:
          dispatch(hintHeatmap2Quarters(game_id, "1,4"));
          break;
        case 32:
          dispatch(hintHeatmap2Quarters(game_id, "2,3"));
          break;
      }
    }
    if (type === "score") {
      dispatch(setBlocked(true));
      setHelpType("score");

      switch (id) {
        case 33:
          dispatch(hintScoresSuperiority(game_id));
          break;
        case 34:
          dispatch(setScoresWinner(game_id))
          break;
      }
    }
  };

  const deleteCoordinates = (hints) => {
    for (const key in coordinates) {
      for (const keyHint in hints) {
        if(key === keyHint) {
          delete coordinates[key];
        }
      }
    }
  }

  const timeConverter = (UNIX_timestamp) => {
    let a = new Date(UNIX_timestamp);
    let year = a.getFullYear().toString().substr(-2);
    let month = ('0' + (a.getMonth()+1)).slice(-2);
    let date = ('0' + a.getDate()).slice(-2);
    let hour = ('0' + a.getHours()).slice(-2);
    let min = ('0' + a.getMinutes()).slice(-2);
    let time = `${date}/${month}/${year} ${hour}:${min}`;
    return time;
  }

  const setMultipleHintFunc = (val) => {
    if (Object.keys(mapStones).length === (multipleCount - 2)) {
      dispatch(markersClear());
      setActiveHelpId(null);
      setMultipleHint({})
      setHelpType('');
      dispatch(setBlocked(true))
      dispatch(hintShowBest(game_id, Object.keys({...mapStones, [val]: 'circle'})))
    } else {
      setMultipleHint(mapStones)
    }
  }
  return (
    <Wrapper>

      <Modal title="?????? ??????????????!" visible={isKrasavchikVisible}
      onOk={() => setKrasavchikVisible(false)}
      onCancel={() => setKrasavchikVisible(false)}>
            <p>??????????????????!</p>
      </Modal>

      <Header
        hint={hint}
        setPass={pass}
        viewPass={Object.keys(coordinates).length > 0}
        history={history}
        setHint={(e) => { setHint(e); }}
        setResign={resign}
        helpType={helpType}
        gameId={game_id}
        view={stepColor === yourColor}
        timeOut={() => alert('End Time')}
        timer={stepColor === yourColor}
        times={times}
        hintCounter={hintCounter}
        setHintCounter = {setHintCounter}
        stepMain={stepMain}
      />
      <Flex>
        {blocked && (
          <Wrap />
        )}
        <Board
          lastMarkers={lastMarkers}
          hint={hint}
          setHint={setHint}
          currentColor={stepColor}
          setCurrentColor={setStepColor}
          yourColor={yourColor}
          helpType={helpType}
          setMultipleHint={(val) => setMultipleHintFunc(val)}
          multipleHint={multipleHint}
          multipleCount={multipleCount}
          coordinates={coordinates}
          setStonePosition={move}
          setHelpType={setHelpType}
          setMapType={setMapType}
          setMultipleType={setMultipleType}
          setActiveHelpId={setActiveHelpId}
          classNames={classNames}
          mapStones={mapStones}
        />
        {!hint ? (
          <GameInfo
            you={you}
            opponent={opponent}
            stepColor={stepColor}
            yourColor={yourColor}
            turns={turns}
            enemyPass={enemyPass}
            stepMain={stepMain}
            times={times}
            stepTwo={stepTwo}
            proverb={proverb}/>
        ) : (
          <Help
            you={you}
            opponent={opponent}
            stepColor={stepColor}
            yourColor={yourColor}
            turns={turns}
            enemyPass={enemyPass}
            stepMain={stepMain}
            stepTwo={stepTwo}
            currentColor={yourColor}
            setHint={setHint}
            handleHelp={handleHelp}
            helpType={helpType}
            multipleType={multipleType}
            mapType={mapType}
            activeHelpId={activeHelpId}
            times={times}
            scores={stepColor !== yourColor ? false : true}
            hintCounter={hintCounter}
            setHintCounter = {setHintCounter}
            hint = {hint}
            setGuess = {setGuess}
            crowdedQuarters = {crowdedQuarters}
          />
        )}
      </Flex>
    </Wrapper>
  );
};

export default GameBoard;
