using Portfolio.Application.DTO;
using Portfolio.Core.Domain.Entities;
using Portfolio.Core.Domain.RepositoryContracts;
using Portfolio.Core.Helpers;
using Portfolio.Core.ServiceContracts;

namespace Portfolio.Core.Services
{
    public class ContactAdderService : IContactAdderService
    {
        private readonly IContactRepository _contactRepository;

        public ContactAdderService(IContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<ContactAddResponseDTO> AddContactAsync(ContactAddRequestDTO contactDTO)
        {
            if (contactDTO == null) throw new ArgumentNullException(nameof(contactDTO));
            ValidationHelper.ModelValidation(contactDTO);
            Contact contact = contactDTO.ToContact();
            Contact savedContact = await _contactRepository.AddContactAsync(contact);
            return new ContactAddResponseDTO()
            {
                Id = savedContact.Id,
                Success = true,
                Message = "Contact saved successfully",
            };
        }
    }
}
