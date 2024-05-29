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