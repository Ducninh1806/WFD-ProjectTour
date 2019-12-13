import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service-info/service/user.service';
import {IUser} from '../../service-info/info/i-user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  listUser: IUser[] = [];

  getIdUser: number;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.onGetListUser();
  }

  onGetListUser() {
    this.userService.getListUser().subscribe(
      data => {
        this.listUser = data;
      }
    );
  }
  onDelUser(userId: number) {
    this.getIdUser = userId;
  }

  receiveUsers(listUser: IUser[]){
    this.listUser = listUser;
  }
}
