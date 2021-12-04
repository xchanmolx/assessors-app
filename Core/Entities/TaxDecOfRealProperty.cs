using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class TaxDecOfRealProperty : BaseEntity
    {
        public string TdNo { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string PropertyLocation { get; set; }
        public string PropertyIndentificationNo { get; set; }
        public string ArpNo { get; set; }
        public string TinNo { get; set; }
        public string TelephoneNo { get; set; }
        public string OctTctCloaNo { get; set; }
        public string OctNo { get; set; }
        public string Dated { get; set; }
        
        private string _surveyLotNo;
        public string SurveyLotNo
        {
            get { return _surveyLotNo; }
            set { _surveyLotNo = value.ToLower(); }
        }
        
        public string AssessorLotNo { get; set; }
        public string BlkNo { get; set; }
        public Boundary Boundary { get; set; }
        public string KindOfPropertyAssessed { get; set; }
        public string NoOfStoreys { get; set; }
        public string BriefDescription { get; set; }
        public string Specify { get; set; }
        public ICollection<KindOfProperty> KindOfProperties { get; set; }
        public string TotalAssessedValueInWord { get; set; }
        public string TaxableExempt { get; set; }
        public string Quarter { get; set; }
        public int Year { get; set; }
        public string RecommendedBy { get; set; }
        public string ApprovedBy { get; set; }
        public DateTime Date { get; set; } = DateTime.Today;
        public string DeclarationCancels { get; set; }
        public string OwnerTdNoCancels { get; set; }
        public decimal PreviousAssessedValue { get; set; }
        public string Memoranda { get; set; }
        public string ApprovedMessage { get; set; }
        public string Notes { get; set; }
        public ICollection<Photo> Photos { get; set; }
    }
}