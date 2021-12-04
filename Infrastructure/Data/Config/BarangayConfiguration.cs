using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class BarangayConfiguration : IEntityTypeConfiguration<Barangay>
    {
        public void Configure(EntityTypeBuilder<Barangay> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(90);
        }
    }
}