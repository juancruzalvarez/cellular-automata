import './Rules.css'
import {Ruleset} from '../../Services/rules'
import {Dropdown, Stack} from 'react-bootstrap'
type RulesProps = {
   boardSize: number;
   ruleset: Ruleset;
};
export const Rules = (props: RulesProps) =>{
   return( 
      <Stack>
         <h2>Rules</h2>
         <Stack direction='horizontal'>
            <h3>Board:</h3>
            <Dropdown>
               <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Dropdown Button
               </Dropdown.Toggle>

               <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Torus</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Outside Dead</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Outside Alive</Dropdown.Item>
               </Dropdown.Menu>
            </Dropdown>
         </Stack>
         <div>
         <h3>Board size:</h3>
         <h3>heñ</h3>
         </div>
         <h3>Neighbours:</h3>
         <h3>Life conditions:</h3>
         <h3>Death conditions:</h3>
      </Stack>
   );
}