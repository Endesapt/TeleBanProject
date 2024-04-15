using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeleBan.Types
{
    [Index("Name",IsUnique =true)]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }

        public string? Name { get; set; }
        public ICollection<Conversation> Conversations { get; set; }
        

    }
}
