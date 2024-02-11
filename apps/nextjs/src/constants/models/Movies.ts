export type TicketsType = {
  id: string;
  ticketCost?: number;
  rows?: number;
  cols?: number;
  seats?: SeatsType;
};

export type SeatsType = {
  [key: string]: number[];
};
