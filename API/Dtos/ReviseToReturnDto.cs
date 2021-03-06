using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class ReviseToReturnDto
    {
        public int Id { get; set; }
        public string TdNo { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string Street { get; set; }
        public string Barangay { get; set; }
        public string Municipality { get; set; }
        public string Province { get; set; }
        public string PropertyIdentificationNo { get; set; }
        public string ArpNo { get; set; }
        public string TinNo { get; set; }
        public string TelephoneNo { get; set; }
        public string OctTctCloaNo { get; set; }
        public string OctNo { get; set; }
        public string Dated { get; set; }
        public string SurveyLotNo { get; set; }
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
    }
}