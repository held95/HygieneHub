using HygieneHub.API.Data;
using HygieneHub.API.DTOs;
using HygieneHub.API.Models;
using Microsoft.EntityFrameworkCore;

namespace HygieneHub.API.Services;

public class ProductService : IProductService
{
    private readonly AppDbContext _context;

    public ProductService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllAsync(string? search, string? category)
    {
        var query = _context.Products.AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p =>
                p.Name.ToLower().Contains(search.ToLower()) ||
                p.Brand.ToLower().Contains(search.ToLower()));

        if (!string.IsNullOrWhiteSpace(category))
            query = query.Where(p => p.Category == category);

        return await query.OrderBy(p => p.Name).ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(int id) =>
        await _context.Products.FindAsync(id);

    public async Task<Product> CreateAsync(CreateProductDto dto)
    {
        var product = new Product
        {
            Name = dto.Name,
            Category = dto.Category,
            Brand = dto.Brand,
            Price = dto.Price,
            StockQuantity = dto.StockQuantity,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product?> UpdateAsync(int id, UpdateProductDto dto)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return null;

        product.Name = dto.Name;
        product.Category = dto.Category;
        product.Brand = dto.Brand;
        product.Price = dto.Price;
        product.StockQuantity = dto.StockQuantity;
        product.Description = dto.Description;
        product.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product is null) return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<ProductStatsDto> GetStatsAsync()
    {
        var products = await _context.Products.ToListAsync();

        var totalByCategory = products
            .GroupBy(p => p.Category)
            .ToDictionary(g => g.Key, g => g.Count());

        var avgPriceByCategory = products
            .GroupBy(p => p.Category)
            .ToDictionary(g => g.Key, g => Math.Round(g.Average(p => p.Price), 2));

        var topBrands = products
            .GroupBy(p => p.Brand)
            .OrderByDescending(g => g.Count())
            .Take(5)
            .Select(g => new BrandCountDto(g.Key, g.Count()))
            .ToList();

        var lowStockCount = products.Count(p => p.StockQuantity < 50);

        return new ProductStatsDto(
            products.Count,
            totalByCategory,
            avgPriceByCategory,
            topBrands,
            lowStockCount
        );
    }
}
