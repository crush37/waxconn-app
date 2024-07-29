import { Injectable } from '@angular/core';
import Pusher, { Channel } from 'pusher-js';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: Pusher;
  private channel: Channel | null = null;

  constructor() {
    this.pusher = new Pusher('37a724cb1778cab1a693', {
      cluster: 'eu',
    });
  }

  subscribe(channelName: string): void {
    this.channel = this.pusher.subscribe(channelName);
  }

  bind(eventName: string, callback: (data: any) => void): void {
    if (this.channel) {
      this.channel.bind(eventName, callback);
    }
  }

  unbind(eventName: string): void {
    if (this.channel) {
      this.channel.unbind(eventName);
    }
  }

  disconnect(): void {
    this.pusher.disconnect();
  }
}
