using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Lấy danh sách sản phẩm (có hỗ trợ tìm kiếm và lọc theo danh mục)
        /// </summary>
        /// <param name="search">Từ khóa tìm kiếm theo tên sản phẩm</param>
        /// <param name="categoryId">ID của danh mục cần lọc</param>
        /// <returns>Danh sách sản phẩm</returns>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult GetAll([FromQuery] string? search = null, [FromQuery] int? categoryId = null, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var query = _context.Products.AsQueryable();

            if (categoryId.HasValue && categoryId.Value > 0)
            {
                query = query.Where(p => p.CategoryProductId == categoryId.Value);
            }

            if (!string.IsNullOrWhiteSpace(search))
            {
                query = query.Where(p => p.Name.Contains(search));
            }

            int totalCount = query.Count();
            int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var products = query
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.IsUpcoming,
                    p.SoldCount,
                    CategoryName = p.CategoryProduct != null ? p.CategoryProduct.Name : "Chưa phân loại"
                })
                .ToList();

            return Ok(new { items = products, totalPages, currentPage = page, totalCount });
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetByCategory(int categoryId, [FromQuery] int page = 1, [FromQuery] int pageSize = 12)
        {
            var query = _context.Products.Where(p => p.CategoryProductId == categoryId);
            int totalCount = query.Count();
            int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);

            var products = query
                .OrderByDescending(p => p.Id)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new {
                    p.Id,
                    p.Name,
                    p.Price,
                    p.ImageUrl,
                    p.StockQuantity,
                    p.IsUpcoming,
                    p.SoldCount,
                })
                .ToList();

            return Ok(new { items = products, totalPages, currentPage = page, totalCount });
        }

        [HttpGet("{id}")]
        public IActionResult GetDetail(int id)
        {
            var product = _context.Products
                .Include(p => p.CategoryProduct)
                .FirstOrDefault(p => p.Id == id);

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm này trong hệ thống" });
            }

            return Ok(new {
                product.Id,
                product.Name,
                product.Description,
                product.Price,
                product.ImageUrl,
                product.StockQuantity,
                CategoryId = product.CategoryProductId,
                CategoryName = product.CategoryProduct != null ? product.CategoryProduct.Name : "Chưa phân loại"
            });
        }
    }
}
