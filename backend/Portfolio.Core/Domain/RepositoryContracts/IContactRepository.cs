using Portfolio.Core.Domain.Entities;

namespace Portfolio.Core.Domain.RepositoryContracts
{
    public interface IContactRepository
    {
        public Task<Contact> AddContactAsync(Contact contact);
    }
}
