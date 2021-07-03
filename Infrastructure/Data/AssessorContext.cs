using System.Reflection;
using Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AssessorContext : DbContext
    {
        public AssessorContext(DbContextOptions<AssessorContext> options) : base(options){}

        public DbSet<TaxDecOfRealProperty> TaxDecOfRealProperties { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}