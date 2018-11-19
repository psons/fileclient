export class EventMessage {
  public event: string;
  public message: string;

  constructor( event: string, message: string) {
    this.event = event;
    this.message = message;
  }
}
