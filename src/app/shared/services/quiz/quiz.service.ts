import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Quiz } from '../../models/Quiz/quiz';
import { Request } from '../../models/Request/request';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  addNewQuiz(quizModel: Quiz) {
    const path = environment.apiUrl + "add-new-question";
    return this.http.post(path, quizModel);
  }

  getQuestionList(requestParamModel: Request) {
    const path = environment.apiUrl + "get-question-list";
    return this.http.post(path, requestParamModel);
  }
}
