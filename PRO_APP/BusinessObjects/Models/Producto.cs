using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessObjects.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Clave_Producto { get; set; }
        public string Nombre_Producto { get; set; }
        public double Precio_Venta { get; set; }
        public int Id_Tipo_Producto { get; set; }
        public bool? Status { get; set; }
    }
}