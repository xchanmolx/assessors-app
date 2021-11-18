using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class BoundaryConfiguration : IEntityTypeConfiguration<Boundary>
    {
        public void Configure(EntityTypeBuilder<Boundary> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.North).HasMaxLength(30);
            builder.Property(x => x.East).HasMaxLength(30);
            builder.Property(x => x.South).HasMaxLength(30);
            builder.Property(x => x.West).HasMaxLength(30);
            builder.HasOne(x => x.TaxDecOfRealProperty)
                .WithOne(x => x.Boundary)
                .HasForeignKey<Boundary>(x => x.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}