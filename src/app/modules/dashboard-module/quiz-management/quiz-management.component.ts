import { Component, OnInit } from '@angular/core';
import { HeaderBannerComponent } from '../../../shared/header-banner/header-banner.component';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Quiz } from '../../../shared/models/Quiz/quiz';
import { QuizService } from '../../../shared/services/quiz/quiz.service';
import { ToastrService } from 'ngx-toastr';
import { Request } from '../../../shared/models/Request/request';

@Component({
  selector: 'app-quiz-management',
  standalone: true,
  imports: [HeaderBannerComponent, CommonModule, NgxSpinnerModule, NgxPaginationModule, FormsModule, ReactiveFormsModule],
  templateUrl: './quiz-management.component.html',
  styleUrl: './quiz-management.component.css'
})
export class QuizManagementComponent implements OnInit {

  requestParamMdoel = new Request();
  questionModel = new Quiz();
  addQuestionForm!: FormGroup;
  questionList: Quiz[] = [];
  searchText = '';

  constructor (private formBuilder: FormBuilder, private quizService: QuizService, private tostr: ToastrService) {}

  ngOnInit(): void {
    this.initAddQuestionForm();
    this.loadQuestionList();
  }

  loadQuestionList() {
    this.requestParamMdoel.token = sessionStorage.getItem("authToken");

    this.quizService.getQuestionList(this.requestParamMdoel).subscribe((resp: any) => {
      if (resp.code === 1) {
        const dataList = JSON.parse(JSON.stringify(resp));

        dataList.data[0].forEach((el: any) => {
          var formatedDate = parseInt(el.createTime) * 1000
          el.createTime = formatedDate.toString();
          this.questionList.push(el);
        })
      }
    })
  }

  onSubmitAddQuestionForm() {
    const questionName = this.addQuestionForm.controls['questionName'].value;
    const questionCategory = this.addQuestionForm.controls['questionType'].value;
    const questionAnswers = this.addQuestionForm.controls['questionAnswers'].value;

    if (questionName == "") {
      this.tostr.error("E,toy Fields Found", "Question Name is required.");
    } else if (questionCategory == "") {
      this.tostr.error("Empty fields found", "Question category is required.");
    } else if (questionAnswers == "") {
      this.tostr.error("Empty feilds found", "Answers is required.");
    } else {
      this.questionModel.quistionName = questionName;
      this.questionModel.quiestionCategoryType = questionCategory;
      this.questionModel.questionAnswer = questionAnswers;
      this.questionModel.token = sessionStorage.getItem("authToken");

      this.quizService.addNewQuiz(this.questionModel).subscribe((resp: any) => {
        if (resp.code === 1) {
          this.tostr.success("Add New Quiztion", "New Quiztion Added Successfully");
        } else {
          this.tostr.error("Add New Quiztion", resp.message);
        }
      })
    }
  }

  initAddQuestionForm() {
    this.addQuestionForm = this.formBuilder.group({
      questionName: ['', Validators.required],
      questionType: ['', Validators.required],
      questionAnswers: ['', Validators.required]
    })
  }

  pageChanged(event: any) {

  }

}
