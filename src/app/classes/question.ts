import { SafeHtml } from "@angular/platform-browser";

export interface ITestQuestion {
  question?: SafeHtml;
  answers?: Array<ITestAnswer>;
  user?: string;
  correctAnswerPosition?: number;
  userCorrect?: boolean;
}

export interface ITestAnswer {
  text?: SafeHtml;
  correct?: boolean;
}
