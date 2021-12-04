using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AssessorContext : DbContext
    {
        public AssessorContext(DbContextOptions<AssessorContext> options) : base(options){}

        public DbSet<TaxDecOfRealProperty> TaxDecOfRealProperties { get; set; }
        public DbSet<Boundary> Boundaries { get; set; }
        public DbSet<KindOfProperty> KindOfProperties { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<AgriculturalLand> AgriculturalLands { get; set; }
        public DbSet<ResidentialLand> ResidentialLands { get; set; }
        public DbSet<CommercialLand> CommercialLands { get; set; }
        public DbSet<IndustrialLand> IndustrialLands { get; set; }
        public DbSet<Barangay> Barangays { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}