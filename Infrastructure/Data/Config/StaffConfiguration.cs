using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class StaffConfiguration : IEntityTypeConfiguration<Staff>
    {
        public void Configure(EntityTypeBuilder<Staff> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(90);
            builder.Property(x => x.Gender).IsRequired().HasMaxLength(6);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(90);
            builder.Property(x => x.Contact).IsRequired().HasMaxLength(39);
            builder.Property(x => x.Designation).IsRequired().HasMaxLength(39);
        }
    }
}