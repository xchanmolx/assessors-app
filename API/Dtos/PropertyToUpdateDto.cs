using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class PropertyToUpdateDto
    {
        private string _tdNo;
        [Required(ErrorMessage = "The tax declaration number field is required.")]
        public string TdNo
        {
            get { return _tdNo; }
            set { _tdNo = value.ToLower(); }
        }

        [Required]
        public string Owner { get; set; }
        
        [Required]
        public string Address { get; set; }

        [Required(ErrorMessage = "The property location field is required.")]
        public string PropertyLocation { get; set; }

        [Required(ErrorMessage = "The property identification number field is required.")]
        public string PropertyIndentificationNo { get; set; }

        public string ArpNo { get; set; }
        public string TinNo { get; set; }
        public string TelephoneNo { get; set; }
        public string OctTctCloaNo { get; set; }
        public string OctNo { get; set; }
        public string Dated { get; set; }

        [Required(ErrorMessage = "The survey lot number field is required.")]
        public string SurveyLotNo { get; set; }

        public string AssessorLotNo { get; set; }
        public string BlkNo { get; set; }

        public BoundaryToUpdateDto Boundary { get; set; }

        public string KindOfPropertyAssessed { get; set; }
        public string NoOfStoreys { get; set; }
        public string BriefDescription { get; set; }
        public string Specify { get; set; }

        public List<KindOfPropertyToUpdateDto> KindOfProperties { get; set; }

        [Required(ErrorMessage = "The total assessed value in word field is required.")]
        public string TotalAssessedValueInWord { get; set; }

        [Required(ErrorMessage = "The taxable or exempt field is required.")]
        public string TaxableExempt { get; set; }

        [Required]
        public string Quarter { get; set; }

        [Required]
        public int Year { get; set; }

        public string RecommendedBy { get; set; }
        public string ApprovedBy { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

        private string _declarationCancels;
        [Required(ErrorMessage = "The declaration cancels field is required.")]
        public string DeclarationCancels
        {
            get { return _declarationCancels; }
            set { _declarationCancels = value.ToLower(); }
        }

        public string OwnerTdNoCancels { get; set; }
        public decimal PreviousAssessedValue { get; set; }
        public string Memoranda { get; set; }
        public string ApprovedMessage { get; set; }
        public string Notes { get; set; }
    }
}