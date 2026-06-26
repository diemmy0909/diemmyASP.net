using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class AdvertisementsController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public AdvertisementsController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public IActionResult Index()
        {
            var items = _context.Advertisements.OrderBy(a => a.DisplayOrder).ToList();
            return View(items);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Advertisement advertisement, IFormFile? imageFile)
        {
            // Xử lý upload ảnh nếu người dùng chọn file
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "banners");
                Directory.CreateDirectory(uploadsFolder);
                var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }
                advertisement.ImageUrl = $"/uploads/banners/{uniqueFileName}";
            }

            // Bỏ qua lỗi ValidationState của ImageUrl nếu đã có URL
            ModelState.Remove("ImageUrl");

            if (string.IsNullOrEmpty(advertisement.Title))
            {
                ModelState.AddModelError("Title", "Tiêu đề không được để trống.");
                return View(advertisement);
            }

            _context.Advertisements.Add(advertisement);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        public IActionResult Edit(int id)
        {
            var item = _context.Advertisements.Find(id);
            if (item == null)
            {
                return NotFound();
            }
            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(int id, Advertisement advertisement, IFormFile? imageFile)
        {
            if (id != advertisement.Id)
            {
                return NotFound();
            }

            // Xử lý upload ảnh mới nếu người dùng chọn
            if (imageFile != null && imageFile.Length > 0)
            {
                var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads", "banners");
                Directory.CreateDirectory(uploadsFolder);
                var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    imageFile.CopyTo(stream);
                }
                advertisement.ImageUrl = $"/uploads/banners/{uniqueFileName}";
            }

            ModelState.Remove("ImageUrl");

            if (string.IsNullOrEmpty(advertisement.Title))
            {
                ModelState.AddModelError("Title", "Tiêu đề không được để trống.");
                return View(advertisement);
            }

            _context.Advertisements.Update(advertisement);
            _context.SaveChanges();
            return RedirectToAction(nameof(Index));
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(int id)
        {
            var item = _context.Advertisements.Find(id);
            if (item != null)
            {
                _context.Advertisements.Remove(item);
                _context.SaveChanges();
            }
            return RedirectToAction(nameof(Index));
        }
    }
}
