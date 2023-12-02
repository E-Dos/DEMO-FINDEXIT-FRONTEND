import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { Tasks } from 'src/component/models/tasks.model';
import { ApiService } from 'src/component/services/api.service';
@Component({
  selector: 'app-tasks-modal',
  templateUrl: './tasks-modal.component.html',
  styleUrls: ['./tasks-modal.component.scss']
})
export class TasksModalComponent implements OnInit {
  constructor(private dialogService: NbDialogService,
    private taskService: Tasks,
    public toastService: NbToastrService,
    private apiService: ApiService,
    protected ref: NbDialogRef<TasksModalComponent>,
  ) { }

  model!: Tasks;
  userId!: number
  title: string = ''
  isEdit = false;
  isCreate = false;
  public loading = false
  public loadingMessage: string = `Загрузка...`;
  public spinnerStatus: string = 'primary';

  ngOnInit() {
    this.model.UserId = this.userId
    this.model.StartDate = new Date(this.model.StartDate)
    this.model.EndDate = new Date(this.model.EndDate)
  }

  create() {
    this.loading = true;
    this.taskService.CreateItem(this.model).then(() => {
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
    this.taskService.UpdateItem(this.model).then(data => {
      this.ref.close(true);
    }).catch(err => {
      this.loading = false;
      this.toastService.show(`${err.data.status}-${err.data.title}`, 'Ошибка!', {
        status: 'danger'
      })
    })
  }
  dismiss() {
    this.ref.close()
  }
}
