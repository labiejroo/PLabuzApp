using System;
using System.Collections.Generic;
using System.Linq;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Contacts.Any())
            {
                var insertValues = new List<Contact>
                {
                    new Contact{
                        firstName = "imie1",
                        surname = "surname1",
                        phoneNumbers = "phoneNumbers1a,phoneNumber1b,phoneNumber1c"
                    },
                    new Contact{
                           firstName = "imie2",
                        surname = "surname2",
                        phoneNumbers = "phoneNumbers1a,phoneNumber1b,phoneNumber1c"
                    },
                    new Contact{
                           firstName = "imie3",
                        surname = "surname3",
                        phoneNumbers = "phoneNumbers1a,phoneNumber1b,phoneNumber1c"
                    },
                    new Contact{
                          firstName = "imie4",
                        surname = "surname4",
                        phoneNumbers = "phoneNumbers1a,phoneNumber1b,phoneNumber1c"
                    }
                };

                context.Contacts.AddRange(insertValues);
                context.SaveChanges();
            }
        }
    }
}