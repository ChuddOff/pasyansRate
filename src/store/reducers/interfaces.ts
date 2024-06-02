export interface Card {
    code: string;
    image: string;
    images: {
      png: string;
      svg: string;
    };
    suit: string;
    value: string;
  }
  
export interface DeckResponse {
    success: boolean;
    deck_id: string;
    shuffled: boolean;
    cards: Card[];
  }

export interface currentCard {
  suit: string;
  value: string;
  code: string;
  bottom: number;
  columnIndex: number;
  cardIndex: number;
  isOther: boolean;
  isPlace: boolean;
  isField: boolean
}