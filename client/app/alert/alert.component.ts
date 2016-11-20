import { Component, OnInit } from '@angular/core';

import { MsgService } from '../services/msg.service';

@Component({
    selector: 'alert',
	styleUrls: ['./app/alert/alert.component.css'],
    templateUrl: './app/alert/alert.component.html'
})

export class AlertComponent {
    message: any;

    constructor(private alertService: MsgService) { }

    ngOnInit() {
        this.alertService.getMessage().subscribe(message => { this.message = message; });
    }
}