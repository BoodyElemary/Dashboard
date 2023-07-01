import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  readonly url: string = 'http://localhost:8081';

  constructor(private loginService: LoginService) {
    console.log(this.loginService.getStoreId());
    this.socket = io(`${this.url}`, {
      extraHeaders: {
        mongodbid: this.loginService.getStoreId(),
      },
    });

    console.log('Socket Is Connected To Server');
  }

  connect(storeId: any): void {
    // this.socket = io(this.url);
    this.socket = io(`${this.url}`, {
      extraHeaders: {
        mongoDBId: storeId,
      },
    });
    console.log('Socket Is Connected To Server');
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  on(eventName: string): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.off(eventName);
      };
    });
  }
}
