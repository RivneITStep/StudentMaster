using StudentMaster.BLL.DTO.dtoResults;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.Helpers
{
    public static class ErrorHelper
    {
        public static Exception GetException(string message, string tag, string action = "", int status = 400)
        {
            var e = new Exception(message);

            e.Data.Add("ERROR", new errorResult()
            {

                action = action,
                tag = tag,
                message = message,
                status = status

            });

            return e;
        }

        internal static Exception GetException(string v)
        {
            throw new NotImplementedException();
        }
    }
}
