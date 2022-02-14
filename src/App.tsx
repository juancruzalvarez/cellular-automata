import { Board } from "./Components/Board/Board"
import { Rules } from './Components/Rules/Rules'
import { Ruleset } from "./Services/rules"
import { Container, Row, Col} from "react-bootstrap";
import './styles.scss';
import './App.css'
export const App = () =>{
   let board = [
      true,false,false,false,true,true,false,true,
      false,true,false,false,false,true,true,false,
      false,true,false,true,false,true,true,false,
      false,false,true,true,false,true,true,false,
      false,false,true,false,false,true,true,false,
      false,true,false,false,false,true,true,false,
      false,true,false,false,false,true,true,false,
      false,true,false,false,false,true,true,false];
   let rules: Ruleset ={
      boardType: 'outsideDead',
      neighbourCount: 4,
      deathConditions: [],
      liveConditions: []
   };
  
   return(
      <Container>
         <Row>
            <Col xs={12} md={8}>
               <Board board = {board}/>
            </Col>
            <Col xs={6} md={4}>
               <Rules ruleset={rules} boardSize={8}/>
            </Col>
         </Row>   
      </Container>
   ); 
}