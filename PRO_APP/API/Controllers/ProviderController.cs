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
    public class ProviderController : ControllerBase
    {

        private readonly IProviderService _provService;
        public ProviderController(IProviderService provService)
        {
            _provService = provService;
        }
        [HttpGet]
        [Route("GetProviders")]
        public async Task<IActionResult> GetProviders()
        {
            var response = await _provService.GetProviders();
            return Ok(response);
        }

        [HttpGet]
        [Route("GetProvidersByIdProduct/{idProduct}")]
        public async Task<IActionResult> GetProvidersByIdProduct(int idProduct)
        {
            var response = await _provService.GetProvidersByIdProduct(idProduct);
            return Ok(response);
        }

        [HttpDelete]
        [Route("DeactivateProvider/{idProvider}")]
        public async Task<IActionResult> UpdateProduct(int idProvider)
        {
            var response = await _provService.DeleteProvider(idProvider);
            return Ok(response);
        }

        [HttpPost]
        [Route("AddProvider")]
        public async Task<IActionResult> AddProduct([FromBody] ProviderProductVM provider)
        {
            var response = await _provService.AddProvider(provider);
            return Ok(response);
        }
    }
}