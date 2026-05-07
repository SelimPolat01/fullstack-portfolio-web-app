using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Application.DTO.SiteSettings;
using Portfolio.Application.ServiceContracts;
using Portfolio.Infrastructure.Identity;

namespace Portfolio.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SiteSettingsController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ISiteSettingsGetterService _siteSettingsGetterService;
        private readonly ISiteSettingsPutterService _siteSettingsPutterService;

        public SiteSettingsController(UserManager<ApplicationUser> userManager, ISiteSettingsGetterService siteSettingsGetterService, ISiteSettingsPutterService siteSettingsAdderService)
        {
            _userManager = userManager;
            _siteSettingsGetterService = siteSettingsGetterService;
            _siteSettingsPutterService = siteSettingsAdderService;
        }

        [HttpGet]
        [Route("get-site-settings")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> GetSiteSettings()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized(new { message = "User not found." });
            var result = await _siteSettingsGetterService.GetSiteSettingsAsync(user.Id);
            return Ok(result);
        }

        [HttpPut]
        [Route("put-site-settings")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutSiteSettings(SiteSettingsPutRequestDTO siteSettingsPutRequestDTO)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized(new { message = "User not found." });
            var result = await _siteSettingsPutterService.PutSiteSettingsAsync(siteSettingsPutRequestDTO, user.Id);
            if (result.Success) return Ok(result);
            return BadRequest(result.Message); ;
        }
    }
}