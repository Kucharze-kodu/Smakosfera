using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.Services.Exceptions
{
    public class NotAcceptableException : Exception
    {
        public NotAcceptableException(string message) : base(message)
        {

        }
    }
}
