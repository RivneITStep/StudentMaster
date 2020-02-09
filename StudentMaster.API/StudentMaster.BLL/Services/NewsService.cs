using StudentMaster.BLL.DTO.dtoResults;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentMaster.BLL.Services
{
    public class NewsService : INewsService
    {
        private readonly IRepository<New> _newsRepository;

        public NewsService(IRepository<New> newsRepository)
        {
            _newsRepository = newsRepository;
        }

        public async Task<IEnumerable<newsResult>> getNews()
        {
            var result = new List<newsResult>();
            var news = await _newsRepository.GetAsync();

            if (news == null)
                throw ErrorHelper.GetException("News not found", "404", "", 404);

            foreach (var el in news)
                result.Add(new newsResult()
                {
                    date = el.Date.ToShortDateString(),
                    id = el.Id,
                    message = el.Message,
                    name = el.Name,
                });

            return result;
        }
    }
}
