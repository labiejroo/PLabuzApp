using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Values
{
    public class Details
    {
        public class Query : IRequest<Value>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Value>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Value> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await context.Values.FindAsync(request.Id);

                return activity;
            }
        }
    }
}