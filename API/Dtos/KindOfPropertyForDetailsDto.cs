namespace API.Dtos
{
    public class KindOfPropertyForDetailsDto
    {
        public int Id { get; set; }
        public string Classification { get; set; }
        public double Area { get; set; }
        public decimal MarketValue { get; set; }
        public string ActualUse { get; set; }
        public double Level { get; set; }
        public decimal AssessedValue { get; set; }
    }
}