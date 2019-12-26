using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace StudentMaster.DAL.Interfaces
{


    public interface IRepository<T> where T : class
    {
        T GetById(int id);
        T GetById(string id);
        Task<T> GetByIdAsync(int id);
        Task<T> GetByIdAsync(string id);
        IEnumerable<T> Get();
        Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetAsync();
        IEnumerable<T> Get(Expression<Func<T, bool>> predicate);
        IQueryable<T> GetQueryable();
        IQueryable<T> GetQueryable(Expression<Func<T, bool>> predicate);
        T GetSingle(Expression<Func<T, bool>> predicate);
        Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate);
        void Add(T entity);
        void Delete(T entity);
        void ExplicitDelete(T entity);
        void Edit(T entity);

    }
}