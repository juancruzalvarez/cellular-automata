import { ScrollArea } from '@mantine/core';
import { CSSProperties } from 'react';
import './Board.css';
type BoardProps = {
   board: boolean[];
};
export const Board = ({board}: BoardProps) =>{
   let boardSize = Math.sqrt(board.length);
   console.log(boardSize);
   let style: CSSProperties = {
      gridTemplateColumns:`repeat(${boardSize}, 1fr)`,
      gridTemplateRows:`repeat(${boardSize}, 1fr)`
   };
   return (
      <ScrollArea >
         <div className='board' style={style}>
            {board.map((element)=>{return <div className={element?'cell alive':'cell dead'}></div>})}
         </div>
      </ScrollArea>
   );
}