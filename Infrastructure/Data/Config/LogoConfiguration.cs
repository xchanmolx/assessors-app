using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class LogoConfiguration : IEntityTypeConfiguration<Logo>
    {
        public void Configure(EntityTypeBuilder<Logo> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Url).IsRequired().HasMaxLength(230);
            builder.Property(x => x.Ordinal).IsRequired().HasMaxLength(30);
        }
    }
}