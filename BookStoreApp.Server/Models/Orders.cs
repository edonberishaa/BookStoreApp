using System.ComponentModel.DataAnnotations.Schema;

namespace Bookstore.Models
{
    public class Orders
    {
        
        public int ID { get; set; }
        public int CostumerID { get; set; }

        public DateTime OrderDate { get; set; }

    }
}
