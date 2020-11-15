using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contacts
{
    public class Create
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
            public string firstName { get; set; }
            public string surname { get; set; }
            public string phoneNumbers { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var newValue = new Contact
                {
                    Id = request.Id,
                    firstName = request.firstName,
                    surname = request.surname,
                    phoneNumbers = request.phoneNumbers,
                };

                context.Contacts.Add(newValue);
                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}