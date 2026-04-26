using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrorController : ControllerBase
    {
        [HttpGet]
        public ActionResult Error()
        {
            IExceptionHandlerPathFeature? context = HttpContext.Features.Get<IExceptionHandlerPathFeature>();
            var exception = context?.Error;
            return Problem(title: "An unexpected error occurred", detail: exception?.Message, statusCode: 500);
        }
    }
}
