import {TrelloBoard} from './TrelloBoard';
import {TrelloList} from './TrelloList';

export class Task {
  id: number;
  name: string;
  storedName: string;
  content: string;
  storedContent: string;
  trelloBoard: TrelloBoard;
  trelloList: TrelloList;

  constructor(id: number,
              name: string,
              content: string,
              trelloBoard?: TrelloBoard,
              trelloList?: TrelloList) {
    this.id = id;
    this.name = name;
    this.storedName = name;
    this.content = content;
    this.storedContent = content;
    this.trelloBoard = trelloBoard;
    this.trelloList = trelloList;
  }

  getLists(): TrelloList[] {
    if (this.trelloBoard && this.trelloBoard.lists) {
      return this.trelloBoard.lists;
    }
    return [];
  }

  isModified(): boolean {
    return ((this.name || this.storedName) && this.name !== this.storedName) ||
      ((this.content || this.storedContent) && this.content !== this.storedContent);
  }
}
