using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Interfaces;
using BusinessObjects.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [EnableCors("CorsApi")]
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {

        private readonly IProductService _prodService;
        public ProductController(IProductService prodService)
        {
            _prodService = prodService;
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public async Task<IActionResult> GetAllProducts()
        {
            var response = await _prodService.GetProducts();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductByFilter/{idProductType}/{productCode}")]
        public async Task<IActionResult> GetProductByFilter(int idProductType, string productCode)
        {
            var response = await _prodService.GetProductsByFilter(idProductType, productCode);
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductById/{idProduct}")]
        public async Task<IActionResult> GetProductById(int idProduct)
        {
            var response = await _prodService.GetProductsById(idProduct);
            return Ok(response);
        }


        [HttpPost]
        [Route("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] Producto product)
        {
            var response = await _prodService.AddProduct(product);
            return Ok(response);
        }

        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] Producto product)
        {
            var response = await _prodService.UpdateProduct(product);
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeactivateProduct/{idProduct}")]
        public async Task<IActionResult> UpdateProduct(int idProduct)
        {
            var response = await _prodService.DeleteProduct(idProduct);
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProductTypes")]
        public async Task<IActionResult> GetProductTypes()
        {
            var response = await _prodService.GetProductTypes();
            return Ok(response);
        }
    }
}