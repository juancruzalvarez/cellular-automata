type BoardType = 'torus'|'outsideDead'|'outsideAlive';

type NeighbourCount = 4|8;

enum Neighbours{
   RIGHT,RIGHT_UP,UP,LEFT_UP,LEFT,LEFT_DOWN,DOWN,RIGHT_DOWN
};

type Condition ={
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