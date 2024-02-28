export type Card = {
  id: number;
  content: string;
  position: number;
  columnId: number;
};

export type Column = {
  id: number;
  name: string;
  cards: Card[];
};
