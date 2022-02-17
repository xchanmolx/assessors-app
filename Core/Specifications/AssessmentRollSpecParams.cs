namespace Core.Specifications
{
    public class AssessmentRollSpecParams
    {
        private string _propertyLocation;
        public string PropertyLocation
        {
            get => _propertyLocation;
            set => _propertyLocation = value.ToLower();
        }

        private string _taxableExempt;
        public string TaxableExempt
        {
            get => _taxableExempt; 
            set => _taxableExempt = value.ToLower();
        }

        public int Year { get; set; } 
    }
}