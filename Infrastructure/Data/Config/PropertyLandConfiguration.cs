using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PropertyLandConfiguration : IEntityTypeConfiguration<PropertyLand>
    {
        public void Configure(EntityTypeBuilder<PropertyLand> builder)
        {
            builder.HasOne(x => x.TaxDecOfRealProperty)
                .WithOne()
                .HasForeignKey<PropertyLand>(x => x.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.AgriculturalLand)
                .WithOne()
                .HasForeignKey<PropertyLand>(x => x.AgriculturalLandId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.CommercialLand)
                .WithOne()
                .HasForeignKey<PropertyLand>(x => x.CommercialLandId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.IndustrialLand)
                .WithOne()
                .HasForeignKey<PropertyLand>(x => x.IndustrialLandId)
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasOne(x => x.ResidentialLand)
                .WithOne()
                .HasForeignKey<PropertyLand>(x => x.ResidentialLandId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}