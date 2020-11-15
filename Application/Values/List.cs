using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Values
{
    public class List
    {
        public class Query : IRequest<List<Value>> { }
        public class Handler : IRequestHandler<Query, List<Value>>
        {
            private readonly DataContext context;
            public Handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<List<Value>> Handle(Query request, CancellationToken cancellationToken)
            {
                var valuesList = await context.Values.ToListAsync();
                return valuesList;
            }
        }
    }
}

// tested:
// private readonly ILogger<List> logger;
//  public Handler(DataContext context, ILogger<List> logger)
// {
//     this.logger = logger;
//     this.context = context;
// }

//W HANDLE
// try
// {
//     for (int i = 0; i < 10; i++)
//     {
//         cancellationToken.ThrowIfCancellationRequested();
//         await Task.Delay(1000, cancellationToken);
//         logger.LogInformation($"Task{i} has completed");
//     }
// }
// catch (Exception ex) when (ex is TaskCanceledException)
// {
//     logger.LogInformation("Task was canceled");
// }

// var activities = await context.Activities.ToListAsync(cancellationToken);