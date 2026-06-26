using Microsoft.AspNetCore.Mvc;
using CMS.Data;
using CMS.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrdersApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        public class OrderRequest
        {
            public int CustomerId { get; set; }
            public string Notes { get; set; }
            public List<OrderDetailRequest> Items { get; set; }
        }

        public class OrderDetailRequest
        {
            public int ProductId { get; set; }
            public int Quantity { get; set; }
            public decimal UnitPrice { get; set; }
        }

        /// <summary>
        /// Khởi tạo một đơn hàng mới từ giỏ hàng
        /// </summary>
        /// <param name="request">Danh sách sản phẩm trong giỏ và thông tin đặt hàng</param>
        /// <returns>Mã đơn hàng mới tạo</returns>
        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderRequest request)
        {
            if (request.Items == null || request.Items.Count == 0)
                return BadRequest(new { message = "Giỏ hàng trống" });

            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var order = new Order
                {
                    CustomerId = request.CustomerId,
                    OrderDate = DateTime.Now,
                    Status = 0, // Chờ duyệt
                    Notes = request.Notes
                };

                _context.Orders.Add(order);
                _context.SaveChanges(); // Lấy OrderId

                foreach (var item in request.Items)
                {
                    var orderDetail = new OrderDetail
                    {
                        OrderId = order.Id,
                        ProductId = item.ProductId,
                        Quantity = item.Quantity,
                        UnitPrice = item.UnitPrice
                    };
                    _context.OrderDetails.Add(orderDetail);
                    
                    // Trừ tồn kho
                    var product = _context.Products.Find(item.ProductId);
                    if (product != null)
                    {
                        product.StockQuantity -= item.Quantity;
                        if (product.StockQuantity < 0) product.StockQuantity = 0;
                    }
                }

                _context.SaveChanges();
                transaction.Commit();

                return Ok(new { message = "Đặt hàng thành công", orderId = order.Id });
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                return StatusCode(500, new { message = "Lỗi khi đặt hàng", error = ex.Message });
            }
        }

        /// <summary>
        /// Lấy danh sách đơn hàng của một khách hàng
        /// </summary>
        [HttpGet("customer/{customerId}")]
        public IActionResult GetCustomerOrders(int customerId)
        {
            try
            {
                var orders = _context.Orders
                    .Where(o => o.CustomerId == customerId)
                    .Include(o => o.OrderDetails)
                        .ThenInclude(od => od.Product)
                    .OrderByDescending(o => o.OrderDate)
                    .Select(o => new
                    {
                        o.Id,
                        o.OrderDate,
                        o.Status,
                        o.Notes,
                        TotalAmount = o.OrderDetails.Sum(od => od.Quantity * od.UnitPrice),
                        Items = o.OrderDetails.Select(od => new
                        {
                            od.ProductId,
                            od.Product.Name,
                            od.Product.ImageUrl,
                            od.Quantity,
                            od.UnitPrice
                        }).ToList()
                    })
                    .ToList();

                return Ok(orders);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi lấy danh sách đơn hàng", error = ex.Message });
            }
        }
    }
}
