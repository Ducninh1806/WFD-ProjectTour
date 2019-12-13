import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../../service-info/service/user.service';
import {IUser} from '../../service-info/info/i-user';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  @Input() userId: number;
  @Output() valueChange = new EventEmitter<IUser[]>();
  listUser: IUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onDeleteUser() {
    console.log(this.userId);
    this.userService.deleteUser(this.userId).subscribe(
      next => {
        this.onGetListUser();
        console.log('Da xoa thanh cong');
      }, error => {
        console.log(error);
      }
    );
  }

  onGetListUser() {
    this.userService.getListUser().subscribe(
      data => {
        this.listUser = data;
        this.valueChange.emit(this.listUser);
      }
    );
  }
  refreshPage() {
    window.location.reload();
  }

}
