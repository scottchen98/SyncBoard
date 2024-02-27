export type Card = {
  id: number;
  content: string;
};

export type Column = {
  id: number;
  name: string;
  cards: Card[];
};
