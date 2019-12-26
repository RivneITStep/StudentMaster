using Microsoft.EntityFrameworkCore;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;


namespace StudentMaster.DAL.Repository
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly DBContext _dbContext;
        protected readonly DbSet<T> _set;

        public Repository(DBContext dbContext)
        {
            _dbContext = dbContext;
            _set = _dbContext.Set<T>();
        }

        public virtual IEnumerable<T> Get(
            Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<T> query = _set;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }

            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }

        public virtual async Task<T> GetByIdAsync(string id)
        {
            return await _set.FindAsync(id);
        }

        public virtual T GetById(string id)
        {
            return _set.Find(id);
        }
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _set.FindAsync(id);
        }

        public virtual T GetById(int id)
        {
            return _set.Find(id);
        }

        public virtual IEnumerable<T> Get()
        {
            return _set.AsEnumerable();
        }

        public virtual async Task<IEnumerable<T>> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set
                   .Where(predicate)
                   .ToListAsync();
        }

        public virtual async Task<IEnumerable<T>> GetAsync()
        {
            return await _set
                   .ToListAsync();
        }

        public virtual IEnumerable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return _set
                   .Where(predicate)
                   .ToList();
        }

        public async Task<T> GetSingleAsync(Expression<Func<T, bool>> predicate)
        {
            return await _set
                    .Where(predicate)
                    .FirstOrDefaultAsync();
        }

        public virtual T GetSingle(Expression<Func<T, bool>> predicate)
        {
            return _set
                    .Where(predicate)
                    .FirstOrDefault();
        }

        public void Add(T entity)
        {
            _set.Add(entity);
            _dbContext.SaveChanges();
        }

        public void Edit(T entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public virtual void Delete(T entity)
        {
            //if (typeof(IDeleted).IsAssignableFrom(typeof(T)))
            //{
            //    (entity as IDeleted).IsDeleted = true;
            //    this.Edit(entity);
            //    return;
            //}
            _set.Remove(entity);
            _dbContext.SaveChanges();
        }

        public virtual void ExplicitDelete(T entity)
        {
            _set.Remove(entity);
            _dbContext.SaveChanges();
        }

        public virtual IQueryable<T> GetQueryable()
        {
            return _set.AsQueryable();
        }

        public virtual IQueryable<T> GetQueryable(Expression<Func<T, bool>> predicate)
        {
            return _set
                .Where(predicate)
                .AsQueryable();
        }
    }
}