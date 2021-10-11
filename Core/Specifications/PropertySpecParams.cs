namespace Core.Specifications
{
    public class PropertySpecParams
    {
        private const int MaxPageSize = 50;
        public int PageIndex { get; set; } = 1;
        
        private int _pageSize = 5;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Sort { get; set; }
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}