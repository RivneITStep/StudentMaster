using System;
using System.Collections.Generic;
using System.Text;

namespace StudentMaster.BLL.Interfaces
{
    public interface IRandomService
    {
        string RandomPassword();
        int RandomNumber(int min, int max);
        string RandomString(int size, bool lowerCase);
    }
}
