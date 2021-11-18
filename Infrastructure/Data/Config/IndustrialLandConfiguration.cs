using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class IndustrialLandConfiguration : IEntityTypeConfiguration<IndustrialLand>
    {
        public void Configure(EntityTypeBuilder<IndustrialLand> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.MarketValue).HasColumnType("decimal(18,2)");
        }
    }
}