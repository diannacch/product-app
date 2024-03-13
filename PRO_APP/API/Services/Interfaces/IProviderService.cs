using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;

namespace API.Services.Interfaces
{
    public interface IProviderService
    {
        Task<Response<ProviderProductVM>> AddProvider(ProviderProductVM product);
        Task<Response<ProviderProductVM>> GetProvidersByIdProduct(int idProduct);
         Task<Response<ProviderProductVM>> DeleteProvider(int idProvider);
         Task<Response<Provider>> GetProviders();
    }
}