import { CSSProperties } from 'react';
import './Board.css';
type BoardProps = {
   board: boolean[];
};
export const Board = ({board}: BoardProps) =>{
   let boardSize = Math.sqrt(board.length);
   let style: CSSProperties = {
      gridTemplateColumns:`repeat(${boardSize}, 1fr)`,
      gridTemplateRows:`repeat(${boardSize}, 1fr)`
   };
   return (
      <div className='board' style={style}>
         {board.map((element)=>{return <div className={element?'cell alive':'cell dead'}></div>})}
      </div>
   );
}