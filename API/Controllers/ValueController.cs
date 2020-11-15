using Application.Values;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IMediator mediator;
        public ValuesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<ActionResult<List<Value>>> List()
        {
            return await mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Details(int id)
        {
            return await mediator.Send(new Details.Query { id = id });
        }

        [HttpPost]
        public async Task<ActionResult<Unit>> Create([FromBody]Create.Command command)
        {
            return await mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(int id, Edit.Command command)
        {
            command.id = id;
            return await mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await mediator.Send(new Delete.Command { id = id });
        }

    }
}

// [HttpGet]
// public async Task<ActionResult<List<Value>>> List(CancellationToken ct)
// {
//     return await mediator.Send(new List.Query(), ct);
// }