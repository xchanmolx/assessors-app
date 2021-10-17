namespace API.Dtos
{
    public class PropertyToTraceDto
    {
        public int Id { get; set; }
        public string OwnerName { get; set; }
        public string PropertyLocation { get; set; }
        public string TaxDecNumber { get; set; }
        public int EffectiveYear { get; set; }
        public string SurveyLotNumber { get; set; }
        public double LandArea { get; set; }
        public string Remarks { get; set; }
    }
}