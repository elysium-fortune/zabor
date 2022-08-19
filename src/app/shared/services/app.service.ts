import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  public use(adminUserService: UserService, ): Promise<{}> {
    return new Promise<{}>((resolve, reject) => {

      let userCount = 0;
      const isAdminPage = location.toString().split('/admin').length > 1; // location.origin +

      if (isAdminPage && localStorage.getItem('adminUser')) {
        userCount++;
 

      if (userCount === 0) {
        resolve('Done');
      }

      }
    });
  }
}
