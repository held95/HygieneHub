using System.ComponentModel.DataAnnotations;

namespace HygieneHub.API.DTOs;

public class UpdateProductDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Category { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Brand { get; set; } = string.Empty;

    [Required]
    [Range(0.01, 9999.99)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
}
