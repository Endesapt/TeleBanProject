using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel.DataAnnotations;

namespace TeleBan.Types
{
    public class Conversation
    {
        public int Id { get; set; }
        [DefaultValue(false)]
        public bool IsDM { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public User Creator { get; set; }
        public ICollection<User> Participants { get; set; }
    }
}
