using System.Collections.Generic;

namespace API.Helpers
{
    public class CountAndListKindOfLands<T> where T : class
    {   
        public CountAndListKindOfLands(int count, IEnumerable<T> data)
        {
            Count = count;
            Data = data;
        }

        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}