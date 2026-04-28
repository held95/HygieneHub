using HygieneHub.API.DTOs;
using HygieneHub.API.Models;

namespace HygieneHub.API.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetAllAsync(string? search, string? category);
    Task<Product?> GetByIdAsync(int id);
    Task<Product> CreateAsync(CreateProductDto dto);
    Task<Product?> UpdateAsync(int id, UpdateProductDto dto);
    Task<bool> DeleteAsync(int id);
    Task<ProductStatsDto> GetStatsAsync();
}

public record ProductStatsDto(
    int TotalProducts,
    Dictionary<string, int> TotalByCategory,
    Dictionary<string, decimal> AveragePriceByCategory,
    List<BrandCountDto> TopBrands,
    int LowStockCount
);

public record BrandCountDto(string Brand, int Count);
