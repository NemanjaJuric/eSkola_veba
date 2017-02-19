import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service';
import { Programmer } from '../../classes/programmer';

@Component({
  selector: 'about',
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(private schoolService: SchoolService) { };

  private programmers: Array<Programmer>;  

  ngOnInit() {
    this.getProgrammers();
    window.scrollTo(0, 0);
  }

  getProgrammers(): void {
      this.schoolService.getProgrammers().subscribe(data => this.programmers = data);
  }

}
