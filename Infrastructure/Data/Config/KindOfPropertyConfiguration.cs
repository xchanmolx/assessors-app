using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class KindOfPropertyConfiguration : IEntityTypeConfiguration<KindOfProperty>
    {
        public void Configure(EntityTypeBuilder<KindOfProperty> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Classification).IsRequired().HasMaxLength(50);
            builder.Property(x => x.Area).IsRequired();
            builder.Property(x => x.MarketValue).IsRequired().HasColumnType("decimal(18,2)");
            builder.Property(x => x.ActualUse).IsRequired().HasMaxLength(90);
            builder.Property(x => x.Level).IsRequired();
            builder.Property(x => x.AssessedValue).IsRequired().HasColumnType("decimal(18,2)");
            builder.HasOne(x => x.TaxDecOfRealProperty)
                .WithMany(x => x.KindOfProperties)
                .HasForeignKey(x => x.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}