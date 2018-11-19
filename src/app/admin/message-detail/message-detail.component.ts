import {Component, Input, OnInit} from '@angular/core';
import {EventMessage} from '../event-message';

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  @Input() eventMessage: EventMessage;
  constructor() { }

  ngOnInit() {
  }

}
