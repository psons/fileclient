import { Injectable } from '@angular/core';
import {EventMessage} from './admin/event-message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  messages: EventMessage[] = [];

  add(event: string, message: string) {
    this.messages.push(new EventMessage(event, message));
  }

  clear() {
    this.messages = [];
  }
}
