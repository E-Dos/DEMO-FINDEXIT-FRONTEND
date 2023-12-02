import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { User } from 'src/component/models/user.model';
import { ApiService } from 'src/component/services/api.service';
import { TasksListModalComponent } from 'src/component/tasks/tasks-list-modal/tasks-list-modal.component';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { Tasks } from 'src/component/models/tasks.model';
import html2canvas from 'html2canvas';
import { Helper } from 'src/component/helpers/helper';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('reportForm', { read: TemplateRef })
  myFormTemplate!: TemplateRef<any>;
  @ViewChild('overdueTable') overdueTable!: ElementRef;

  public empList: User[] = []
  public overdueTaskList: Tasks[] = []
  public loading = false
  public loadingMessage: string = `Загрузка...`;
  public spinnerStatus: string = 'primary';
  searchText: string = '';

  constructor(private userService: User,
    private dialogService: NbDialogService,
    private apiservice: ApiService,
    private taskService: Tasks
  ) { }

  ngOnInit() {
    this.loadData();
  }

  get filteredEmpList(): any[] {
    return this.empList.filter(item =>
      item.FIO.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  loadData() {
    this.loading = true;
    this.userService.GetAll().subscribe(data => {
      this.empList = data as User[];
      this.loading = false
    });
  }

  calcAvgCompletionPercent(tasks: Tasks[]): number {
    if (!tasks || tasks.length === 0) {
      return 0;
    }
    let totalTaskPercent = tasks.reduce((sum, task) => sum + task.CompletionPercent, 0)
    return totalTaskPercent / tasks.length
  }

  addEmp() {
    this.dialogService.open(EmployeeModalComponent, {
      context: {
        model: new User(),
        title: 'Добавления сотрудника',
        isCreate: true
      }
    }).onClose.subscribe(result => {
      if (result) this.loadData()
    })
  }

  editEmp(item: User) {
    this.dialogService.open(EmployeeModalComponent, {
      context: {
        model: item,
        title: `Редактирования сотрудника ${item.FIO}`,
        isEdit: true
      }
    }).onClose.subscribe(result => {
      if (result) this.loadData()
    })
  }

  deleteEmp(item: User) {
    this.loading = true;
    this.userService.DeleteItem(item.Id).subscribe(data => {
      this.loadData()
    })
    this.loading = false
  }

  showTask(item: User) {
    this.dialogService.open(TasksListModalComponent, {
      context: {
        title: `Задачи: ${item.FIO}`,
        empModel: item
      }
    }).onClose.subscribe(result => {
      if (result) this.loadData()
    })
  }

  openReportForm(template: TemplateRef<any>) {
    this.taskService.GetOverdueTask().subscribe(data => {
      this.overdueTaskList = data as Tasks[];
      this.overdueTaskList.forEach(task => {
        task.DayOfOverdue = Math.floor((new Date().getTime() - new Date(task.EndDate).getTime()) / (24 * 60 * 60 * 1000));
      })
    })
    this.dialogService.open(template);
  }

  printReport() {
    const overdueTable = this.overdueTable.nativeElement;

    html2canvas(overdueTable).then((canvas) => {
      const printWindow = window.open('', '_blank') ?? window;
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Отчет о просроченных задач</title></head><body>');
      printWindow.document.write('<h1>Отчет о просроченных задач на ' + Helper.digitDate(new Date())
        + '</h1><img src="' + canvas.toDataURL('image/png')
        + '" style="width:100%; max-height:none;margin-top:10%" />');
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    });
  }

  closeReportForm(dataRef: NbDialogRef<void>) {
    dataRef.close();
  }
}
