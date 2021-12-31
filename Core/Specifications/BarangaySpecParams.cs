namespace Core.Specifications
{
    public class BarangaySpecParams
    {
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}