import CardItem from "./card";
import type { Card } from "./types";

export default function CardList({ cards }: { cards: Card[] }) {
  return cards.map((card, index) => (
    <CardItem key={card.id} card={card} index={index} />
  ));
}
