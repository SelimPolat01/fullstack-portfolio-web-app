using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO.Project;
using Portfolio.Application.ServiceContracts;
using Portfolio.Core.Enums;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectGetterService _projectGetterService;
        private readonly IProjectAdderService _projectAdderService;
        private readonly IProjectPutterService _projectPutterService;
        private readonly IProjectDeleterService _projectDeleterService;

        public ProjectController(IProjectGetterService projectGetterService, IProjectAdderService projectAdderService, IProjectPutterService projectPutterService, IProjectDeleterService projectDeleterService)
        {
            _projectGetterService = projectGetterService;
            _projectAdderService = projectAdderService;
            _projectPutterService = projectPutterService;
            _projectDeleterService = projectDeleterService;
        }

        [HttpGet]
        [Route("all-projects")]
        public async Task<IActionResult> GetProjectsOrdered([FromQuery] ProjectOrderBy orderBy = ProjectOrderBy.Date, [FromQuery] bool descending = true, [FromQuery] string? category = null, [FromQuery] string? status = null)
        {
            var result = await _projectGetterService.GetProjectsOrderedAsync(orderBy, descending, category, status);
            return Ok(result.Data);
        }

        [HttpGet]
        [Route("{projectId}")]
        public async Task<ActionResult> GetProject(Guid projectId)
        {
            var result = await _projectGetterService.GetProjectAsync(projectId);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpPost]
        [Route("add-project")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PostProject([FromForm] ProjectAddRequestDTO projectAddRequestDTO)
        {
            var result = await _projectAdderService.AddProjectAsync(projectAddRequestDTO);
            return Ok(result);
        }

        [HttpPut]
        [Route("{projectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutProject(Guid projectId, [FromForm] ProjectAddRequestDTO projectPutRequestDTO)
        {
            var result = await _projectPutterService.PutProjectAsync(projectId, projectPutRequestDTO);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result.Data);
        }

        [HttpGet]
        [Route("download-cv")]
        public async Task<IActionResult> DownloadCV()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/CV_Selim_POLAT.pdf");
            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("CV document not found.");
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var contentType = "application/pdf";
            var fileName = "CV_Selim_POLAT.pdf";
            return File(fileBytes, contentType, fileName);
        }

        [HttpDelete]
        [Authorize(Roles = "Admin")]
        [Route("{projectId}")]
        public async Task<ActionResult> DeleteProject(Guid projectId)
        {
            var result = await _projectDeleterService.DeleteProjectAsync(projectId);
            if (!result.Success) return BadRequest(result.Message);
            return Ok(result);
        }
    }
}
