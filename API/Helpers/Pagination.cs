using System.Collections.Generic;

namespace API.Helpers
{
    public class Pagination<T> where T : class
    {
        public Pagination(int pageIndex, int pageSize, int count, decimal totalAssessedValue, 
            decimal totalPrevAssessedValue, IEnumerable<T> data)
        {
            PageIndex = pageIndex;
            PageSize = pageSize;
            Count = count;
            TotalAssessedValue = totalAssessedValue;
            TotalPrevAssessedValue = totalPrevAssessedValue;
            Data = data;
        }

        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public decimal TotalAssessedValue { get; set; }
        public decimal TotalPrevAssessedValue { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}