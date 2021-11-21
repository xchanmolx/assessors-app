using System.Collections.Generic;

namespace Core.Entities
{
    public class AgriculturalLand : BaseEntity
    {
        public string Name { get; set; }
        public decimal FirstClass { get; set; }
        public decimal SecondClass { get; set; }
        public decimal ThirdClass { get; set; }
    }
}