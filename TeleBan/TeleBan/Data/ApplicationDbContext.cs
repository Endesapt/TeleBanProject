using Microsoft.EntityFrameworkCore;
using TeleBan.Types;

namespace TeleBan.Data
{
    public class ApplicationDbContext:DbContext
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Conversation> Conversations { get; set; } = null!;
        public DbSet<Message> Messages { get; set; } = null!;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(a => a.Conversations)
                .WithMany(b => b.Participants);

            modelBuilder.Entity<Conversation>()
                .HasOne(b => b.Creator)  // or HasOptional
                .WithMany();
        }
    }
}
