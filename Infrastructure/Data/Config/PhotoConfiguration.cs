using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class PhotoConfiguration : IEntityTypeConfiguration<Photo>
    {
        public void Configure(EntityTypeBuilder<Photo> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Url).IsRequired().HasMaxLength(230);
            builder.HasOne(x => x.TaxDecOfRealProperty)
                .WithMany(x => x.Photos)
                .HasForeignKey(x => x.TaxDecOfRealPropertyId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}