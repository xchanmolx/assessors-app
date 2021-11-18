using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ResidentialLandConfiguration : IEntityTypeConfiguration<ResidentialLand>
    {
        public void Configure(EntityTypeBuilder<ResidentialLand> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.MarketValue).HasColumnType("decimal(18,2)");
        }
    }
}