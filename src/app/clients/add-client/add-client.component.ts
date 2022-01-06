import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = new Client();
  disableBalanceOnAdd: boolean = false;
  // @ViewChild('clientForm') clientForm : Client;
  constructor(private flashMessagesService: FlashMessagesService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(clientForm: any) {
    this.clientService.newClient(clientForm.value);
    this.flashMessagesService.show('New Client added successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
  }

}
