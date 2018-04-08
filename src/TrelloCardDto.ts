export class TrelloCardDto {
  name: string;
  description: string;
  listId: string;

  constructor(name: string, description: string, listId: string) {
    this.name = name;
    this.description = description;
    this.listId = listId;
  }
}
