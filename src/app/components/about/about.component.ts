import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Programmer } from '../../classes/programmer';

@Component({
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private schoolService: SchoolService) { };

  ngOnInit() {
    this.programmers = this.getProgrammers();
    window.scrollTo(0, 0);
  }

  private programmers: Array<Programmer>;

  getProgrammers(): Array<Programmer> {
    return this.schoolService.getProgrammers();
  }

}
