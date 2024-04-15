using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TeleBan.Types
{
    [Index("ConversationId")]
    public class Message
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxLength(255)]
        public Guid Id { get; set; }
        [Required]
        public int SenderId {  get; set; }
        [ForeignKey("SenderId")]
        public User Sender { get; set; }
        [Required]
        [ForeignKey("ConversationId")]
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
        [Required]
        public string MessageText { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }

    }
}
