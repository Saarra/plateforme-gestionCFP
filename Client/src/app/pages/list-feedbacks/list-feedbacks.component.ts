import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Feedback } from 'src/app/Model/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-list-feedbacks',
  templateUrl: './list-feedbacks.component.html',
  styleUrls: ['./list-feedbacks.component.css']
})
export class ListFeedbacksComponent implements OnInit {
  crud_operation = {is_new: false, is_visible: false};
  data: Feedback[];
  current_Feedback: Feedback;

  constructor(
    private service: FeedbackService,
     private toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.read().subscribe( (res: any) => {
      this.data = res;
      this.current_Feedback = new Feedback();
    });
  }
  delete(id) {
    this.service.delete(id).subscribe( res => {
      this.crud_operation.is_new = false;
      this.ngOnInit();
      this.toastr.info('Feedback est supprimé !');
    });
  }

}
