using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
   public class Response<T>
    {
        public bool Success { get; set; }
        public List<T>? Data { get; set; }
        public string? Error { get; set; }
    }
}