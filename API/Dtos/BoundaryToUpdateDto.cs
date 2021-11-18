namespace API.Dtos
{
    public class BoundaryToUpdateDto
    {
        public int Id { get; set; }
        public string North { get; set; }
        public string East { get; set; }
        public string South { get; set; }
        public string West { get; set; }
    }
}