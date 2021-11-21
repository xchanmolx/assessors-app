using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PropertyConfiguration : IEntityTypeConfiguration<TaxDecOfRealProperty>
    {
        public void Configure(EntityTypeBuilder<TaxDecOfRealProperty> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.TdNo).IsRequired().HasMaxLength(20);
            builder.Property(x => x.Owner).IsRequired().HasMaxLength(230);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(100);
            builder.Property(x => x.PropertyLocation).IsRequired().HasMaxLength(30);
            builder.Property(x => x.PropertyIndentificationNo).IsRequired().HasMaxLength(30);
            builder.Property(x => x.ArpNo).HasMaxLength(30);
            builder.Property(x => x.TinNo).HasMaxLength(30);
            builder.Property(x => x.TelephoneNo).HasMaxLength(30);
            builder.Property(x => x.OctTctCloaNo).HasMaxLength(30);
            builder.Property(x => x.OctNo).HasMaxLength(30);
            builder.Property(x => x.Dated).HasMaxLength(30);
            builder.Property(x => x.SurveyLotNo).IsRequired().HasMaxLength(30);
            builder.Property(x => x.AssessorLotNo).HasMaxLength(30);
            builder.Property(x => x.BlkNo).HasMaxLength(30);
            builder.HasOne(x => x.Boundary);
            builder.Property(x => x.KindOfPropertyAssessed).HasMaxLength(20);
            builder.Property(x => x.NoOfStoreys).HasMaxLength(10);
            builder.Property(x => x.BriefDescription).HasMaxLength(100);
            builder.Property(x => x.Specify).HasMaxLength(100);
            builder.HasMany(x => x.KindOfProperties);
            builder.Property(x => x.TotalAssessedValueInWord).IsRequired().HasMaxLength(230);
            builder.Property(x => x.TaxableExempt).IsRequired().HasMaxLength(7);
            builder.Property(x => x.Quarter).IsRequired().HasMaxLength(13);
            builder.Property(x => x.Year).IsRequired().HasMaxLength(4);
            builder.Property(x => x.RecommendedBy).HasMaxLength(50);
            builder.Property(x => x.ApprovedBy).HasMaxLength(50);
            builder.Property(x => x.Date).IsRequired();
            builder.Property(x => x.DeclarationCancels).IsRequired().HasMaxLength(50);
            builder.Property(x => x.OwnerTdNoCancels).HasMaxLength(230);
            builder.Property(x => x.PreviousAssessedValue).HasColumnType("decimal(18,2)");
            builder.Property(x => x.Memoranda).HasMaxLength(50);
            builder.Property(x => x.ApprovedMessage).HasMaxLength(230);
            builder.Property(x => x.Notes).HasMaxLength(600);
            builder.HasMany(x => x.Photos);
        }
    }
}