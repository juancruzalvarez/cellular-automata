import './Rules.css'
import {Ruleset, defaultRuleset, Condition, Neighbours} from '../../Services/rules'
import {NativeSelect, Title, NumberInput, Group } from '@mantine/core';
import {useState } from 'react';

type RulesProps = {
   onChange: (newRules:Ruleset, newBoardSize: number)=>void;
};

export const Rules = ({onChange}: RulesProps) =>{
   const [ruleset, setRuleset] = useState(defaultRuleset);
   const [boardSize, setBoardSize] = useState(50);

   return( 
      <>
         <Title order={3}>Rules:</Title>
         <NativeSelect
            data={[
               { value: 'torus' , label: 'Torus' },
               { value: 'outsideDead', label: 'Outside cells are dead' },
               { value: 'outsideAlive', label: 'Outside cells are alive' }
            ]}
            label="Board type:"
            radius="xs"
         />
         <NumberInput
            defaultValue={25}
            label="Board size:"
            min={10}
            max={200}
            step={5}
         />
         <NativeSelect
            data={[
               { value: '4' , label: '4' },
               { value: '8', label: '8' }
               ]}
            label="Neighbour count:"
            radius="xs"
         />
         {
            ruleset.liveConditions.map( (element) =>{
               return <ConditionDisplay condition={element} neighbourCount={ruleset.neighbourCount} onChange={()=>{return;}}/>
            })
         }
         {
            ruleset.deathConditions.map( (element) =>{
               return <ConditionDisplay condition={element} neighbourCount={ruleset.neighbourCount} onChange={()=>{return;}}/>
            })
         }
      </>
   );
}

type ConditionDisplayProps = {
   condition:Condition;
   neighbourCount:number;
   onChange: ()=>void;
}

const ConditionDisplay = ({condition, neighbourCount, onChange}: ConditionDisplayProps) =>{
   const properties= [{value:'liveNeighbourCount', label:'Live neighbours'},
                      {value:'left', label:'Left neighbour'},  
                      {value:'right', label:'Right neighbour'},
                      {value:'up', label:'Up neighbour'},
                      {value:'down', label:'Down neighbour'}];
   const predicates = [{value: 'equals', label:'='}];

   const values = [];

   let cornerNeighbours = [{value:'leftDown', label:'Left down neighbour'},  
                           {value:'leftUp', label:'Left up neighbour'},
                           {value:'rightDown', label:'Right down neighbour'},
                           {value:'rightUp', label:'Right up neighbour'}];

   if(neighbourCount === 8){
      properties.push(...cornerNeighbours);
   }

   if(condition.property === 'liveNeighbourCount'){
      predicates.push({value:'lessThan', label:'<'}, {value:'greaterThan', label:'>'});
      for(let i= 0; i<=neighbourCount; i++){
         values.push({value:i.toString(), label:i.toString()});
      }
   }else{
      values.push({value:'alive', label:'alive'});
      values.push({value:'dead', label:'dead'});
   } 
   return ( 
      <>
         <Title order={3}>Condition:</Title>
         <Group>
         <NativeSelect
            data={properties}
            radius="xs"
         />
         <NativeSelect
            data={predicates}
            radius="xs"
         />
         <NativeSelect
            data={values}
            radius="xs"
         />
         </Group>
      </>
   );
}