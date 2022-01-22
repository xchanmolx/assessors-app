using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class MunicipalityCityDistrictConfiguration : IEntityTypeConfiguration<MunicipalityCityDistrict>
    {
        public void Configure(EntityTypeBuilder<MunicipalityCityDistrict> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(90);
            builder.Property(x => x.Level).IsRequired().HasMaxLength(13);
        }
    }
}