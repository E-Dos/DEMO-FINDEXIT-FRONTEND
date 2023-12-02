import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Tasks } from 'src/component/models/tasks.model';
import { User } from 'src/component/models/user.model';
import { ApiService } from 'src/component/services/api.service';
import { TasksModalComponent } from '../tasks-modal/tasks-modal.component';

@Component({
  selector: 'app-tasks-list-modal',
  templateUrl: './tasks-list-modal.component.html',
  styleUrls: ['./tasks-list-modal.component.scss']
})
export class TasksListModalComponent implements OnInit {
  taskList: Tasks[] = []
  loading = false
  loadingMessage: string = `Загрузка...`;
  spinnerStatus: string = 'primary';
  title: string = ''
  empModel!: User
  constructor(private taskService: Tasks,
    private apiservice: ApiService,
    private dialogService: NbDialogService,
    protected ref: NbDialogRef<TasksListModalComponent>
  ) { }
  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.taskService.GetById(this.empModel.Id).subscribe(data => {
      this.taskList = data as Tasks[]
    })
    this.loading = false
  }

  addTask() {
    this.dialogService.open(TasksModalComponent, {
      context: {
        model: new Tasks(),
        isCreate: true,
        userId: this.empModel.Id,
        title: `Создание задачи для ${this.empModel.FIO}`
      }
    }).onClose.subscribe(result => {
      if (result) this.loadData()
    })

  }
  dismiss() {
    this.ref.close(true)
  }
  editTask(item: Tasks) {
    this.dialogService.open(TasksModalComponent, {
      context: {
        model: item,
        isEdit: true,
        userId: this.empModel.Id,
        title: `Редактирования задачи для  ${this.empModel.FIO}`
      }
    }).onClose.subscribe(result => {
      if (result) this.loadData()
    })
  }

  async deleteItem(item: Tasks) {
    this.loading = true;
    this.taskService.DeleteItem(item.Id).subscribe(data => {
      this.loadData()
    })
    this.loading = false
  }
}
