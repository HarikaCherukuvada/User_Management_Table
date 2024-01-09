import { Component, OnInit } from '@angular/core';
import { TableService } from '../table.service';
import { iUser } from '../interfaces/table-variables-interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  users: iUser[] = [];
  expandedUser: any = {};

  constructor(
    public tableService : TableService
  ) { }

  ngOnInit(): void {
    this.getTableList();
  }

  getTableList() {
    this.tableService.getTableData().subscribe(
      (data: iUser[] | { users: iUser[] }) => {
        if (Array.isArray(data)) {
          this.users = data.map(user => ({ ...user, isShow: false, isSaving: false }));
        } else if ('users' in data) {
          this.users = data.users.map(user => ({ ...user, isShow: false, isSaving: false }));
        } else {
          console.error('Invalid data format:', data);
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  toggleExpandableRow(index: number): void {
    this.users[index].isShow = !this.users[index].isShow;
    console.log('Expanded User:', this.users[index]);

    this.expandedUser = this.users[index].isShow ? this.users[index] : {};
    console.log(this.expandedUser);
  }

  saveUser(user: iUser) : void {
    user.isSaving = true;
    setTimeout(() => {
      user.isSaving = false;
    }, 1500);
    console.log(user.isSaving = true, 'User Saved');
  }

  cancelUser(user: iUser) : void {
    user.isSaving = false;
    this.toggleExpandableRow(this.users.indexOf(user));
    console.log('User Cancelled');
  }
}
