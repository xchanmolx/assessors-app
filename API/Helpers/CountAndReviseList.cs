using System.Collections.Generic;

namespace API.Helpers
{
    public class CountAndReviseList<T> where T : class
    {   
        public CountAndReviseList(int count, IEnumerable<T> data)
        {
            Count = count;
            Data = data;
        }

        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}