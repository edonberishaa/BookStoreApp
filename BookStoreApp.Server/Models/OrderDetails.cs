namespace Bookstore.Models
{
    public class OrderDetails
    {
        public int ID { get; set; }
        public int OrderID { get; set; }
        public int BookID { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }


    }
}
