type BoardType = 'torus'|'outsideDead'|'outsideAlive';

type NeighbourCount = 4|8;

export enum Neighbours{
   RIGHT,RIGHT_UP,UP,LEFT_UP,LEFT,LEFT_DOWN,DOWN,RIGHT_DOWN
};

export type Condition ={
   property: 'liveNeighbourCount' | Neighbours;
   predicate: 'equals' | 'lessThan' | 'greaterThan' | 'is';
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
   neighbourCount: 4,
   deathConditions: [{property:'liveNeighbourCount',predicate:'greaterThan',value:4}],
   liveConditions: [{property:'liveNeighbourCount',predicate:'equals',value:3}]
 }