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
            builder.Property(p => p.PictureUrl).IsRequired();
            builder.Property(p => p.Remarks).HasComment("e.g. General Revision");
        }
    }
}