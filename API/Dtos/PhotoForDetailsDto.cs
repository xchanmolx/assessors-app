using Core.Entities;

namespace API.Dtos
{
    public class PhotoForDetailsDto
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}