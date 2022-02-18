import {Ruleset, defaultRuleset, Condition, MAX_BOARD_SIZE,MIN_BOARD_SIZE, BoardType, Neighbours} from '../../Services/rules'
import {NativeSelect, Title, NumberInput, Group, Button, Divider, Space } from '@mantine/core';
import {useState } from 'react';
import {cloneDeep, isEqual} from 'lodash'

type RulesProps = {
   onRulesChangeSave: (newRules:Ruleset, newBoardSize: number)=>void;
};

export const Rules = ({onRulesChangeSave}: RulesProps) =>{
   const [originalRuleset, setOriginalRuleset] = useState<Ruleset>(defaultRuleset);  //used for checking if there is changes to save.
   const [originalBoardSize, setOriginalBoardSize] = useState<number>(20);
   const [ruleset, setRuleset] = useState<Ruleset>(defaultRuleset);
   const [boardSize, setBoardSize] = useState<number>(20);

   const defaultCondition: Condition = {property:'liveNeighbourCount', predicate:'greaterThan', value:3};

   const areThereChanges= (): boolean=>{
      return !(isEqual(originalRuleset, ruleset) && boardSize === originalBoardSize);
   };

   const onAddCondition = (life: boolean) =>{
      setRuleset((last)=>{
         let newRuleset = cloneDeep(last);
         if(life){
            newRuleset.liveConditions.push(defaultCondition);
         }else{
            newRuleset.deathConditions.push(defaultCondition);
         }
         return newRuleset;
      });
   };

   const onRemoveCondition = (life: boolean, index: number) =>{
      setRuleset( (last)=>{
         let newRuleset = cloneDeep(last);
         if(life){
            newRuleset.liveConditions.splice(index, 1);
         }else{
            newRuleset.deathConditions.splice(index, 1);
         }
         return newRuleset;
      });
      
   };

   const onConditionChange = (life:boolean, index:number, newCondition:Condition) =>{
      setRuleset( (last)=>{
         let array =[ ...(life? last.liveConditions : last.deathConditions)];
         array[index] = newCondition;
         if(life){
            return {...last, liveConditions: array};
         }else{
            return {...last, deathConditions: array};
         }
      });
   };

   return( 
      <>
         <Title order={3}>Rules:</Title>
         <NativeSelect
            data={[
               { value: 'torus' , label: 'Torus' },
               { value: 'outsideDead', label: 'Outside cells are dead' },
               { value: 'outsideAlive', label: 'Outside cells are alive' }
            ]}
            value={ruleset.boardType}
            label="Board type:"
            radius="xs"
            onChange={
               (e) =>{
                  let newBoardType = e.currentTarget.value as BoardType;
                  setRuleset((last) =>{
                     return {...last, boardType:newBoardType};
                  });
               }
            }
         />
         <NumberInput
            value={boardSize}
            label="Board size:"
            min={MIN_BOARD_SIZE}
            max={MAX_BOARD_SIZE}
            step={5}
            onChange={
               (newBoardSize) =>{
                  if(newBoardSize!>=MIN_BOARD_SIZE && newBoardSize!<=MAX_BOARD_SIZE)
                  setBoardSize(newBoardSize!);
               }
            }
         />

         <NativeSelect
            data={[
               { value: '4' , label: '4' },
               { value: '8', label: '8' }
               ]}
            value={ruleset.neighbourCount}
            label="Neighbour count:"
            radius="xs"
            onChange={
               (e) =>{
                  let newNeighbourCount = Number.parseInt(e.currentTarget.value) as (4|8);
                  setRuleset((last) =>{
                     return {...last, neighbourCount:newNeighbourCount};
                  });
               }
            }
         />
         <Space  h="md"/>
         <Divider />
         <Title order={4}>Life conditions:</Title>
         {
            ruleset.liveConditions.map( (element, index) =>{
               return <ConditionDisplay key = {index} condition={element} neighbourCount={ruleset.neighbourCount} onChange={(condition:Condition)=>onConditionChange(true,index,condition)} onRemove = {()=>onRemoveCondition(true, index)}/>
            })
         }
         <Button color={'lime'} variant="outline" size={'md'} style={{marginTop:'0.5em', width:'100%'}} onClick={()=>onAddCondition(true)} >+</Button>
         <Space  h="md"/>
         <Divider />
         <Title order={4}>Death conditions:</Title>
         {
            ruleset.deathConditions.map( (element, index) =>{
               return <ConditionDisplay key = {index} condition={element} neighbourCount={ruleset.neighbourCount} onChange={(condition:Condition)=>onConditionChange(false,index,condition)} onRemove = {()=>onRemoveCondition(false, index)}/>
            })
            
         }
         <Button color={'lime'} variant="outline" size={'md'} style={{marginTop:'0.5em', width:'100%'}} onClick={()=>onAddCondition(false)} >+</Button>
         <Space  h="md"/>
         <Button color='lime' disabled = {!areThereChanges()} style={{marginTop:'0.5em', width:'100%'}} onClick= {()=>{setOriginalRuleset(ruleset); setOriginalBoardSize(boardSize); onRulesChangeSave(ruleset, boardSize)} }>Save changes</Button>
      </>

   );
}

type ConditionDisplayProps = { 
   condition:Condition;
   neighbourCount:number;
   onChange: (condition:Condition)=>void;
   onRemove: ()=>void;
}

const ConditionDisplay = ({condition, neighbourCount, onChange, onRemove}: ConditionDisplayProps) =>{
   const properties= [{value:'liveNeighbourCount', label:'Live neighbours'},
                      {value:'left', label:'Left neighbour'},  
                      {value:'right', label:'Right neighbour'},
                      {value:'up', label:'Up neighbour'},
                      {value:'down', label:'Down neighbour'}];
   const predicates = [{value: 'equals', label:'='},
                       {value: 'notEquals', label:'≠'}];

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
         <Group>
         <NativeSelect
            data={properties}
            value={condition.property}
            radius="xs"
            onChange={
               (e) =>{
                  let newProperty = e.currentTarget.value as (Neighbours | 'liveNeighbourCount');
                  if(newProperty !== condition.property && (newProperty === 'liveNeighbourCount' || condition.property === 'liveNeighbourCount')){
                     if(newProperty === 'liveNeighbourCount'){
                        onChange({property:newProperty, predicate:'lessThan', value:3});
                     }else{
                        onChange({property:newProperty, predicate:'equals', value:true});
                     }
                  }else{
                     onChange({property:newProperty, predicate:condition.predicate, value:condition.value});
                  }
               }
            }
         />
         <NativeSelect
            data={predicates}
            value={condition.predicate}
            radius="xs"
            onChange={
               (e) =>{
                  let newPredicate = e.currentTarget.value as ('equals' | 'notEquals' | 'lessThan' |'greaterThan');
                  onChange({property:condition.property, predicate:newPredicate, value:condition.value});
               }
            }
         />
         <NativeSelect
            data={values}
            value={Number.isNaN(condition.value) ? (condition.value?'alive':'dead'):condition.value as number}
            radius="xs"
            onChange={
               (e) =>{
                  let tmp = e.currentTarget.value;
                  let newValue: (number | boolean);
                  if(Number.isNaN(tmp)){
                     newValue = tmp === 'alive'? true: false;
                  }else{
                     newValue = Number.parseInt(tmp);
                  }
                  onChange({property:condition.property, predicate:condition.predicate, value:newValue});
               }
            }
         />
         <Button color="red" size="md" compact onClick={onRemove}>
            X
         </Button>
         </Group>
      </>
   );
}