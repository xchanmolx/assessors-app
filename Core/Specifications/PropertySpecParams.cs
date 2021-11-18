namespace Core.Specifications
{
    public class PropertySpecParams
    {
        private const int MaxPageSize = 300000;
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

        private string _taxableExempt;
        public string TaxableExempt
        {
            get => _taxableExempt; 
            set => _taxableExempt = value.ToLower();
        }
        
        public int Year { get; set; }
        
        private string _propertyLocation;
        public string PropertyLocation
        {
            get => _propertyLocation;
            set => _propertyLocation = value.ToLower();
        }

        public decimal TotalAssessedValue { get; set; }        
        public decimal TotalPrevAssessedValue { get; set; }        
    }
}