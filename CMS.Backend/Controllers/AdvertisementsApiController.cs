using CMS.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Route("api/advertisements")]
    [ApiController]
    public class AdvertisementsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetActiveAdvertisements()
        {
            var banners = _context.Advertisements
                .Where(a => a.IsActive)
                .OrderBy(a => a.DisplayOrder)
                .Select(a => new
                {
                    a.Id,
                    a.Title,
                    a.ImageUrl,
                    a.LinkUrl
                })
                .ToList();

            return Ok(banners);
        }
    }
}
