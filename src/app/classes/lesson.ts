export class Lesson {
  name: string;
  url: string;
  type: string;
  parentCourse: string;
  sublessons: Array<Lesson>;
}
