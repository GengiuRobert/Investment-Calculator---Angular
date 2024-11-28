import { Injectable, signal } from "@angular/core";
import { InvestmentInput } from "./models/investment-input.model";
import { InvestmentResults } from "./models/investment-results.model";

@Injectable({ providedIn: 'root' })
export class InvestmentService {

    resultsData = signal<InvestmentResults[] | undefined>(undefined)


    calculateInvestmentResults(data: InvestmentInput) {

        const { initialInvestment, annualInvestment, expectedReturn, enteredDuration } = data;

        const annualData = [];
        let investmentValue2 = initialInvestment;
        let annualInvestment2 = annualInvestment;
        let expectedReturn2 = expectedReturn;
        let duration = enteredDuration;

        for (let i = 0; i < duration; i++) {
            const year = i + 1;
            const interestEarnedInYear = investmentValue2 * (expectedReturn2 / 100);
            investmentValue2 += interestEarnedInYear + annualInvestment2;
            const totalInterest =
                investmentValue2 - annualInvestment2 * year - initialInvestment;
            annualData.push({
                year: year,
                interest: interestEarnedInYear,
                valueEndOfYear: investmentValue2,
                annualInvestment: annualInvestment2,
                totalInterest: totalInterest,
                totalAmountInvested: initialInvestment + annualInvestment * year,
            });
        }

        this.resultsData.set(annualData);
    }

}