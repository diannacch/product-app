using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Services.Interfaces;
using BusinessObjects.Models;
using DataAccess.Repositories.Interfaces;

namespace API.Services
{
    public class ProviderService : IProviderService
    {

        private readonly IProviderRepository _repo;
        public ProviderService(IProviderRepository repo)
        {
            _repo = repo;
        }

        public async Task<Response<ProviderProductVM>> AddProvider(ProviderProductVM provider)
        {
            var response = await _repo.AddProvider(provider);
            return response;
        }

        public async Task<Response<ProviderProductVM>> DeleteProvider(int idProvider)
        {
            var response = await _repo.DeleteProvider(idProvider);
            return response;
        }

        public async Task<Response<Provider>> GetProviders()
        {
            var response = await _repo.GetProviders();
            return response;
        }

        public async Task<Response<ProviderProductVM>> GetProvidersByIdProduct(int idProduct)
        {
            var response = await _repo.GetProviderByIdProduct(idProduct);
            return response;
        }
    }
}