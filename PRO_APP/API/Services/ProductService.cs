using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Interfaces;
using BusinessObjects.Models;
using DataAccess.Repositories.Interfaces;

namespace API.Services
{
    public class ProductService : IProductService
    {

        private readonly IProductRepository _repo;
        public ProductService(IProductRepository repo)
        {
            _repo = repo;
        }

        public async Task<Response<Producto>> AddProduct(Producto product)
        {
            var response = await _repo.AddProduct(product);
            return response;
        }

        public async Task<Response<Producto>> DeleteProduct(int idProduct)
        {
            var response = await _repo.DeleteProduct(idProduct);
            return response;
        }

        public async Task<Response<Producto>> GetProducts()
        {
            var response = await _repo.GetAllProducts();
            return response;
        }

        public async Task<Response<Producto>> GetProductsByFilter(int idProductType, string productCode)
        {
            var response = await _repo.GetProductsByFilter(idProductType, productCode);
            return response;
        }

        public async Task<Response<Producto>> GetProductsById(int idProduct)
        {
            var response = await _repo.GetProductsById(idProduct);
            return response;
        }

        public async Task<Response<TipoProducto>> GetProductTypes()
        {
            var response = await _repo.GetProductTypes();
            return response;
        }

        public async Task<Response<Producto>> UpdateProduct(Producto product)
        {
            var response = await _repo.UpdateProduct(product);
            return response;
        }
    }
}