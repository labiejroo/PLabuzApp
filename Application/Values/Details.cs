using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contacts
{
    public class Details
    {
        public class Query : IRequest<Contact>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Contact>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Contact> Handle(Query request, CancellationToken cancellationToken)
            {
                var valueDetail = await context.Contacts.FindAsync(request.Id);
                return valueDetail;
            }
        }
    }
}