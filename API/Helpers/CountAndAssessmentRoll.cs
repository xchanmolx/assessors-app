using System.Collections.Generic;

namespace API.Helpers
{
    public class CountAndAssessmentRoll<T> where T : class
    {   
        public CountAndAssessmentRoll(decimal totalAssessedValue, decimal totalPrevAssessedValue, 
            int count, IEnumerable<T> data)
        {
            TotalAssessedValue = totalAssessedValue;
            TotalPrevAssessedValue = totalPrevAssessedValue;
            
            Count = count;
            Data = data;
        }

        public decimal TotalAssessedValue { get; set; }
        public decimal TotalPrevAssessedValue { get; set; }

        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}