import { Component, output, signal } from '@angular/core';
import { InvestmentInput } from '../models/investment-input.model';
import { InvestmentService } from '../investment.service';


@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css',
})
export class UserInputComponent {
  calculate = output<InvestmentInput>();
  enteredInitialInvestment = signal('0');
  enteredAnnualInvestment = signal('0');
  enteredExpectedReturn = signal('5');
  enteredDuration = signal('10');

  constructor(private investmentService: InvestmentService) { }

  onSubmit() {

    this.investmentService.calculateInvestmentResults(
      {
        initialInvestment: +this.enteredAnnualInvestment(),
        annualInvestment: +this.enteredAnnualInvestment(),
        expectedReturn: +this.enteredExpectedReturn(),
        enteredDuration: +this.enteredDuration()
      }
    )
    this.enteredInitialInvestment.set('0');
    this.enteredAnnualInvestment.set('0');
    this.enteredExpectedReturn.set('5');
    this.enteredDuration.set('10');
  }

}
