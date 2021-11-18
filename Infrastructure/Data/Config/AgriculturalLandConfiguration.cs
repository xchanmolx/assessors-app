using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class AgriculturalLandConfiguration : IEntityTypeConfiguration<AgriculturalLand>
    {
        public void Configure(EntityTypeBuilder<AgriculturalLand> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(50);
            builder.Property(x => x.FirstClass).HasColumnType("decimal(18,2)");
            builder.Property(x => x.SecondClass).HasColumnType("decimal(18,2)");
            builder.Property(x => x.ThirdClass).HasColumnType("decimal(18,2)");
        }
    }
}