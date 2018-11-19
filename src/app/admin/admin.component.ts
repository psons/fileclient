import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  title = 'Message Log';

  constructor(
    public messageService: MessagesService,
  ) { }

  ngOnInit() {
    this.messageService.add('Event with long Message', '' +
      'This is a message that hopefully will show that the message listing on the ' +
      'Admin tab will wrap to accommodate the message, and still be aligned with the ' +
      'Shorter box for the event being described.  in this case, that is just a ' +
      'click to the Admin tab');
  }

}
