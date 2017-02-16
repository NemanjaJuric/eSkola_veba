import { Lesson } from '../classes/lesson'

export class Course {
    name: string;
    id: string;
    logo: string;
    type: string;
    detailsText: string;
    lang: string;
    displayLang: string;
    lessons: Array<Lesson>;
}
