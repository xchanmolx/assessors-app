namespace Core.Specifications
{
    public class ProvinceSpecParams
    {
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}