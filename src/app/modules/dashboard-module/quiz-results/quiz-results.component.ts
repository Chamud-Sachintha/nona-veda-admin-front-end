import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { QuizResult } from '../../../shared/models/QuizResult/quiz-result';
import { NgxPaginationModule } from 'ngx-pagination';
import { Request } from '../../../shared/models/Request/request';

@Component({
  selector: 'app-quiz-results',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxSpinnerModule, HeaderBannerComponent, NgxPaginationModule],
  templateUrl: './quiz-results.component.html',
  styleUrl: './quiz-results.component.css'
})
export class QuizResultsComponent implements OnInit {

  requestParamModel = new Request();
  quizResultList: QuizResult[] = [];
  searchText = '';

  constructor(private quizService: QuizService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.loadQuizResultList();
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
