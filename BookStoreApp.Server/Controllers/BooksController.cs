using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bookstore.Models;
using BookStoreApp.Server.DTOs;

namespace Bookstore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BooksController(BookstoreContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        [ProducesResponseType(200)]
        public async Task<ActionResult<IEnumerable<BookListDTO>>> GetBooks()
        {
            var books = await _context.Books
                .Select(b => new BookListDTO
                {
                    ID = b.ID,
                    Title = b.Title,
                    Author = b.Author,
                    Price = b.Price,
                    ISBN = b.ISBN,
                    PublishedDate = b.PublishedDate,
                    CategoryID = b.CategoryID,
                    ImagePath = b.ImagePath,
                    Description = b.Description
                }).ToListAsync();

            return Ok(books);
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<BookListDTO>> GetBook(int id)
        {
            var book = await _context.Books
                .Where(b => b.ID == id)
                .Select(b => new BookListDTO
                {
                    ID = b.ID,
                    Title = b.Title,
                    Author = b.Author,
                    Price = b.Price,
                    ISBN = b.ISBN,
                    PublishedDate = b.PublishedDate,
                    CategoryID = b.CategoryID,
                    ImagePath = b.ImagePath,
                    Description = b.Description
                }).FirstOrDefaultAsync();

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        // GET: api/Books/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BookListDTO>>> SearchBooks([FromQuery] string? title, [FromQuery] string? author, [FromQuery] string? category)
        {
            var query = _context.Books.AsQueryable();

            if (!string.IsNullOrEmpty(title))
            {
                query = query.Where(b => b.Title.Contains(title));
            }

            if (!string.IsNullOrEmpty(author))
            {
                query = query.Where(b => b.Author.Contains(author));
            }

            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(b => b.CategoryID.ToString() == category);
            }

            var books = await query.Select(b => new BookListDTO
            {
                ID = b.ID,
                Title = b.Title,
                Author = b.Author,
                Price = b.Price,
                ISBN = b.ISBN,
                PublishedDate = b.PublishedDate,
                CategoryID = b.CategoryID,
                ImagePath = b.ImagePath,
                Description = b.Description
            }).ToListAsync();

            return Ok(books);
        }

        // PUT: api/Books/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, BookListDTO bookDto)
        {
            if (id != bookDto.ID)
            {
                return BadRequest();
            }

            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            // Update book properties
            book.Title = bookDto.Title;
            book.Author = bookDto.Author;
            book.Price = bookDto.Price;
            book.ISBN = bookDto.ISBN;
            book.PublishedDate = bookDto.PublishedDate;
            book.CategoryID = bookDto.CategoryID;
            book.ImagePath = bookDto.ImagePath;
            book.Description = bookDto.Description;

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else { throw; }
            }

            return NoContent();
        }

        // POST: api/Books
        [HttpPost]
        [ProducesResponseType(201)]
        public async Task<ActionResult<BookListDTO>> PostBook(BookListDTO bookDto)
        {
            var book = new Books
            {
                Title = bookDto.Title,
                Author = bookDto.Author,
                Price = bookDto.Price,
                ISBN = bookDto.ISBN,
                PublishedDate = bookDto.PublishedDate,
                CategoryID = bookDto.CategoryID,
                ImagePath = bookDto.ImagePath,
                Description = bookDto.Description
            };

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            bookDto.ID = book.ID; // Update DTO with generated ID

            return CreatedAtAction("GetBook", new { id = bookDto.ID }, bookDto);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.ID == id);
        }
    }
}
