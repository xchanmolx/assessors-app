namespace API.Dtos
{
    public class BoundaryToCreateDto
    {
        public string North { get; set; }
        public string East { get; set; }
        public string South { get; set; }
        public string West { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}