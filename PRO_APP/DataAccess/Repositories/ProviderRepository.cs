using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using MySqlConnector;

namespace DataAccess.Repositories.Interfaces
{
    public class ProviderRepository : IProviderRepository
    {
        private DataContext _context;
        private MySqlConnection _conn;
        public ProviderRepository(DataContext context)
        {
            _context = context;
            _conn = _context.GetConnection();
        }

        public async Task<Response<ProviderProductVM>> AddProvider(ProviderProductVM provider)
        {
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("agregar_producto_proveedor", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idProducto", SqlDbType.Int).Value = provider.Id_Producto;
                    cmd.Parameters.AddWithValue("@idProveedor", SqlDbType.Int).Value = provider.Id_Proveedor;
                    cmd.Parameters.AddWithValue("@claveProveedor", SqlDbType.NVarChar).Value = provider.Clave_Proveedor;
                    cmd.Parameters.AddWithValue("@costo", SqlDbType.Decimal).Value = provider.Costo;

                    await cmd.ExecuteNonQueryAsync();

                }
                var response = new Response<ProviderProductVM>()
                {
                    Success = true
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<ProviderProductVM>()
                {
                    Success = false,
                    Data = null,
                    Error = ex.Message
                };
                return response;
            }
            finally
            {
                _conn.Close();
            }
        }

        public async Task<Response<ProviderProductVM>> DeleteProvider(int idProvider)
        {
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("eliminarProductoProveedor", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idProductoProveedor", SqlDbType.Int).Value = idProvider;

                    await cmd.ExecuteNonQueryAsync();

                }
                var response = new Response<ProviderProductVM>()
                {
                    Success = true
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<ProviderProductVM>()
                {
                    Success = false,
                    Data = null,
                    Error = ex.Message
                };
                return response;
            }
            finally
            {
                _conn.Close();
            }
        }

        public async Task<Response<ProviderProductVM>> GetProviderByIdProduct(int idProduct)
        {
            var _providers = new List<ProviderProductVM>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("obtener_proveedores_por_producto", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idProducto", SqlDbType.Int).Value = idProduct;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _providers.Add(new ProviderProductVM()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Id_Producto = Convert.ToInt32(reader["id_producto"])!,
                                Id_Proveedor = Convert.ToInt32(reader["id_proveedor"]),
                                Clave_Proveedor = reader["clave_proveedor"].ToString()!,
                                Costo = Convert.ToDouble(reader["costo"]),
                                Nombre_Proveedor = reader["nombre_proveedor"].ToString()!,
                                Status = Convert.ToBoolean(reader["status"])
                            });
                        }
                    }

                }
                var response = new Response<ProviderProductVM>()
                {
                    Success = true,
                    Data = _providers
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<ProviderProductVM>()
                {
                    Success = false,
                    Data = null,
                    Error = ex.Message
                };
                return response;
            }
            finally
            {
                _conn.Close();
            }
        }

        public async Task<Response<Provider>> GetProviders()
        {
            var _providers = new List<Provider>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("obtenerProveedores", _conn)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _providers.Add(new Provider()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre_Proveedor = reader["nombre_proveedor"].ToString()!
                            });
                        }
                    }

                }
                var response = new Response<Provider>()
                {
                    Success = true,
                    Data = _providers
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Provider>()
                {
                    Success = false,
                    Data = null,
                    Error = ex.Message
                };
                return response;
            }
            finally
            {
                _conn.Close();
            }
        }
    }
}