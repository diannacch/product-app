using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IProductRepository
    {
        Task<Response<Producto>> GetAllProducts();
        Task<Response<Producto>> AddProduct(Producto product);
        Task<Response<Producto>> UpdateProduct(Producto product);
        Task<Response<Producto>> DeleteProduct(int idProduct);
        Task<Response<Producto>> GetProductsByFilter(int idProductType, string productCode);
        Task<Response<Producto>> GetProductsById(int idProduct);
        Task<Response<TipoProducto>> GetProductTypes();

    }
}