using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<TaxDecOfRealProperty>> SearchAllLotNoAsync(string lotNo);
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> ListAllAsync();
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IEnumerable<T>> ListAsync(ISpecification<T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
        void Add<Tc>(Tc entity) where Tc: class;
        void Delete<Tc>(Tc entity) where Tc: class;
        Task<bool> SaveAll();
    }
}