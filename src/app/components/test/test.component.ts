import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { first } from "@angular/router/src/utils/collection";
import { ITestQuestion } from "app/classes/question";
import { RouteService } from "app/services/route.service";
import { SchoolService } from "app/services/school.service";

@Component({
  selector: "test",
  templateUrl: "./test.component.html",
})
export class TestComponent implements OnInit, OnDestroy {
  groups: Array<number> = [];
  numberOfQuestions = 0;
  questions: ITestQuestion[] = [];
  checked = false;
  numberOfCorrectAnswers = 0;

  constructor(
    private schoolService: SchoolService,
    private routeService: RouteService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.getTest(this.routeService.getTestRoute());
  }

  ngOnDestroy() {}

  getTest(url: string) {
    if (url != null) {
      this.schoolService
        .getTests()
        .map((ts) => {
          return ts.find((t) => t.id === url);
        })
        .subscribe((t) => {
          window.scroll({ top: 0, behavior: "smooth" });
          const test = t;
          if (!test) {
            return;
          }
          this.numberOfQuestions = test.questions;
          this._makeGroups();
          this._getQuestions();
        });
    }
  }

  private _makeGroups() {
    const initQuestionsPerGroup = Math.floor(this.numberOfQuestions / 10);
    let restQuestions = this.numberOfQuestions % 10;

    const questionsPerGroup = [];

    for (let i = 0; i < 10; i++) {
      questionsPerGroup[i] = initQuestionsPerGroup;
      if (restQuestions > 0) {
        questionsPerGroup[i] += 1;
        restQuestions -= 1;
      }
    }

    let boundary = 0;

    questionsPerGroup.forEach((qpg, i) => {
      boundary += qpg;
      this.groups[i] = boundary;
    });
  }

  private _getQuestions() {
    const questions = [];
    for (let i = 0; i < 10; i++) {
      const last = i === 0 ? 0 : this.groups[i - 1];
      const questionNumber =
        last + Math.floor(Math.random() * (this.groups[i] - last + 1));
      if (questions[i - 1 < 0 ? 0 : i - 1] != questionNumber) {
        questions.push(questionNumber > 0 ? questionNumber : 1);
      } else {
        questions.push(questionNumber + 1);
      }
    }
    this.schoolService
      .getQuestions(this.routeService.getTestRoute(), questions)
      .subscribe((questionsData) => {
        questionsData.forEach((questionData, i) => {
          const questionText = questionData.match(
            /<es-question>([\s\S]*?)<\/es-question>/
          );

          let answersText = [];

          let answersTexttemp = questionData.match(
            /<es-answer>([\s\S]*?)<\/es-answer>/g
          );

          if (answersTexttemp) {
            answersText = answersTexttemp.map((am) => {
              return am.match(/<es-answer>([\s\S]*?)<\/es-answer>/);
            });
          }

          const correctAnswerText = questionData.match(
            /<es-answer-true>([\s\S]*?)<\/es-answer-true>/
          );

          this.questions[i] = {};

          if (questionText) {
            this.questions[i].question = this.sanitizer.bypassSecurityTrustHtml(
              questionText[1]
            );
          }

          const numberOfAnswers = answersText.length + 1;

          const correctAnswerPosition = Math.floor(
            Math.random() * (numberOfAnswers + 1)
          );

          this.questions[i].correctAnswerPosition = correctAnswerPosition;
          this.questions[i].answers = [];
          this.questions[i].user = null;

          if (answersText) {
            let answerPosition = 0;
            answersText.forEach((answ) => {
              if (answerPosition === correctAnswerPosition) {
                answerPosition += 1;
              }

              this.questions[i].answers[answerPosition] = {
                text: this.sanitizer.bypassSecurityTrustHtml(answ[1]),
                correct: false,
              };

              answerPosition += 1;
            });
          }

          if (correctAnswerText) {
            this.questions[i].answers[correctAnswerPosition] = {
              text: this.sanitizer.bypassSecurityTrustHtml(
                correctAnswerText[1]
              ),
              correct: true,
            };
          }
        });

        setTimeout(() => {
          console.log(this.questions);
        }, 5000);
      });
  }

  check() {
    this.questions.forEach((question) => {
      if (parseInt(question.user) === question.correctAnswerPosition) {
        question.userCorrect = true;
        this.numberOfCorrectAnswers += 1;
      } else {
        question.userCorrect = false;
      }
    });
    this.checked = true;
    window.scroll({ top: 0, behavior: "smooth" });
  }

  reload() {
    this.groups = [];
    this.numberOfQuestions = 0;
    this.questions = [];
    this.checked = false;
    this.numberOfCorrectAnswers = 0;
    window.scroll({ top: 0, behavior: "smooth" });
    this.getTest(this.routeService.getTestRoute());
  }
}
