namespace Core.Specifications
{
    public class ReviseSpecParams
    {
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }
        
        public int Year { get; set; }
        
        private string _propertyLocation;
        public string PropertyLocation
        {
            get => _propertyLocation;
            set => _propertyLocation = value.ToLower();
        }
    }
}