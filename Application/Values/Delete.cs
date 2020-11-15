using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Values
{
    public class Delete
    {
        public class Command : IRequest
        {
            public int id { get; set; }
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
                var valueToDelete = await context.Values.FindAsync(request.id);

                if (valueToDelete == null)
                    throw new Exception("Could not find");

                context.Remove(valueToDelete);

                var success = await context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes");
            }
        }
    }
}