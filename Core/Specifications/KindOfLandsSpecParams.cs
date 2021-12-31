namespace Core.Specifications
{
    public class KindOfLandsSpecParams
    {
        private string _search;
        public string Search 
        {
            get => _search;
            set => _search = value.ToLower();
        }
    }
}