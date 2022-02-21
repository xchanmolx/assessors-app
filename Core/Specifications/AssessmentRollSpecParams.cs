namespace Core.Specifications
{
    public class AssessmentRollSpecParams
    {
        private string _barangay;
        public string Barangay
        {
            get => _barangay;
            set => _barangay = value.ToLower();
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