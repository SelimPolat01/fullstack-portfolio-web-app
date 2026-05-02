namespace Portfolio.Application.DTO.Service
{
    public class ServiceResult<T>
    {
        public bool Success { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }

        public static ServiceResult<T> Fail(string message) => new() { Success = false, Message = message };
        public static ServiceResult<T> Ok(T data) => new() { Success = true, Data = data };
        public static ServiceResult<bool> OkBool(string message) => new() { Success = true, Message = message };
        public static ServiceResult<bool> FailBool(string message) => new() { Success = false, Message = message };

    }
}
