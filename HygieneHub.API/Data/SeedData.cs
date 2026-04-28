using HygieneHub.API.Models;

namespace HygieneHub.API.Data;

public static class SeedData
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        if (context.Products.Any()) return;

        var products = new List<Product>
        {
            new() { Name = "Sabonete Dove Original", Category = "Sabonete", Brand = "Dove", Price = 4.99m, StockQuantity = 200, Description = "Sabonete hidratante com 1/4 de creme hidratante", CreatedAt = DateTime.UtcNow.AddDays(-60) },
            new() { Name = "Sabonete Dove Esfoliante", Category = "Sabonete", Brand = "Dove", Price = 5.49m, StockQuantity = 150, Description = "Sabonete com micropartículas esfoliantes", CreatedAt = DateTime.UtcNow.AddDays(-58) },
            new() { Name = "Sabonete Protex Herbal", Category = "Sabonete", Brand = "Protex", Price = 3.79m, StockQuantity = 180, Description = "Proteção antibacteriana com extrato de ervas", CreatedAt = DateTime.UtcNow.AddDays(-55) },
            new() { Name = "Sabonete Protex Aveia", Category = "Sabonete", Brand = "Protex", Price = 4.29m, StockQuantity = 120, Description = "Fórmula suave com extrato de aveia", CreatedAt = DateTime.UtcNow.AddDays(-50) },
            new() { Name = "Sabonete Lux Tentação", Category = "Sabonete", Brand = "Lux", Price = 3.49m, StockQuantity = 90, Description = "Perfume floral sofisticado", CreatedAt = DateTime.UtcNow.AddDays(-45) },
            new() { Name = "Sabonete Palmolive Sensitive", Category = "Sabonete", Brand = "Palmolive", Price = 3.99m, StockQuantity = 45, Description = "Fórmula delicada para pele sensível", CreatedAt = DateTime.UtcNow.AddDays(-42) },
            new() { Name = "Sabonete Palmolive Nutri-Milk", Category = "Sabonete", Brand = "Palmolive", Price = 4.59m, StockQuantity = 130, Description = "Com leite e mel para pele macia", CreatedAt = DateTime.UtcNow.AddDays(-40) },

            new() { Name = "Shampoo Head & Shoulders Limão", Category = "Shampoo", Brand = "Head & Shoulders", Price = 19.90m, StockQuantity = 80, Description = "Anticaspa com extrato de limão", CreatedAt = DateTime.UtcNow.AddDays(-35) },
            new() { Name = "Shampoo Head & Shoulders Menthol", Category = "Shampoo", Brand = "Head & Shoulders", Price = 21.50m, StockQuantity = 60, Description = "Sensação de frescor com mentol", CreatedAt = DateTime.UtcNow.AddDays(-32) },
            new() { Name = "Shampoo Pantene Brilho", Category = "Shampoo", Brand = "Pantene", Price = 17.90m, StockQuantity = 95, Description = "Fórmula para cabelos com brilho intenso", CreatedAt = DateTime.UtcNow.AddDays(-30) },
            new() { Name = "Shampoo Pantene Hidratação", Category = "Shampoo", Brand = "Pantene", Price = 17.90m, StockQuantity = 110, Description = "Hidratação profunda para cabelos secos", CreatedAt = DateTime.UtcNow.AddDays(-28) },
            new() { Name = "Shampoo TRESemmé Detox", Category = "Shampoo", Brand = "TRESemmé", Price = 22.90m, StockQuantity = 40, Description = "Remove impurezas e resíduos", CreatedAt = DateTime.UtcNow.AddDays(-25) },
            new() { Name = "Shampoo TRESemmé Cachos", Category = "Shampoo", Brand = "TRESemmé", Price = 23.90m, StockQuantity = 70, Description = "Define e hidrata cabelos cacheados", CreatedAt = DateTime.UtcNow.AddDays(-22) },
            new() { Name = "Shampoo Clear Men Anticaspa", Category = "Shampoo", Brand = "Clear", Price = 18.90m, StockQuantity = 85, Description = "Controle de caspa para homens", CreatedAt = DateTime.UtcNow.AddDays(-20) },

            new() { Name = "Condicionador Seda Liso Perfeito", Category = "Condicionador", Brand = "Seda", Price = 14.90m, StockQuantity = 100, Description = "Alisa e suaviza o fio", CreatedAt = DateTime.UtcNow.AddDays(-18) },
            new() { Name = "Condicionador Seda Cachos", Category = "Condicionador", Brand = "Seda", Price = 14.90m, StockQuantity = 75, Description = "Define cachos e elimina frizz", CreatedAt = DateTime.UtcNow.AddDays(-15) },
            new() { Name = "Condicionador Elseve Extraordinário", Category = "Condicionador", Brand = "Elseve", Price = 24.90m, StockQuantity = 55, Description = "Com óleo de argan para nutrição extrema", CreatedAt = DateTime.UtcNow.AddDays(-12) },
            new() { Name = "Condicionador Elseve Reparação", Category = "Condicionador", Brand = "Elseve", Price = 22.90m, StockQuantity = 30, Description = "Repara cabelos danificados", CreatedAt = DateTime.UtcNow.AddDays(-10) },
            new() { Name = "Condicionador Pantene Força", Category = "Condicionador", Brand = "Pantene", Price = 16.90m, StockQuantity = 90, Description = "Fortalece e previne a quebra", CreatedAt = DateTime.UtcNow.AddDays(-7) },
            new() { Name = "Condicionador Dove Nutrição", Category = "Condicionador", Brand = "Dove", Price = 15.90m, StockQuantity = 120, Description = "Nutrição intensa para fios ressecados", CreatedAt = DateTime.UtcNow.AddDays(-3) },
        };

        await context.Products.AddRangeAsync(products);
        await context.SaveChangesAsync();
    }
}
