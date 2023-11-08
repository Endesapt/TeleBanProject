using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeleBan.Types
{
    public class Conversation
    {
        public int Id { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ConversationGuid { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public User Creator { get; set; }
        public ICollection<User> Participants { get; set; }
        public ICollection<Message> Messages { get; set; }
    }
}
