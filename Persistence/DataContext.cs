using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Value> Values { get; set; }
        public DataContext(DbContextOptions options) : base(options)
        {

        }
        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     builder.Entity<Value>()
        //     .HasData(
        //         new Value { firstName = "Pawel", surname = "Labuz", phoneNumbers = "502689909" },
        //          new Value { firstName = "Jan", surname = "Kowalski", phoneNumbers = "702689909" },
        //           new Value { firstName = "Adam", surname = "Malysz", phoneNumbers = "802689909" }
        //     );
        // }
    }
}
