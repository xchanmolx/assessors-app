using System.Collections.Generic;

namespace API.Helpers
{
    public class CountAndList<T> where T : class
    {
        public CountAndList(int count, IEnumerable<T> data)
        {
            Count = count;
            Data = data;
        }

        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}