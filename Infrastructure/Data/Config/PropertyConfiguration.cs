using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PropertyConfiguration : IEntityTypeConfiguration<TaxDecOfRealProperty>
    {
        public void Configure(EntityTypeBuilder<TaxDecOfRealProperty> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(p => p.OwnerName).IsRequired().HasMaxLength(255);
            builder.Property(p => p.PropertyLocation).IsRequired().HasMaxLength(255);
            builder.Property(p => p.TaxDecNumber).IsRequired().HasMaxLength(255);
            builder.Property(p => p.EffectiveYear).IsRequired().HasMaxLength(13);
            builder.Property(p => p.SurveyLotNumber).IsRequired().HasMaxLength(255);
            builder.Property(p => p.LandArea).IsRequired();
            builder.HasMany(p => p.Photos);
            builder.Property(p => p.Remarks).HasComment("e.g. General Revision");
            builder.Property(p => p.PropertyIndex).IsRequired().HasMaxLength(33);
            builder.Property(p => p.ARPNumber).IsRequired().HasMaxLength(33);
            builder.Property(p => p.OwnerAddress).IsRequired().HasMaxLength(255);
            builder.Property(p => p.Kind).IsRequired().HasMaxLength(33);
            builder.Property(p => p.Class).IsRequired().HasMaxLength(33);
            builder.Property(a => a.AssessedValue).HasColumnType("decimal(18,2)");
            builder.Property(ptd => ptd.PreviousTDNumber).IsRequired().HasMaxLength(33);
            builder.Property(pa => pa.PreviousAV).HasColumnType("decimal(18,2)");
            builder.Property(p => p.TaxableExempt).IsRequired().HasMaxLength(33);
        }
    }
}