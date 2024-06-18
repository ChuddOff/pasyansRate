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

export interface ProfileResponse {
    name: string;
    elo: number;
    bestEasy: number;
    bestHard: number;
    wins: number;
    fails:number;
    fullName: string;
    url: string;
}

export interface ProfileBody {
  name: string;
}

export interface ProfilePostBody {
  name: string;
  fullName: string;
  url: string;
}

export interface EloBody {
  name: string;
  eloChange: number;
}

export interface TimeBody {
  name: string;
  seconds: number;
  type: string
}