import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

    Messages: { Text: string, Type: 'success' | 'danger' } [];

  constructor() {
    this.Messages = [
    ];
  }

}
