namespace Core.Entities
{
    public class TaxDecOfRealProperty : BaseEntity
    {
        public string OwnerName { get; set; }
        public string PropertyLocation { get; set; }
        public int TaxDecNumber { get; set; }
        public int EffectiveYear { get; set; }
        public int SurveyLotNumber { get; set; }
        public int LandArea { get; set; }
        public string PictureUrl { get; set; }
        public string Remarks { get; set; }
    }
}