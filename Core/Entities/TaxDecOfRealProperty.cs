namespace Core.Entities
{
    public class TaxDecOfRealProperty : BaseEntity
    {
        public string OwnerName { get; set; }
        public string PropertyLocation { get; set; }
        public string TaxDecNumber { get; set; }
        public int EffectiveYear { get; set; }
        public string SurveyLotNumber { get; set; }
        public double LandArea { get; set; }
        public string PictureUrl { get; set; }
        public string Remarks { get; set; }
    }
}