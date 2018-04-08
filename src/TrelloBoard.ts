import {TrelloList} from './TrelloList';

export class TrelloBoard {
  id: string;
  name: string;
  lists: TrelloList[];

  constructor(name: string, trelloLists: TrelloList[]) {
    this.name = name;
    this.lists = trelloLists;
  }
}
