namespace Bookstore.Models
{
    public class Inventory
    {
        public int ID { get; set; }
        public int BookID { get; set; }
        public Books Book { get; set; }
        public int QuantityInStock { get; set; }
    }
}
