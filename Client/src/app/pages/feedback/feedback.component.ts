import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/Model/feedback';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  current_Feedback: Feedback;
  crud_operation = {is_new: false, is_visible: false};


  constructor(
    private service: FeedbackService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.current_Feedback = new Feedback();
  }
  new() {
    this.current_Feedback = new Feedback();
    this.crud_operation.is_visible = true;
    this.crud_operation.is_new = true;
  }
  save() {
    if (this.crud_operation.is_new) {
      this.service.insert(this.current_Feedback).subscribe( res => {
        this.current_Feedback = new Feedback();
        this.crud_operation.is_visible = false;
        this.ngOnInit();
        this.toastr.success('Feedback est envoyé !');
      });
    }
  }
}
