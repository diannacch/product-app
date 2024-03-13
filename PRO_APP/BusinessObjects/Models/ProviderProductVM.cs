using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class ProviderProductVM
    {
        public int Id { get; set; }
        public int Id_Proveedor { get; set; }
        public string Clave_Proveedor { get; set; }
        public int Id_Producto { get; set; }
        public string Nombre_Proveedor { get; set; }
        public bool Status { get; set; }
        public double Costo { get; set; }

    }
}