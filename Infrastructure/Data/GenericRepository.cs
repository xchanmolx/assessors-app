using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly AssessorContext _context;
        public GenericRepository(AssessorContext context)
        {
            _context = context;
        }

        public void Add<Tc>(Tc entity) where Tc : class
        {
            _context.Add(entity);
        }

        public void Delete<Tc>(Tc entity) where Tc : class
        {
            _context.Remove(entity);
        }
        
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<int> CountAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).CountAsync();
        }

        public async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task<T> GetEntityWithSpec(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> ListAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<TaxDecOfRealProperty>> SearchAllLotNoAsync(string lotNo)
        {
            var realProperties = from rp in _context.TaxDecOfRealProperties
                                 select rp;

            if (!String.IsNullOrEmpty(lotNo))
            {
                realProperties = realProperties.Where(s => s.SurveyLotNumber.ToLower().Equals(lotNo)).OrderByDescending(x => x.EffectiveYear);
            }

            return await realProperties.ToListAsync();
        }

        public async Task<IEnumerable<T>> ListAsync(ISpecification<T> spec)
        {
            return await ApplySpecification(spec).ToListAsync();
        }

        private IQueryable<T> ApplySpecification(ISpecification<T> spec)
        {
            return SpecificationEvaluator<T>.GetQuery(_context.Set<T>().AsQueryable(), spec);
        }

    }
}