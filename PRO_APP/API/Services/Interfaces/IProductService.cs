using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;

namespace API.Services.Interfaces
{
    public interface IProductService
    {
        Task<Response<Producto>> AddProduct(Producto provider);
        Task<Response<Producto>> GetProducts();
        Task<Response<Producto>> GetProductsByFilter(int idProductType, string productCode);
        Task<Response<Producto>> GetProductsById(int idProduct);
        Task<Response<Producto>> UpdateProduct(Producto product);
        Task<Response<Producto>> DeleteProduct(int idProduct);
        Task<Response<TipoProducto>> GetProductTypes();
    }
}