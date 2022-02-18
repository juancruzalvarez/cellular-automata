import { ScrollArea } from '@mantine/core';
import { CSSProperties } from 'react';
import './Board.css';
type BoardProps = {
   board: boolean[],
   onClickCell: (index: number)=>void
};
export const Board = ({board, onClickCell}: BoardProps) =>{
   let boardSize = Math.sqrt(board.length);
   let style: CSSProperties = {
      gridTemplateColumns:`repeat(${boardSize}, 1fr)`,
      gridTemplateRows:`repeat(${boardSize}, 1fr)`
   };
   return (
      <ScrollArea style={{height:'80vh', aspectRatio:'1'}}>
         <div className='board' style={style}>
            {board.map((element, index)=>{return <div className={element?'cell alive':'cell dead'} key={index} onClick={()=>onClickCell(index)}></div>})}
         </div>
      </ScrollArea>
   );
}