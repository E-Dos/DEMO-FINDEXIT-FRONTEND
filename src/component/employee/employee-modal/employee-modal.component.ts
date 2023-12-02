import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { User } from 'src/component/models/user.model';
import { ApiService } from 'src/component/services/api.service';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.scss']
})
export class EmployeeModalComponent implements OnInit {
  model: User = new User;
  curUser: any
  title:string=''
  isEdit = false;
  isCreate = false;
  public loading = false
  public loadingMessage: string = `Загрузка...`;
  public spinnerStatus: string = 'primary';

  constructor(private userService: User,
    public toastService: NbToastrService,
    private apiService: ApiService,
    protected ref: NbDialogRef<EmployeeModalComponent>) { }

  async ngOnInit() {
  }

  create() {
    this.loading = true;
    this.userService.CreateItem(this.model).then(data => {
      this.ref.close(true);
    }).catch(err => {
      this.loading = false;
      this.toastService.show(JSON.stringify(err), 'Ошибка!', {
        status: 'danger'
      })
    })
  }

  update() {
    this.loading = true;
    this.userService.UpdateItem(this.model).then(data => {
      this.ref.close(true);
    }).catch(err => {
      console.log(err)
      this.loading = false;
      this.toastService.show(`${err.data.status}-${err.data.title}`, 'Ошибка!', {
        status: 'danger'
      })
    })
  }

  dismiss() {
    this.ref.close(true)
  }
}
