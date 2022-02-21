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
        
        private string _barangay;
        public string Barangay
        {
            get => _barangay;
            set => _barangay = value.ToLower();
        }
    }
}