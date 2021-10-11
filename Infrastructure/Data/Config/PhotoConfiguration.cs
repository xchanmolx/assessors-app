using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            builder.Property(u => u.Url).IsRequired();
            builder.HasOne(t => t.TaxDecOfRealProperty)
                .WithMany(p => p.Photos)
                .HasForeignKey(t => t.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}