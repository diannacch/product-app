using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BusinessObjects.Models;
using DataAccess.Repositories.Interfaces;
using MySqlConnector;

namespace DataAccess.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private DataContext _context;
        private MySqlConnection _conn;
        private List<Producto> _products;
        public ProductRepository(DataContext context)
        {
            _context = context;
            _conn = _context.GetConnection();
        }

        public async Task<Response<Producto>> AddProduct(Producto product)
        {
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("agregar_producto", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@nombreProducto", SqlDbType.NVarChar).Value = product.Nombre_Producto;
                    cmd.Parameters.AddWithValue("@precioVenta", SqlDbType.Decimal).Value = product.Precio_Venta;
                    cmd.Parameters.AddWithValue("@tipoProducto", SqlDbType.Int).Value = product.Id_Tipo_Producto;
                    cmd.Parameters.AddWithValue("@claveProducto", SqlDbType.NVarChar).Value = product.Clave_Producto;

                    await cmd.ExecuteNonQueryAsync();

                }
                var response = new Response<Producto>()
                {
                    Success = true
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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

        public async Task<Response<Producto>> DeleteProduct(int idProduct)
        {
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("eliminarProducto", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idProducto", SqlDbType.Int).Value = idProduct;

                    await cmd.ExecuteNonQueryAsync();

                }
                var response = new Response<Producto>()
                {
                    Success = true
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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

        public async Task<Response<Producto>> GetAllProducts()
        {
            _products = new List<Producto>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("mostrarProductos", _conn)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _products.Add(new Producto()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Clave_Producto = reader["clave_producto"].ToString()!,
                                Nombre_Producto = reader["nombre_producto"].ToString()!,
                                Precio_Venta = Convert.ToDouble(reader["precio_venta"]),
                                Id_Tipo_Producto = Convert.ToInt32(reader["id_tipo_producto"]),
                                Status = Convert.ToBoolean(reader["status"])
                            });
                        }
                    }

                }
                var response = new Response<Producto>()
                {
                    Success = true,
                    Data = _products
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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

        public async Task<Response<Producto>> GetProductsByFilter(int idProductType, string productCode)
        {
            _products = new List<Producto>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("encontrarProdPorClaveYTipoProducto", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@claveProducto", SqlDbType.NVarChar).Value = productCode;
                    cmd.Parameters.AddWithValue("@idTipoProducto", SqlDbType.Int).Value = idProductType;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _products.Add(new Producto()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Clave_Producto = reader["clave_producto"].ToString()!,
                                Nombre_Producto = reader["nombre_producto"].ToString()!,
                                Precio_Venta = Convert.ToDouble(reader["precio_venta"]),
                                Id_Tipo_Producto = Convert.ToInt32(reader["id_tipo_producto"]),
                                Status = Convert.ToBoolean(reader["status"])
                            });
                        }
                    }

                }
                var response = new Response<Producto>()
                {
                    Success = true,
                    Data = _products
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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

        public async Task<Response<Producto>> GetProductsById(int idProduct)
        {
            _products = new List<Producto>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("obtener_producto_id", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@idProducto", SqlDbType.Int).Value = idProduct;

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _products.Add(new Producto()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Clave_Producto = reader["clave_producto"].ToString()!,
                                Nombre_Producto = reader["nombre_producto"].ToString()!,
                                Precio_Venta = Convert.ToDouble(reader["precio_venta"]),
                                Id_Tipo_Producto = Convert.ToInt32(reader["id_tipo_producto"]),
                                Status = Convert.ToBoolean(reader["status"])
                            });
                        }
                    }

                }
                var response = new Response<Producto>()
                {
                    Success = true,
                    Data = _products
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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

        public async Task<Response<TipoProducto>> GetProductTypes()
        {
            var _productTypes = new List<TipoProducto>();
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("obtener_tipo_producto", _conn)
                    {
                        CommandType = CommandType.StoredProcedure
                    };

                    using (var reader = await cmd.ExecuteReaderAsync())
                    {
                        while (reader.Read())
                        {
                            _productTypes.Add(new TipoProducto()
                            {
                                Id = Convert.ToInt32(reader["id"]),
                                Nombre = reader["nombre"].ToString()!
                            });
                        }
                    }

                }
                var response = new Response<TipoProducto>()
                {
                    Success = true,
                    Data = _productTypes
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<TipoProducto>()
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

        public async Task<Response<Producto>> UpdateProduct(Producto product)
        {
            try
            {
                using (_conn)
                {
                    _conn.Open();
                    MySqlCommand cmd = new MySqlCommand("actualizar_producto", _conn);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@nombreProducto", SqlDbType.NVarChar).Value = product.Nombre_Producto;
                    cmd.Parameters.AddWithValue("@claveProducto", SqlDbType.NVarChar).Value = product.Clave_Producto;
                    cmd.Parameters.AddWithValue("@statusProducto", SqlDbType.Binary).Value = product.Status;
                    cmd.Parameters.AddWithValue("@tipoProducto", SqlDbType.Int).Value = product.Id_Tipo_Producto;
                    cmd.Parameters.AddWithValue("@idProducto", SqlDbType.Int).Value = product.Id;

                    await cmd.ExecuteNonQueryAsync();

                }
                var response = new Response<Producto>()
                {
                    Success = true
                };
                return response;
            }
            catch (System.Exception ex)
            {
                var response = new Response<Producto>()
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