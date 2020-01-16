using StudentMaster.BLL.DTO.dtoResults;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Interfaces
{
    public interface INewsService
    {
        Task<IEnumerable<newsResult>> getNews();
    }
}
