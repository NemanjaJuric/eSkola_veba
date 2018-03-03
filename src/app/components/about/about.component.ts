import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Person } from '../../classes/person';

@Component({
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private schoolService: SchoolService) { };

  persons: Array<Person>;
  personsMainPosition: Array<Person>;
  personsOtherPosition: Array<Person>;

  ngOnInit() {
    this.getProgrammers();
    window.scrollTo(0, 0);
  }

  getProgrammers(): void {
    this.schoolService.getPersons()
      .subscribe(data => {
        this.persons = data;
        this.personsMainPosition = this.persons.filter( person => person.mainPosition === true);
        this.personsOtherPosition = this.persons.filter( person => person.mainPosition === false);
      });
  }

}
