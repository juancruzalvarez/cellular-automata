import { Board } from "./Components/Board/Board"
import { Rules } from './Components/Rules/Rules'
import { Ruleset, defaultRuleset, Condition, DEFAULT_BOARD} from "./Services/rules"
import { AppShell, Burger, Text, Header, MediaQuery, Navbar, useMantineTheme, Center, ScrollArea, Title, Group, Button, SegmentedControl } from '@mantine/core';
import { useState } from "react";
export const App = () =>{

  const [board, setBoard] = useState< Array<boolean> >(DEFAULT_BOARD);
  const [boardSize, setBoardSize] = useState<number>(20);
  const [ruleset, setRuleset] = useState<Ruleset>(defaultRuleset);
  const [running, setRunning] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [intervalID, setIntervalId] = useState<number>(0);
  const [currentSpeed,setCurrentSpeed] = useState<string>('I');
  const theme = useMantineTheme();
  
  const onRuleChangeSave = (newRuleset: Ruleset, newBoardSize: number) =>{
    setRuleset(newRuleset);
    setBoardSize(newBoardSize);
    setBoard(Array<boolean>(newBoardSize*newBoardSize).fill(false));
  }

  const onClickCell = (index: number) =>{
    let newBoard = [...board];
    newBoard[index] = !newBoard[index];
    setBoard(newBoard);
  }

  const onGo = () =>{
    clearInterval(intervalID);
    setIntervalId(window.setInterval(updateBoard, getTimeBeetwen(currentSpeed)));
  }

  const start = (speed: string)=>{
    clearInterval(intervalID);
    setIntervalId(window.setInterval(updateBoard, getTimeBeetwen(speed)));
  }

  const getTimeBeetwen = (speed: string) =>{
    switch(speed){
      case 'I':return 1250;
      case 'II':return 700;
      case 'III':return 300;
      case 'IV':return 100;
    }
  }

  const onStop = () =>{
    clearInterval(intervalID);
  }

  interface properties{
    liveNeighbourCount:number;
    left:boolean;
    right:boolean;
    up:boolean;
    down:boolean;
    rightUp?:boolean;
    rightDown?:boolean;
    leftUp?:boolean;
    leftDown?:boolean;
  };

  const updateBoard = () =>{
    setBoard( 
      (oldBoard) =>{
        let newBoard: Array<boolean> = [...oldBoard];
        let boardSideLength = Math.floor(Math.sqrt(oldBoard.length));
        
        for(let i = 0; i<oldBoard.length; i++){
          let props = {liveNeighbourCount:0} as properties; //holds all the values of the properties for the cell being analysed.
          let position = indexToPosition(i, boardSideLength);
          let value: boolean;
          //right

          if(position.x + 1 >= boardSideLength){
            switch(ruleset.boardType){
              case 'torus':{
                value = oldBoard[positionToIndex({x: 0, y: position.y}, boardSideLength)];
                break;
              }

              case 'outsideAlive':{
                value = true;
                break;
              }

              case 'outsideDead':{
                value = false;
                break;
              }
            }
          }else{
            value = oldBoard[positionToIndex({x: position.x+1, y: position.y}, boardSideLength)];
          }
          props.right = value;
          if (value) props.liveNeighbourCount++;

          //down
          if(position.y + 1 >= boardSideLength){
            switch(ruleset.boardType){
              case 'torus':{
                value = oldBoard[positionToIndex({x: position.x, y: 0}, boardSideLength)];
                break;
              }

              case 'outsideAlive':{
                value = true;
                break;
              }

              case 'outsideDead':{
                value = false;
                break;
              }
            }
          }else{
            value = oldBoard[positionToIndex({x: position.x, y: position.y+1}, boardSideLength)];
          }
          props.down = value;
          if (value) props.liveNeighbourCount++;

          //left
          if(position.x - 1 < 0){
            switch(ruleset.boardType){
              case 'torus':{
                value = oldBoard[positionToIndex({x: boardSideLength-1, y: position.y}, boardSideLength)];
                break;
              }

              case 'outsideAlive':{
                value = true;
                break;
              }

              case 'outsideDead':{
                value = false;
                break;
              }
            }
          }else{
            value = oldBoard[positionToIndex({x: position.x-1, y: position.y}, boardSideLength)];
          }
          props.left = value;
          if (value) props.liveNeighbourCount++;

          //up
          if(position.y - 1 < 0){
            switch(ruleset.boardType){
              case 'torus':{
                value = oldBoard[positionToIndex({x: position.x, y: boardSideLength-1}, boardSideLength)];
                break;
              }

              case 'outsideAlive':{
                value = true;
                break;
              }

              case 'outsideDead':{
                value = false;
                break;
              }
            }
          }else{
            value = oldBoard[positionToIndex({x: position.x, y: position.y-1}, boardSideLength)];
          }
          props.up = value;
          if (value) props.liveNeighbourCount++;
          if(ruleset.neighbourCount === 8){

            //rightUp
            if(position.x + 1 >=boardSideLength || position.y-1 < 0){
              switch(ruleset.boardType){
                case 'torus':{
                  value = oldBoard[positionToIndex({x: (position.x + 1)>=boardSideLength ? 0 : (position.x +1),
                                                    y: (position.y - 1) < 0 ? boardSideLength-1 : (position.y - 1)
                                                   }, boardSideLength)];
                  break;
                }

                case 'outsideAlive':{
                  value = true;
                  break;
                }

                case 'outsideDead':{
                  value = false;
                  break;
                }
              }
            }else{
              value = oldBoard[positionToIndex({x: position.x+1, y: position.y-1}, boardSideLength)];
            }
            props.rightUp = value;
            if (value) props.liveNeighbourCount++;

            //rightDown
            if(position.x+1 >= boardSideLength || position.y+1 >= boardSideLength){
              switch(ruleset.boardType){
                case 'torus':{
                  value = oldBoard[positionToIndex({x: (position.x + 1)>=boardSideLength ? 0 : (position.x +1),
                                                    y: (position.y + 1)>=boardSideLength ? 0 : (position.y +1)
                                                   }, boardSideLength)];
                  break;
                }

                case 'outsideAlive':{
                  value = true;
                  break;
                }

                case 'outsideDead':{
                  value = false;
                  break;
                }
              }
            }else{
              value = oldBoard[positionToIndex({x: position.x+1, y: position.y+1}, boardSideLength)];
            }
            props.rightUp = value;
            if (value) props.liveNeighbourCount++;

            //leftDown
            if(position.x - 1 < 0 || position.y+1  >= boardSideLength){
              switch(ruleset.boardType){
                case 'torus':{
                  value = oldBoard[positionToIndex({x: (position.x - 1)<0 ? boardSideLength-1 : (position.x -1),
                                                    y: (position.y + 1)>=boardSideLength ? 0 : (position.y +1)
                                                   }, boardSideLength)];
                  break;
                }

                case 'outsideAlive':{
                  value = true;
                  break;
                }

                case 'outsideDead':{
                  value = false;
                  break;
                }
              }
            }else{
              value = oldBoard[positionToIndex({x: position.x-1, y: position.y+1}, boardSideLength)];
            }
            props.leftDown = value;
            if (value) props.liveNeighbourCount++;

             //leftUp
             if(position.x - 1 < 0 || position.y - 1 < 0){
              switch(ruleset.boardType){
                case 'torus':{
                  value = oldBoard[positionToIndex({x: (position.x - 1)<0 ? boardSideLength-1 : (position.x -1),
                                                    y: (position.y - 1)<0 ? boardSideLength-1 : (position.y -1)
                                                   }, boardSideLength)];
                  break;
                }

                case 'outsideAlive':{
                  value = true;
                  break;
                }

                case 'outsideDead':{
                  value = false;
                  break;
                }
              }
            }else{
              value = oldBoard[positionToIndex({x: position.x-1, y: position.y-1}, boardSideLength)];
            }
            props.leftUp = value;
            if (value) props.liveNeighbourCount++;
          } 
         /* console.log('Position:');
          console.log(position);
          console.log('Props:');
          console.log(props);
          console.log('Conditions:');
          let conditions = oldBoard[i]? ruleset.deathConditions : ruleset.liveConditions;
          console.log(conditions);
          console.log('CheckConditions: ', checkConditions( oldBoard[i]? ruleset.deathConditions : ruleset.liveConditions, props));*/
          if(checkConditions( oldBoard[i]? ruleset.deathConditions : ruleset.liveConditions, props)) newBoard[i] = !newBoard[i];

        }
        return newBoard;
      }
    );
  }

  const checkConditions = (conditions: Condition[], props: properties): boolean =>{
    let i = 0;
    while(i<conditions.length){
      if(checkCondition(conditions[i], props)){
        return true;
      }
      i++;
    }
    return false;
  }

  const checkCondition = (condition: Condition, props: properties): boolean =>{
    switch(condition.predicate){
      case 'equals': return props[condition.property] === condition.value;
      case 'notEquals': return props[condition.property] !== condition.value;
      case 'greaterThan': return props[condition.property]! > condition.value;
      case 'lessThan': return props[condition.property]! < condition.value;
    }
  }

  const positionToIndex = ({x,y}:{x:number, y:number}, boardSideLength: number) => y*boardSideLength + x;

  const indexToPosition = (index: number, boardSideLength: number): {x:number, y:number} =>( {x: index%boardSideLength, y:Math.floor(index/boardSideLength)} );

   return (
      <AppShell
        navbarOffsetBreakpoint="md"
        fixed
        navbar={
          <Navbar
            padding="md"
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ sm: 450}}
          >
            
          <Navbar.Section
            grow
            component={ScrollArea}
            ml={-10}
            mr={-10}
            sx={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <Rules onRulesChangeSave = {onRuleChangeSave}/>
          </Navbar.Section>
          </Navbar>
          
        }
        header={
          <Header height={70} padding="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="md" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
  
              <Title order = {1}>Cellular Automata</Title>
            </div>
          </Header>
        }
      >
        <Center>
          <Group direction='column' style={{height:'90vh'}}>
            <Board board={board} onClickCell = {onClickCell}/>
            <Group>
                <Button 
                  color= {running? "red": "indigo"}
                  size="md" 
                  compact 
                  onClick={ ()=>{
                    if(running){
                      onStop();
                    }else{
                      onGo();
                    }
                    setRunning((r) => !r);
                  }}
                >
                    {running?'Stop':'Go'}
                </Button>
                <Text>Speed:</Text>
                <SegmentedControl data={['I', 'II', 'III', 'IV']} onChange = {(e)=>{setCurrentSpeed(e); start(e)}} />
                <Button 
                  color="indigo"
                  size="md" 
                  compact 
                  onClick={updateBoard}
                >
                    Step one!
                </Button>
                <Button 
                  color="indigo"
                  size="md" 
                  compact 
                  onClick={()=>{setBoard(Array<boolean>(boardSize*boardSize).fill(false))}}
                >
                    Clear board
                </Button>
            </Group>
          </Group>
        </Center>
      </AppShell>
    );
}