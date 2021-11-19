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
                .WithMany(x => x.PropertyLands)
                .HasForeignKey(x => x.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}