namespace Core.Entities
{
    public class Barangay : BaseEntity
    {
        private string _name;
        public string Name
        {
            get { return _name; }
            set { _name = value.ToLower(); }
        }
    }
}