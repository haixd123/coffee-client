import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

interface Message {
  content: string;
}

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {
  private stompClient;

  private currentUser: any;
  // Sử dụng Subject để quản lý các sự kiện nhận được từ WebSocket
  private commentSubject = new Subject<string>();

  private notificationSubject = new Subject<any>();

  constructor() {
    // Khởi tạo kết nối WebSocket khi service được tạo
    this.initializeWebSocketConnection();
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  private initializeWebSocketConnection() {
    // Tạo một đối tượng SockJS để kết nối đến endpoint '/ws' của server
    const socket = new WebSocket('ws://127.0.0.1:8080/ws/websocket');

    // Tạo một đối tượng Stomp để giao tiếp qua WebSocket
    this.stompClient = Stomp.over(socket);

    // Kết nối đến server thông qua WebSocket
    this.stompClient.connect({}, () => {
      // Subscribe để lắng nghe thông báo từ endpoint '/topic/comments'
      this.stompClient.subscribe('/topic/comments', (comment) => {
        // Khi có thông báo mới, đẩy vào Subject để thông báo cho các thành phần khác
        this.commentSubject.next(comment.body);
      });
      this.stompClient.subscribe("/notifications", (resp) => {
        this.handleNotification(resp.body);
      });
    });
  }
  handleNotification(notification: any) {
    console.log(this.currentUser.userName);
    // if (notification?.username == this.currentUser.userName) {
      this.notificationSubject.next(notification);
    // }
  }

  // Phương thức để gửi comment lên server
  sendComment(comment1: any, comment2: any): void {
    this.stompClient.send('/app/send-comment', {}, comment1, comment2);
  }

  // Phương thức trả về một Observable để lắng nghe sự kiện nhận comment mới
  receiveComment(): Observable<string> {
    return this.commentSubject.asObservable();
  }

  receiveNotification(): Observable<any> {
    return this.notificationSubject.asObservable();
  }

  // sendMessage(message: Message) {
  //   this.stompClient.publish({
  //     destination: '/app/chat',
  //     body: JSON.stringify(message)
  //   });
  // }
  //
  // subscribeToMessages(callback: (message: Message) => void) {
  //   this.stompClient.subscribe('/topic/messages', (response) => {
  //     const message = JSON.parse(response.body) as Message;
  //     callback(message);
  //   });
  // }
}

