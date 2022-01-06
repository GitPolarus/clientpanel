import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private clientsCollection: AngularFirestoreCollection<Client>;
  private clientDocument?: AngularFirestoreDocument<Client>;
  clients?: Observable<Client[]>;
  client?: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('lastName', 'asc'))

  }

  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection?.snapshotChanges().pipe(map((changes: any) => changes.map((action: any) => {
      const data = action.payload.doc.data() as Client;
      data.id = action.payload.doc.id;
      return data;
    })));
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDocument = this.afs.doc<Client>('clients/' + id);
    this.client = this.clientDocument.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return new Client();
      } else {
        const data = action.payload.data() as Client;
        data.id = action.payload.id;
        return data;
      }
    }));
    return this.client;
  }
}
