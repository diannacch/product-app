using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IProviderRepository
    {
        Task<Response<Provider>> GetProviders();
        Task<Response<ProviderProductVM>> AddProvider(ProviderProductVM provider);
        Task<Response<ProviderProductVM>> GetProviderByIdProduct(int idProduct);
        Task<Response<ProviderProductVM>> DeleteProvider(int idProvider);
    }
}