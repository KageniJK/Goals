import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { Goals } from '../goals';
import {GoalService} from '../goals/goal.service';
import {AlertsService} from '../alert-service/alerts.service';
import {QuoteRequestService} from '../quote-http/quote-request.service';

import {HttpClient} from '@angular/common/http';

import {Quote} from '../quote-class/quote';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService, QuoteRequestService],
})
export class GoalComponent implements OnInit {
  goals = Goals;
  goal: Goal[];
  quote: Quote;
  alertService: AlertsService;

  // constructor(goalService: GoalService) {
  // this.goals = goalService.getGoals();
  //  }

  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  // completeGoal(isComplete, index) {
  //   if (isComplete) {
  //     this.goals.splice(index, 1);
  //   }
  // }

  addNewGoal(goal) {
    const goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date (goal.completeDate);
    this.goals.push(goal);
  }

  completeGoal(isComplete, index) {
       if (isComplete) {

           const toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`);

           if (toDelete) {
               this.goals.splice(index, 1);
               this.alertService.alertMe('Goal has been deleted');
           }

       }
   }

   constructor(goalService: GoalService, alertService: AlertsService, private quoteService: QuoteRequestService) {
    this.goals = goalService.getGoals();
    this.alertService = alertService;
     }


  ngOnInit() {
    this.quoteService.quoteRequest();
    this.quote = this.quoteService.quote;
}
}
