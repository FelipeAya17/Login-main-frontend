import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventLoadingService {
  private eventEmitter = new EventEmitter<any>();
  constructor() { }
  get notifyOnStoped(): EventEmitter<any>{
    return this.eventEmitter;
  }
}
