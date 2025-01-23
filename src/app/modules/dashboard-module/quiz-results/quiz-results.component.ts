import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { QuizResult } from '../../../shared/models/QuizResult/quiz-result';
import { NgxPaginationModule } from 'ngx-pagination';
import { Request } from '../../../shared/models/Request/request';
import { PusherService } from '../../../shared/services/pusher/pusher.service';
import Pusher from 'pusher-js';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, HeaderBannerComponent, NgxPaginationModule],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.css'
})
export class QuizResultsComponent implements OnInit, OnDestroy {

  requestParamModel = new Request();
  quizResultList: QuizResult[] = [];
  searchText = '';
  pusherInstance:any;
  channel: any;

  constructor(private quizService: QuizService, private tostr: ToastrService, private pusherService: PusherService) {}

  ngOnInit(): void {
    this.channel = this.pusherService.getChannel('my-channel');
    console.log(this.channel);
    // Listen for events on the channel
    this.channel.bind('my-event', (data: any) => {
      // console.log(data.dataValue);

      let formatedTime = parseInt(data.dataValue.createTime) * 1000;
      data.dataValue.submitedTime = formatedTime.toString();

      this.quizResultList.push(data.dataValue);
    });

    this.loadQuizResultList();
  }

  ngOnDestroy() {
    // Cleanup: unsubscribe from the channel
    this.pusherService.unsubscribe('my-channel');
  }

  loadQuizResultList() {
    this.requestParamModel.token = sessionStorage.getItem("authToken");

    this.quizService.getQuizResults(this.requestParamModel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: QuizResult) => {
          let formatedTime = parseInt(el.submitedTime) * 1000;
          el.submitedTime = formatedTime.toString();

          this.quizResultList.push(el);
        })
      } else {
        this.tostr.error("Error reciving List", resp.message);
      }
    })
  }

  pageChanged(event: any) {

  }

}
