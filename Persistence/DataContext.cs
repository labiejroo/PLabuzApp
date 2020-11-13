using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Value> Values { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Value>()
            .HasData(
                new Value { id = 1, firstName = "Pawel", surname = "Labuz", phoneNumbers = "502689909" },
                 new Value { id = 2, firstName = "Jan", surname = "Kowalski", phoneNumbers = "702689909" },
                  new Value { id = 3, firstName = "Adam", surname = "Malysz", phoneNumbers = "802689909" }
            );
        }
    }
}
