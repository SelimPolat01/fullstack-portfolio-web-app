using Portfolio.Application.DTO;

namespace Portfolio.Core.ServiceContracts
{
    public interface IContactAdderService
    {
        public Task<ContactAddResponseDTO> AddContactAsync(ContactAddRequestDTO contactDTO);
    }
}
