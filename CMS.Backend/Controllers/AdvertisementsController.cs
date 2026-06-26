using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class AdvertisementsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdvertisementsController(ApplicationDbContext context)
        {
            _context = context;
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
        public IActionResult Create(Advertisement advertisement)
        {
            if (ModelState.IsValid)
            {
                _context.Advertisements.Add(advertisement);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(advertisement);
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
        public IActionResult Edit(int id, Advertisement advertisement)
        {
            if (id != advertisement.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                _context.Advertisements.Update(advertisement);
                _context.SaveChanges();
                return RedirectToAction(nameof(Index));
            }
            return View(advertisement);
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
