using System.ComponentModel.DataAnnotations;

namespace Portfolio.Core.Helpers
{
    public static class ValidationHelper
    {
        public static void ModelValidation(object obj)
        {
            ValidationContext validationContext = new(obj);
            List<ValidationResult> validationResult = new();
            bool isValid = Validator.TryValidateObject(obj, validationContext, validationResult, true);
            if (!isValid) throw new ArgumentException(validationResult.FirstOrDefault()?.ErrorMessage);
        }
    }
}
