import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';
import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { Mensalista } from '../models/Mensalista';

@Injectable({
  providedIn: 'root'
})
export class MensalistaService {

  mensalistaSubject: BehaviorSubject<Mensalista[]> = new BehaviorSubject<Mensalista[]>([]);

  mensalistaFirestore!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) { 
    this.mensalistaFirestore = collection(this.firestore, 'mensalistas');
   }

  getAll(): Observable<Mensalista[]>{
    return collectionData(this.mensalistaFirestore, {idField: 'id'}) as Observable<Mensalista[]>;
    }

  update(mensalista: Mensalista) {
    const mensalistaDocumentReference = doc(this.firestore, `mensalistas/${mensalista.id}`);
    return updateDoc(mensalistaDocumentReference, {...mensalista});
  }

  get(id: string): Observable<Mensalista> {
    const mensalistaDocumentReference = doc(this.firestore, `mensalistas/${id}`);
    return docData(mensalistaDocumentReference, { idField: 'id' }) as  Observable<Mensalista>;

  }
  
  


}
