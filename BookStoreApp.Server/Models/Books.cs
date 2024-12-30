namespace Bookstore.Models
{
    public class Books
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public decimal Price { get; set; }
        public string ISBN { get; set; }
        public DateTime? PublishedDate { get; set; }
        public int  CategoryID { get; set; }
        public string? ImagePath { get; set; }
        public string? Description { get; set; }

    }
}
