import { Board } from "./Components/Board/Board"
import { Rules } from './Components/Rules/Rules'
import { Ruleset } from "./Services/rules"
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
      <div className = 'mainContainer'>
         <div className='boardContainer'>
            <Board board = {board}/>
         </div>
         <Rules ruleset={rules} boardSize={8}/>
      </div>
   ); 
}