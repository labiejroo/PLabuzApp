using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Contacts
{
    public class Edit
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
                //handle logic here
                var editValue = await context.Contacts.FindAsync(request.Id);

                if (editValue == null)
                    throw new Exception("Could not find contact");

                editValue.firstName = request.firstName ?? editValue.firstName;
                editValue.surname = request.surname ?? editValue.surname;
                editValue.phoneNumbers = request.phoneNumbers ?? editValue.phoneNumbers;

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}