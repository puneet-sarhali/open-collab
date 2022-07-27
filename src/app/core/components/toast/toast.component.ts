import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [MessageService]
})
export class ToastComponent implements OnInit {

  constructor(private messageService: MessageService, private toastService: ToastService) {
    this.toastService.unauthorized$
      .subscribe((value) =>(value) && this.toast("error", "Unauthorized", "Please Sign In." ));
    this.toastService.projectDeleted$
      .subscribe(value => value && this.toast("success", "Deleted", "Project Deleted"));
    this.toastService.projectCreated$
      .subscribe(value => value && this.toast("success", "Created", "Project Created"));
    this.toastService.genericError$
      .subscribe(value => value && this.toast("error", "Unknown", "Unknown Error! Make sure your signed in."))
    this.toastService.genericSuccess$
      .subscribe(value => value && this.toast("success", "Success", ""))
  }

  toast(severity: string, summary: string, detail: string){
    this.messageService.add({severity, summary, detail});
  }

  ngOnInit(): void {
  }

}
