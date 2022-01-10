namespace Core.Entities
{
    public class Staff : BaseEntity
    {
        public string Name { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Contact { get; set; }
        public string Designation { get; set; }
    }
}