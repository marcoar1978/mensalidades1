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
import { ValoresConfig } from '../models/ValoresConfig';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValoresConfigService {

  valoresSubject: BehaviorSubject<ValoresConfig[]> = new BehaviorSubject<ValoresConfig[]>([]);
  valoresFirestore!: CollectionReference<DocumentData>;

  constructor(private firestore: Firestore) { 
    this.valoresFirestore = collection(this.firestore, 'config');
  }

  getAll(): Observable<ValoresConfig[]>{
    return collectionData(this.valoresFirestore, {idField: 'id'}) as Observable<ValoresConfig[]>;
  }
}
