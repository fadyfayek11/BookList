using BookList.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookList.Controllers
{
    [Route("api/Book")]
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplictionDbContext _db;

        public BookController(ApplictionDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Json(new
            {
                 data =await _db.Book.ToArrayAsync()
            });
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var bookfromdb =await _db.Book.FirstOrDefaultAsync(i => i.id==id);
            if(bookfromdb==null)
            {
                return Json(new { success = false, message = "Error while deleting" });
            }
            _db.Book.Remove(bookfromdb);
            await _db.SaveChangesAsync();
            return Json(new { success = true, message="Delete successful"});
        }
    }
}
