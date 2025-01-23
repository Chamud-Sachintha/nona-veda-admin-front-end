import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: Pusher;

  constructor() {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      forceTLS: true
    });
  }

  getChannel(channelName: string) {
    return this.pusher.subscribe(channelName);
  }

  unsubscribe(channelName: string) {
    this.pusher.unsubscribe(channelName);
  }
}