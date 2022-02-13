import './Rules.css'
import {Ruleset} from '../../Services/rules'
type RulesProps = {
   boardSize: number;
   ruleset: Ruleset;
};
export const Rules = (props: RulesProps) =>{
   return( 
      <div className='rulesContainer'>
         <h2>Rules</h2>
         <h3>Board type:</h3>
         <h3>Board size:</h3>
         <h3>Neighbours:</h3>
         <h3>Life conditions:</h3>
         <h3>Death conditions:</h3>
      </div>
   );
}