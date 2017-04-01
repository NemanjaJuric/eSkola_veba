import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Person } from '../../classes/person';

@Component({
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private schoolService: SchoolService) { };

  private personsMainPosition: Array<Person>;
  private personsOtherPosition: Array<Person>;

  ngOnInit() {
    this.getProgrammers();
    window.scrollTo(0, 0);
  }

  getProgrammers(): void {
    this.schoolService.getPersons()
      .subscribe(data => {
        this.personsMainPosition = data.filter( person => person.mainPosition === true);
        this.personsOtherPosition = data.filter( person => person.mainPosition === false);
      });
  }

}
