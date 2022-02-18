export type BoardType = 'torus'|'outsideDead'|'outsideAlive';

type NeighbourCount = 4|8;

export type Neighbours = 'right'|'rightUp'|'up'|'leftUp'|'left'|'leftDown'|'down'|'rightDown';

export type Condition ={
   property: 'liveNeighbourCount' | Neighbours;
   predicate: 'equals' | 'notEquals' | 'lessThan' | 'greaterThan';
   value: number | boolean;
};

export type Ruleset = {
   boardType: BoardType;
   neighbourCount: NeighbourCount;
   deathConditions: Condition[];
   liveConditions: Condition[];
};

export const defaultRuleset: Ruleset ={
   boardType: 'outsideDead',
   neighbourCount: 8,
   deathConditions: [{property:'liveNeighbourCount',predicate:'greaterThan',value:3}, {property:'liveNeighbourCount',predicate:'lessThan',value:2}],
   liveConditions: [{property:'liveNeighbourCount',predicate:'equals',value:3}]
 }

 export const MAX_BOARD_SIZE = 50;
 export const MIN_BOARD_SIZE = 3;
 export const DEFAULT_BOARD = [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,true,false,true,false,false,false,false,false,true,true,true,false,false,false,true,false,false,false,true,true,true,false,true,true,true,false,false,false,false,false,true,false,false,false,true,false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,true,false,true,false,false,false,true,false,true,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,true,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,true,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,true,false,true,false,false,false,true,false,true,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,true,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,true,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false,false,false,false,false,false];