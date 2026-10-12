export interface JobBody {
    basicInformation: {
        jobTitle: string;
        farmSize_ha: string;
        peakHerdSize_cows: string;
        typicalOnFarmStaff: string;
        closingDateForApplications?: string; // optional
        positionStartDate?: string;          // optional
    };
    jobDescription: {
        primaryLocation: {
            type: "Single farm" | "Multiple farm" | "Corporate farm";
            options: Array<"Single farm" | "Multiple farm" | "Corporate farm">;
        };
        role?: string;
        workType: string;
    };
    workingInformation: {
        hourType?: string;
        averageHoursPerWeek: string;
        roster?: string;
        remunerationPaidBy?: string;
        remunerationIfHourlyDailyWeeklyMonthlyYearly?: {
            from?: string;
            to?: string;
            period: "Hourly" | "Daily" | "Weekly" | "Monthly" | "Yearly";
        };
        remunerationIfTotalPackageValue?: string;
        remunerationIfPerKgMS?: string;
        remunerationIfPercentageOfMilkCheque?: string;
    };
}
